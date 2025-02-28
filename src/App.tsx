import { useState, useEffect } from 'react';
import './App.css';
import WeatherSidebar from './components/WeatherSidebar';
import WeatherForecast from './components/WeatherForecast';
import CitySearch from './components/CitySearch';
import { WeatherData, Forecast, CityWeather } from './types';
import { library } from '@fortawesome/fontawesome-svg-core';
import { 
  faSun, faMoon, faCloudSun, faCloudMoon, faCloud, 
  faCloudRain, faCloudShowersHeavy, faSnowflake, 
  faBolt, faSmog, faWind, faDroplet, faUmbrella,
  faLocationDot, faSearch, faChevronLeft, faChevronRight 
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getWeatherIcon } from './utils/weatherIcons';
library.add(
  faSun, faMoon, faCloudSun, faCloudMoon, faCloud, 
  faCloudRain, faCloudShowersHeavy, faSnowflake, 
  faBolt, faSmog, faWind, faDroplet, faUmbrella,
  faLocationDot, faSearch, faChevronLeft, faChevronRight
);

function App() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<Forecast | null>(null);
  const [otherCities, setOtherCities] = useState<CityWeather[]>([]); 
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [city, setCity] = useState<string>('Noida, Delhi');

  const API_KEY = '00f640a965a26b1b25ae8744e61899d2';

  useEffect(() => {
    const fetchWeatherData = async () => {
      setLoading(true);
      try {
        const weatherResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
        );
        
        if (!weatherResponse.ok) {
          throw new Error('Failed to fetch weather data');
        }
        
        const weatherData = await weatherResponse.json();

        const forecastResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`
        );
        
        if (!forecastResponse.ok) {
          throw new Error('Failed to fetch forecast data');
        }
        
        const forecastData = await forecastResponse.json();
        const dailyForecast = processForecastData(forecastData);
        
        setWeatherData(weatherData);
        setForecast(dailyForecast);
        fetchOtherCitiesData();
        
        setError(null);
      } catch (err) {
        setError('Error fetching weather data. Please try again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [city, API_KEY]);

  const fetchOtherCitiesData = async () => {
    try {
      const cities = ['Noida', 'Delhi'];
      const citiesData = await Promise.all(
        cities.map(async (cityName) => {
          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`
          );
          
          if (!response.ok) {
            throw new Error(`Failed to fetch data for ${cityName}`);
          }
          
          return response.json();
        })
      );
      
      setOtherCities(citiesData);
    } catch (err) {
      console.error('Error fetching other cities data:', err);
    }
  };

  const processForecastData = (forecastData: any): Forecast => {
    const dailyData: Record<string, any> = {};
    
    forecastData.list.forEach((item: any) => {
      const date = new Date(item.dt * 1000);
      const day = date.toLocaleDateString('en-US', { weekday: 'short' });
      
      if (!dailyData[day] || new Date(dailyData[day].dt * 1000).getHours() !== 12) {
        dailyData[day] = item;
      }
    });
  
    const result = Object.values(dailyData).slice(0, 5);
  
    const typedResult = result.map(item => ({
      dt: item.dt,
      main: {
        temp: item.main.temp
      },
      weather: [
        {
          main: item.weather[0].main,
          description: item.weather[0].description,
          icon: item.weather[0].icon
        }
      ]
    }));
    
    return typedResult as Forecast;
  };

  const handleCityChange = (newCity: string) => {
    setCity(newCity);
  };

  if (loading && !weatherData) {
    return <div className="loading">Loading weather data...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  
  return (
    <div className="weather-app">
      {weatherData && forecast && (
        <>
          <WeatherSidebar weatherData={weatherData} />
          <div className="weather-content">
            <div className="weather-header">
              <div className="weather-title">
                <h1>{new Date().toLocaleDateString('en-US', {month: 'short', year: 'numeric' })}</h1>
                <p>{new Date().toLocaleDateString('en-US', {month: 'short', day: '2-digit', year: 'numeric' })}</p>
              </div>
              <CitySearch onCityChange={handleCityChange} />
            </div>
            
            <WeatherForecast forecast={forecast} />
            
            <div className="other-cities">
              <div className="section-header">
                <h2>Other large cities</h2>
                <div className="nav-buttons">
                  <button className="nav-button">
                    <FontAwesomeIcon icon="chevron-left" />
                  </button>
                  <button className="nav-button">
                    <FontAwesomeIcon icon="chevron-right" />
                  </button>
                </div>
              </div>
              
              <div className="cities-grid">
                {otherCities.map((city, index) => (
                  <div className="city-card" key={index}>
                    <div className="city-info">
                      <h3>{city.name}</h3>
                      <p>Mostly {city.weather[0].main}</p>
                    </div>
                    <div className="city-weather">
                      <div className="weather-icon">
                        {/* Destructure icon and className from getWeatherIcon */}
                        {(() => {
                          const { icon, className } = getWeatherIcon(city.weather[0].icon);
                          return (
                            <FontAwesomeIcon icon={icon} className={className} size="2x" />
                          );
                        })()}
                      </div>
                      <span className="city-temp">{Math.round(city.main.temp)}°</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
