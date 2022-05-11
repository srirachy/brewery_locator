import axios from "axios";

const baseUrl = `https://api.openbrewerydb.org/breweries`;

export const getBreweries = (city) => {
  return axios.get(`${baseUrl}?by_city=${city}`);
};

export const getBrewery = (id) => {
  return axios.get(`${baseUrl}/${id}`)
};