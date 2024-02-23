import { useEffect, useState } from "react";
//import styles from "./GetForeCast.module.css";
import ForeCastDisplay from "./ForeCastDisplay";
import { useGetCoords } from "../../Hooks/useGetCoords";

const API_KEY = "153d8e8daf729c54e2ea43c872dc3e5a";

type GetForeCastProps = {
	inputRef?: HTMLInputElement;
	fetching: boolean;
};

type returnURLProps = {
	lon: number;
	lat: number;
	appid: string;
	units: string;
};

function GetForeCast({ inputRef, fetching }: GetForeCastProps) {
	const [cityData, GetCityCoords, geoCoding, error] = useGetCoords();

	useEffect(() => {
		console.log(error);
	}, [error]);

	const [forecast, setForecast] = useState<object>({});

	useEffect(() => {
		console.log(forecast);
	}, [forecast]);

	useEffect(() => {
		if (inputRef?.value && inputRef?.value != "") {
			GetCityCoords(inputRef?.value);
			setForeCast();
		}
	}, [fetching]);

	function returnURL({ lon, lat, appid, units }: returnURLProps) {
		return `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${appid}&units=${units}`;
	}

	function setForeCast() {
		if (cityData != undefined) {
			const forcastGetter = async () => {
				const res = await fetch(
					returnURL({
						lon: cityData[1],
						lat: cityData[0],
						appid: API_KEY,
						units: "metric",
					})
				);
				const forecastData = await res.json();
				setForecast(forecastData);
			};
			forcastGetter();
		}
	}

	//! FIX THE SHIT COZ IT NOT FUCKING WORK

	return (
		<ForeCastDisplay
			geoCoding={geoCoding}
			fetching={fetching}
			cityData={cityData as [number, number, string]}
		/>
	);
}
export default GetForeCast;
