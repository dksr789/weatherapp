import { FC, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { searchCity } from '../utils/citySearch';

interface CitySearchProps {
  onCityChange: (city: string) => void;
}

const CitySearch: FC<CitySearchProps> = ({ onCityChange }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    const debounceTimer = setTimeout(async () => {
      setIsLoading(true);
      const data = await searchCity(query);
      setSuggestions(data ? data : []);
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [query]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onCityChange(query);
      setQuery('');
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    onCityChange(suggestion);
    setSuggestions([]);
  };

  return (
    <form className="city-search" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search City..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="search-input"
      />
      <button type="submit" className="search-button">
        <FontAwesomeIcon icon="search" />
      </button>

      {/* Show suggestions */}
      {suggestions.length > 0 && (
        <ul className="suggestions-list">
          {isLoading && <li>Loading...</li>} {/* Show loading text */}
          {suggestions.map((suggestion, index) => (
            <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </form>
  );
};

export default CitySearch;
