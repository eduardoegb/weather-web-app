console.log('Client side JavaScript file is loaded.');

const submitBtn = document.querySelector('#submit-btn');
const addressInput = document.querySelector('#address');
const errorMsg = document.querySelector('#error-msg');
const locationInfo = document.querySelector('#location');
const weatherInfo = document.querySelector('#weather');
const temperatureInfo = document.querySelector('#temperature');
const feelslikeInfo = document.querySelector('#feelslike');
const precipInfo = document.querySelector('#precip');


submitBtn.addEventListener('click', event => {
  event.preventDefault();
  const address = addressInput.value;

  if (address) {
    fetch(`/weather?address=${address}`)
    .then(response => response.json())
    .then(data => {
      const { error, location, forecast: { weather, temperature, feelslike, precip } = {} } = data;
      if (error) {
        return errorMsg.textContent = data.error;
      }
      locationInfo.textContent = 'LOCATION: ' + location;
      weatherInfo.textContent = 'WEATHER: ' + weather;
      temperatureInfo.textContent = 'TEMPERATURE: ' + temperature + '° C';
      feelslikeInfo.textContent = 'FEELS LIKE: ' + feelslike + '° C';
      precipInfo.textContent = 'PRECIPITATION PROBABILITY: ' + precip + '%';
    });
  }
});


