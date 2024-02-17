import { useRef } from "react";
import GetTemperature from "./GetTemperature";

function WeatherApp() {
	const cityInput = useRef<HTMLInputElement>(null);

	return (
		<>
			<GetTemperature inputRef={cityInput} />
			<br />
			<input ref={cityInput} type="text" placeholder="Enter City..." />
		</>
	);
}
export default WeatherApp;
