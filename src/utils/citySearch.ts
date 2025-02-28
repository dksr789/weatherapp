import axios from 'axios';

const WEATHER_API_KEY = '00f640a965a26b1b25ae8744e61899d2';
const WEATHER_API_URL = 'http://api.openweathermap.org/data/2.5/weather';

export const searchCity = async (query: string) => {
  try {
    const response = await axios.get(WEATHER_API_URL, {
      params: {
        q: query,
        appid: WEATHER_API_KEY,
        limit: 5, 
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching city search results', error);
    return [];
  }
};
