import { FC } from 'react';
import { WeatherData } from '../types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getWeatherIcon } from '../utils/weatherIcons';

interface WeatherSidebarProps {
  weatherData: WeatherData;
}

const WeatherSidebar: FC<WeatherSidebarProps> = ({ weatherData }) => {
  const sunriseTime = new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
  
  const sunsetTime = new Date(weatherData.sys.sunset * 1000).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  
  const precipitation = 93;
  const humidity = weatherData.main.humidity;
  const wind = Math.round(weatherData.wind.speed * 3.6);

  return (
    <div className="weather-sidebar">
      <div className="location-info">
        <div className="location-icon">
          <FontAwesomeIcon icon="location-dot" />
        </div>
        <h2>{weatherData.name}, {weatherData.sys.country}</h2>
        <p>Today, {new Date().toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
      </div>
      
      <div className="current-weather">
        <div className="weather-icon-large">
          {/* Destructure icon from getWeatherIcon */}
          {(() => {
            const { icon } = getWeatherIcon(weatherData.weather[0].icon);
            return (
              <FontAwesomeIcon icon={icon} size="4x" />
            );
          })()}
        </div>
        <div className="current-temp">
          {Math.round(weatherData.main.temp)}°C
        </div>
      </div>
      
      <div className="weather-details">
        <div className="weather-detail-item">
          <span className="detail-label">
            <FontAwesomeIcon icon="umbrella" className="detail-icon" /> Precipitation:
          </span>
          <span className="detail-value">{precipitation}%</span>
        </div>
        <div className="weather-detail-item">
          <span className="detail-label">
            <FontAwesomeIcon icon="droplet" className="detail-icon" /> Humidity:
          </span>
          <span className="detail-value">{humidity}%</span>
        </div>
        <div className="weather-detail-item">
          <span className="detail-label">
            <FontAwesomeIcon icon="wind" className="detail-icon" /> Wind:
          </span>
          <span className="detail-value">{wind}km/h</span>
        </div>
      </div>
      
      <div className="sun-times">
        <div className="sun-time-item">
          <div className="sun-icon">
            <FontAwesomeIcon icon="sun" />
          </div>
          <div className="sun-time">{sunriseTime}</div>
          <div className="sun-time-info">4 hours ago</div>
        </div>
        <div className="sun-time-item">
          <div className="sun-icon">
            <FontAwesomeIcon icon="moon" />
          </div>
          <div className="sun-time">{sunsetTime}</div>
          <div className="sun-time-info">in 9 hours</div>
        </div>
      </div>
    </div>
  );
};

export default WeatherSidebar;
