import axios from "axios";

const apiKey = 'c3e4a4f677f6a57643c000d078147d2a';
// const apiKey = '5c8e0615f952271739af7e41fb128fd0';
const baseUrl = 'https://api.openweathermap.org';

/**
 * @param lat = number: required
 * @param lon = number: required
 * @param exclude = string: optional
 * @param units = string: optional, default = metric
 * @param lang = string: otional, default = en
 */
export const getWeatherApi = (
  { lat,
    lon,
    exclude = null,
    units = 'metric',
    lang = 'en'
  }) => {
  return axios.get(`${baseUrl}/data/2.5/weather?lat=${lat}&lon=${lon}&exclude=${exclude}&units=${units}&lang=${lang}&appid=${apiKey}`)
};

/**
 * @param city = string: required
 * @param quantity = number: optional, default = 5
 */
export const getLocationApi = (city, quantity = 5) => {
  return axios.get(`${baseUrl}/geo/1.0/direct?q=${city}&limit=${quantity}&appid=${apiKey}`)
}
