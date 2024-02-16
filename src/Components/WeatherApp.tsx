import { useState } from "react";

function WeatherApp() {
	const [temp, setTemp] = useState<number>();

	function getCoords() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(pos) => {
					getWeather(pos.coords.latitude, pos.coords.longitude);
				},
				() => {
					console.log("Error");
				},
				{
					enableHighAccuracy: false,
					timeout: 5000,
					maximumAge: Infinity,
				}
			);
		} else {
			console.log("Geolocation is not supported by this browser");
		}
	}

	const getWeather = async (lat: number, long: number) => {
		const res = await fetch(
			`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=153d8e8daf729c54e2ea43c872dc3e5a&units=metric`
		);
		const weatherData = await res.json();
		setTemp(weatherData.main.temp);
	};

	return (
		<>
			<div>{temp}</div>
			<button onClick={getCoords}>Get Temp</button>
		</>
	);
}
export default WeatherApp;
