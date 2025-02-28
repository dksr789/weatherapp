import { IconProp } from '@fortawesome/fontawesome-svg-core';

export const getWeatherIcon = (iconCode: string): { icon: IconProp, className: string } => {
  
  const iconMap: Record<string, { icon: IconProp, className: string }> = {
    // Clear
    '01d': { icon: 'sun', className: 'sun' },
    '01n': { icon: 'moon', className: 'moon' },
    
    // Few clouds
    '02d': { icon: 'cloud-sun', className: 'cloud' },
    '02n': { icon: 'cloud-moon', className: 'moon' },
    
    // Scattered clouds
    '03d': { icon: 'cloud', className: 'cloud' },
    '03n': { icon: 'cloud', className: 'cloud' },
    
    // Broken clouds
    '04d': { icon: 'cloud', className: 'cloud' },
    '04n': { icon: 'cloud', className: 'cloud' },
    
    // Shower rain
    '09d': { icon: 'cloud-showers-heavy', className: 'rain' },
    '09n': { icon: 'cloud-showers-heavy', className: 'rain' },
    
    // Rain
    '10d': { icon: 'cloud-rain', className: 'rain' },
    '10n': { icon: 'cloud-rain', className: 'rain' },
    
    // Thunderstorm
    '11d': { icon: 'bolt', className: 'bolt' },
    '11n': { icon: 'bolt', className: 'bolt' },
    
    // Snow
    '13d': { icon: 'snowflake', className: 'snowflake' },
    '13n': { icon: 'snowflake', className: 'snowflake' },
    
    // Mist
    '50d': { icon: 'smog', className: 'smog' },
    '50n': { icon: 'smog', className: 'smog' }
  };

  return iconMap[iconCode] || { icon: 'cloud', className: 'cloud' };
};