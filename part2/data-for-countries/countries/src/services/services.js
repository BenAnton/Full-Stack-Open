import axios from "axios";
const baseUrl = "https://studies.cs.helsinki.fi/restcountries/";
const allSearch = "api/all";

const getAll = () => {
  const request = axios.get(`${baseUrl}${allSearch}`);
  return request.then((response) => response.data);
};

const searchByName = (name) => {
  const request = axios.get(`${baseUrl}api/name/${name}`);
  return request.then((response) => response.data);
};

const countryAPI = { getAll, searchByName };
export default countryAPI;
