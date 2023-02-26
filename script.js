let weather = {
	// API Key From openweathermap.org
	apiKey: '95ce19b2520eaf6f6caaaea8bff01468',

	// API Call To Fetch Weather Data
	fetchWeather: function (city) {
		fetch(
			`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${this.apiKey}`,
		)
			.then((response) => {
				// Display Loading Icon
				document.querySelector('.loading-icon').classList.add('show');

				// Weather Data Response From API JSON
				return response.json();
			})
			.then((data) => {
				// Display Weather Data
				return this.displayWeather(data);
			});
	},

	// Display Weather Data
	displayWeather: function (data) {
		const { name } = data;
		const { icon, description } = data.weather[0];
		const { temp, humidity } = data.main;
		const { speed } = data.wind;

		// Display City Name
		document.querySelector('.city').innerText = `Weather in ${name}`;

		// Display Weather Icon
		document.querySelector(
			'.icon',
		).src = `https://openweathermap.org/img/wn/${icon}.png`;
		document.querySelector('.icon').alt = description;

		// Display Weather Description
		document.querySelector('.description').innerText = description;

		// Display Temperature
		document.querySelector('.temp').innerText = `${temp}°C`;

		// Display Humidity
		document.querySelector(
			'.humidity',
		).innerText = `Humidity: ${humidity}%`;

		// Display Wind Speed
		document.querySelector('.wind').innerText = `Wind Speed: ${speed} km/h`;

		// Display Background Image Based On Weather Location
		document.querySelector(
			'body',
		).style.backgroundImage = `url('https://source.unsplash.com/1600x900/?${name}')`;

		// Remove Loading Icon
		document.querySelector('.loading-icon').classList.remove('show');

		// Display Weather Details
		document.querySelector('.details').classList.add('show');
	},

	// Search Bar Function To Fetch Weather Data
	search: function () {
		this.fetchWeather(document.querySelector('.search-bar').value);
	},
};

// Search Button Event Listener to Fetch Weather Data
document.querySelector('.search button').addEventListener('click', function () {
	weather.fetchWeather(document.querySelector('.search-bar').value);
});

// Enter Key Event Listener For Search Bar
document
	.querySelector('.search-bar')
	.addEventListener('keyup', function (event) {
		if (event.key == 'Enter') {
			weather.fetchWeather(document.querySelector('.search-bar').value);
		}
	});

// Default Weather Data For Lisbon
weather.fetchWeather('Lisbon');
