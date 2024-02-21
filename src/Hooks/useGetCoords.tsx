import { useState } from "react";

type error = "noError" | "noCity" | "invalidCity";

export function useGetCoords(): [
	[number, number, string] | undefined,
	(city: string) => void,
	boolean,
	error
] {
	const [geocoding, setGeocoding] = useState<boolean>(false);
	const [fullData, setFullData] = useState<[number, number, string]>();

	const [error, setError] = useState<error>("noError");

	const API_KEY = "153d8e8daf729c54e2ea43c872dc3e5a";

	const GetCityCoords = (city: string) => {
		setGeocoding(true);

		if (city == "") {
			setError("noCity");
		} else {
			const fetchData = async () => {
				const res = await fetch(
					`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`
				);
				const cityData = await res.json();

				if (cityData[0]) {
					setFullData(
						() =>
							[
								cityData[0].lat,
								cityData[0].lon,
								cityData[0].name,
							] as [number, number, string]
					);
				} else {
					setError("invalidCity");
					setFullData(() => [0, 0, ""]);
				}
			};
			fetchData();
		}

		setGeocoding(false);
	};

	return [fullData, GetCityCoords, geocoding, error] as const;
}
