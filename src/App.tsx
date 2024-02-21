import { Routes, Route } from "react-router-dom";
import GetTemperaturePage from "./Pages/GetTemperaturePage/GetTemperaturePage";
import GetWeather from "./Components/GetWeather/GetWeather";
import PageNotFound from "./Pages/PageNotFoundError/PageNotFound";
import Home from "./Pages/Home/Home";

function App() {
	return (
		<>
			<Routes>
				<Route path="/temperature" element={<GetTemperaturePage />} />
				<Route path="/weather" element={<GetWeather />} />
				<Route path="/" element={<Home />} />
				<Route path="*" element={<PageNotFound />} />
			</Routes>
		</>
	);
}

export default App;
