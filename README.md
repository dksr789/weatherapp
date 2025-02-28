# ☀️ Dynamic Weather App

A beautiful, responsive weather application built with React that displays real-time weather information with dynamic backgrounds and smooth animations that change based on current weather conditions.

## ✨ Features

- **Real-time Weather Data**: Fetches current weather information from OpenWeatherMap API
- **Dynamic Backgrounds**: Beautiful backgrounds that change based on weather conditions and time of day
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **City Search**: Look up weather information for any city worldwide
- **Weather Details**: View temperature, humidity, wind speed, and more
- **Smooth Animations**: Enjoy visually pleasing transitions and weather-based animations

## 🖥️ Demo

[Live Demo](https://app-weather-gold-beta.vercel.app/)

## 🛠️ Technologies Used

- **React.js** - Frontend library with functional components and hooks
- **CSS/SCSS** - For styling with smooth transitions and animations
- **OpenWeatherMap API** - For fetching weather data
- **Axios** - For handling API requests
- **Vite** - For fast development and optimized builds

## 🚀 Installation and Setup

1. Clone the repository:

```bash
git clone https://github.com/dksr789/weatherapp.git
cd weatherapp
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory and add your OpenWeatherMap API key:

```
VITE_WEATHER_API_KEY=your_api_key_here
```

4. Start the development server:

```bash
npm run dev
```

5. Build for production:

```bash
npm run build
```

## 📂 Project Structure

```
weather-app/
├── public/
│   ├── vite.svg
├── src/
│   ├── assets/
│   │   └── react.svg
│   ├── components/
│   │   ├── CitySearch.tsx
│   │   ├── WeatherForecast.tsx
│   │   └── WeatherSidebar.tsx
│   ├── utils/
│   │   └── citySearch.ts
│   │   └── weatherIcons.ts
│   ├── App.tsx
│   ├── index.css
│   ├── App.css
│   ├── main.tsx
│   ├── types.ts
│   ├── vite-env.d.ts
├── package.json
└── README.md
```

## 👨‍💻 How It Works

1. **User Input**: Enter a city name in the search bar
2. **Data Fetching**: The app fetches real-time weather data from OpenWeatherMap API
3. **Dynamic Display**: Weather information is displayed with appropriate icons
4. **Adaptive Background**: The background changes based on current weather conditions
5. **Weather Animations**: Different animations play based on weather (rain, snow, etc.)

## 🔍 Weather Conditions Supported

- ☀️ Clear Sky
- 🌤️ Few Clouds
- ☁️ Cloudy
- 🌧️ Rain
- ⛈️ Thunderstorm
- ❄️ Snow
- 🌫️ Mist/Fog

## 📱 Responsive Design

The app is fully responsive and works on:
- 💻 Desktop
- 📱 Mobile
- 📟 Tablet

## 🎨 Color Themes

The application automatically shifts color palette based on:
- ☀️ Daytime
- 🌙 Nighttime
- 🌄 Sunrise/Sunset

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check [issues page](https://github.com/yourusername/weather-app/issues).

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgements

- [OpenWeatherMap](https://openweathermap.org/) for providing the weather API
- [Font Awesome](https://fontawesome.com/) for weather icons

---

Made with ❤️ by [Deepak Singh](https://github.com/dksr789/)
