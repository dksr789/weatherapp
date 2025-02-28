import { FC, useState } from 'react';
import { Forecast } from '../types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getWeatherIcon } from '../utils/weatherIcons';

interface WeatherForecastProps {
  forecast: Forecast;
}

const WeatherForecast: FC<WeatherForecastProps> = ({ forecast }) => {
  const [activeTab, setActiveTab] = useState<'today' | 'tomorrow' | 'next7'>('today');  // Track the active tab

  const getForecastDay = (dt: number) => {
    const date = new Date(dt * 1000);
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  const handleTabClick = (tab: 'today' | 'tomorrow' | 'next7') => {
    setActiveTab(tab);
  };

  const getTodayForecast = () => {
    const today = new Date().toLocaleDateString('en-US', { weekday: 'short' });
    return forecast.filter((day) => getForecastDay(day.dt) === today);
  };

  const getTomorrowForecast = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowDate = tomorrow.toLocaleDateString('en-US', { weekday: 'short' });
    return forecast.filter((day) => getForecastDay(day.dt) === tomorrowDate);
  };

  const getNext7DaysForecast = () => {
    return forecast;
  };

  const renderForecast = () => {
    switch (activeTab) {
      case 'today':
        return getTodayForecast();
      case 'tomorrow':
        return getTomorrowForecast();
      case 'next7':
        return getNext7DaysForecast();
      default:
        return [];
    }
  };

  return (
    <div className="weather-forecast">
      <div className="forecast-tabs">
        <button
          className={`forecast-tab ${activeTab === 'today' ? 'active' : ''}`}
          onClick={() => handleTabClick('today')}
        >
          Today
        </button>
        <button
          className={`forecast-tab ${activeTab === 'tomorrow' ? 'active' : ''}`}
          onClick={() => handleTabClick('tomorrow')}
        >
          Tomorrow
        </button>
        <button
          className={`forecast-tab ${activeTab === 'next7' ? 'active' : ''}`}
          onClick={() => handleTabClick('next7')}
        >
          Next 7 day
        </button>
      </div>

      <div className="forecast-days">
        {renderForecast().map((day, index) => {
          
          const { icon, className } = getWeatherIcon(day.weather[0].icon);
          
          return (
            <div className={`forecast-day ${activeTab === 'today' || activeTab === 'tomorrow' ? 'large' : ''}`} key={index}>
              <div className="forecast-day-name">{getForecastDay(day.dt)}</div>
              <div className="forecast-icon">
                <FontAwesomeIcon 
                  icon={icon}  
                  className={className} 
                  size="3x" 
                />
              </div>
              <div className="forecast-condition">
                {day.weather[0].description} {/* Weather condition */}
              </div>
              <div className="forecast-temp">{Math.round(day.main.temp)}°</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WeatherForecast;
