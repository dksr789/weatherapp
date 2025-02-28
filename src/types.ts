export interface WeatherData {
    name: string;
    main: {
      temp: number;
      humidity: number;
      feels_like: number;
    };
    weather: [
      {
        main: string;
        description: string;
        icon: string;
      }
    ];
    wind: {
      speed: number;
    };
    sys: {
      country: string;
      sunrise: number;
      sunset: number;
    };
  }
  
  export interface ForecastItem {
    dt: number;
    main: {
      temp: number;
    };
    weather: [
      {
        main: string;
        description: string;
        icon: string;
      }
    ];
  }
  
  export type Forecast = ForecastItem[];
  
  export interface CityWeather {
    name: string;
    main: {
      temp: number;
    };
    weather: [
      {
        main: string;
        description: string;
        icon: string;
      }
    ];
  }