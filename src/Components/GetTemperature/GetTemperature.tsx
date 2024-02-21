import { RefObject, useEffect, useRef, useState } from "react";
import { Loading, GettingUserLocation, FetchingData } from "../Loading";
import { useGetCoords } from "../../Hooks/useGetCoords";

import styles from "./GetTemperature.module.css";

const API_KEY = "153d8e8daf729c54e2ea43c872dc3e5a";

type getTempProps = {
	lat: number;
	long: number;
	cityName?: string;
};

type GetTemperatureProps = {
	inputRef: RefObject<HTMLInputElement>;
};

function GetTemperature({ inputRef }: GetTemperatureProps) {
	const [gettingUserLocation, setGettingUserLocation] =
		useState<boolean>(false);
	const [fetchingData, setFetchingData] = useState<boolean>(false);
	const [temp, setTemp] = useState<number>();
	const [errorMsg, setErrorMsg] = useState<string>();

	const fullCityName = useRef<string>();
	const [_, setCoordsData] = useState<[number, number, string]>();

	const [fullData, GetCityCoords, geocoding, error] = useGetCoords();

	useEffect(() => {
		switch (error) {
			case "noCity": {
				setErrorMsg("Please enter a city.");
				break;
			}
			case "invalidCity": {
				setErrorMsg("Invalid city.");
				break;
			}
			case "noError": {
				setErrorMsg("");
				break;
			}
		}
	}, [error]);

	useEffect(() => {
		setCoordsData(fullData);

		if (fullData != undefined) {
			const getTempParams: getTempProps = {
				lat: fullData[0],
				long: fullData[1],
				cityName: fullData[2],
			};
			getTemp(getTempParams);
		}
	}, [fullData]);

	const getCityCoords = () => {
		if (inputRef.current) {
			GetCityCoords(inputRef.current?.value);
		}
	};

	const getUserCoords = () => {
		setGettingUserLocation(true);
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(pos) => {
					//? Location successfully found
					const lat = pos.coords.latitude;
					const long = pos.coords.longitude;
					getTemp({ lat: lat, long: long });
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
		setGettingUserLocation(false);
	};

	const getTemp = async ({ lat, long, cityName }: getTempProps) => {
		setFetchingData(true);
		const res = await fetch(
			`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}&units=metric`
		);
		const weatherData = await res.json();
		setTemp(weatherData.main.temp);
		setErrorMsg("Temperature successfully found.");
		cityName != undefined
			? (fullCityName.current = cityName)
			: (fullCityName.current = weatherData.name);
		setFetchingData(false);
	};

	return (
		<>
			<button
				className={`${styles.cityButton} ${styles.button}`}
				onClick={getCityCoords}>
				Get Temp
			</button>
			<button
				className={`${styles.userButton} ${styles.button}`}
				onClick={getUserCoords}>
				Get My Temp
			</button>
			<div className={styles["temp-text"]}>
				{geocoding ? (
					<Loading />
				) : gettingUserLocation ? (
					<GettingUserLocation />
				) : fetchingData ? (
					<FetchingData />
				) : errorMsg != "" ? (
					temp != undefined && temp != null ? (
						`The temperature in ${fullCityName.current} is ${temp} degrees Celsius`
					) : (
						errorMsg
					)
				) : (
					errorMsg
				)}
			</div>
		</>
	);
}
export default GetTemperature;
