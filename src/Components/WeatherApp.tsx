import { useEffect, useRef, useState } from "react";

type getWeatherProps = {
	lat: number;
	long: number;
	cityData?: any;
};

function WeatherApp() {
	const [temp, setTemp] = useState<number>();
	const cityInput = useRef<HTMLInputElement>(null);
	const [errorMsg, setErrorMsg] = useState<string>("");
	const fullCityName = useRef<string>();

	useEffect(() => {
		cityInput.current ? (cityInput.current.value = "") : undefined;
	}, [temp]);

	const getCityCoords = async () => {
		const city = cityInput.current ? cityInput.current.value : "";

		if (city == "") {
			setErrorMsg("Please enter a city name.");
			setTemp(undefined);
		} else {
			const res = await fetch(
				`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=153d8e8daf729c54e2ea43c872dc3e5a`
			);
			const cityData = await res.json();
			console.log("city data is ", cityData);
			if (cityData[0] != undefined) {
				getWeather({
					lat: cityData[0].lat,
					long: cityData[0].lon,
					cityData: cityData,
				});
			} else {
				setErrorMsg("Invalid city.");
				setTemp(undefined);
			}
		}
	};

	const getUserCoords = () => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(pos) => {
					//? Location successfully found
					const lat = pos.coords.latitude;
					const long = pos.coords.longitude;
					getWeather({ lat: lat, long: long });
				},
				(err) => {
					//? Error in finding location
					//? err code 1 means user denied access to location
					//? err code 2 means user's position is unavailable
					//? err code 3 means the location timed out

					if (err.code === 1) {
						setErrorMsg(
							"Please allow access to your location to use this feature."
						);
						setTemp(undefined);
					} else if (err.code === 2) {
						setErrorMsg("Your location is currently unavailable.");
						setTemp(undefined);
					} else {
						setErrorMsg("Location request timed out.");
						setTemp(undefined);
					}
				},
				{
					enableHighAccuracy: false,
					timeout: 5000,
					maximumAge: Infinity,
				}
			);
		} else {
			setErrorMsg("Your browser does not support location access");
		}
	};

	const getWeather = async ({ lat, long, cityData }: getWeatherProps) => {
		const res = await fetch(
			`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=153d8e8daf729c54e2ea43c872dc3e5a&units=metric`
		);
		const weatherData = await res.json();
		setTemp(weatherData.main.temp);
		setErrorMsg("Temperature successfully found.");
		cityData
			? (fullCityName.current = cityData[0].name)
			: (fullCityName.current = weatherData.name);
	};

	return (
		<>
			<div>
				{temp != undefined && temp != null
					? `The temperature in ${fullCityName.current} is ${temp} degrees Celsius`
					: "No temperature found."}
			</div>
			<button onClick={getCityCoords}>Get Temp</button>
			<button onClick={getUserCoords}>Get My Temp</button>
			<br />
			<input ref={cityInput} type="text" placeholder="Enter City..." />
			<p>{errorMsg}</p>
		</>
	);
}
export default WeatherApp;
