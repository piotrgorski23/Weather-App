const key = "DIL778vlt3XL534wMVUGVDFYArNIVOtz";

// get weather information
const getWeather = async (cityKey) => {
  const baseURL = `http://dataservice.accuweather.com/currentconditions/v1/`;

  const query = `${cityKey}?apikey=${key}`;

  const response = await fetch(baseURL + query);

  const data = await response.json();

  return data[0];
};

// get city information
const getCity = async (city) => {
  const baseURL =
    "http://dataservice.accuweather.com/locations/v1/cities/search";
  const query = `?apikey=${key}&q=${city}`;

  const response = await fetch(baseURL + query);
  const data = await response.json();

  return data[0];
};
