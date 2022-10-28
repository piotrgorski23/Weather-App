const cityForm = document.querySelector("form");
const card = document.querySelector(".card");
const details = document.querySelector(".details");
const time = document.querySelector("img.time");
const icon = document.querySelector(".icon img");

const updateUI = (data) => {
  const cityDetails = data["City Details"];
  const weather = data["Weather Details"];

  //update details template
  details.innerHTML = `
    <h5 class="my-3">${cityDetails.EnglishName}</h5>
    <div class="my-3">${weather.WeatherText}</div>
    <div class="display-4 my-4">
        <span>${weather.Temperature.Metric.Value}</span>
        <span>&deg;C</span>
    </div>
    `;

  // update the night/day & icon images
  const iconSource = `img/icons/${weather.WeatherIcon}.svg`;
  icon.setAttribute("src", iconSource);

  let timeSource = weather.IsDayTime ? "img/day.svg" : "img/night.svg";

  time.setAttribute("src", timeSource);

  // remove the d-none class if present
  if (card.classList.contains("d-none")) {
    card.classList.remove("d-none");
  }
};

const updateCity = async (city) => {
  const cityDetails = await getCity(city);
  const weather = await getWeather(cityDetails.Key);

  // Object Shorthand Notation
  // return { cityDetails, weather };

  return {
    "City Details": cityDetails,
    "Weather Details": weather,
  };
};

cityForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // get city value
  const city = cityForm.city.value.trim();
  cityForm.reset();

  // update the ui with new city
  updateCity(city)
    .then((data) => updateUI(data))
    .catch((err) => console.log(err));

  // set local storage
  localStorage.setItem("city", city);
});

if (localStorage.getItem("city")) {
  updateCity(localStorage.getItem("city"))
    .then((data) => {
      updateUI(data);
    })
    .catch((err) => console.log(err));
}
