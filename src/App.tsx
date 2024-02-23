import { Routes, Route } from "react-router-dom";
import GetTemperaturePage from "./Pages/GetTemperaturePage/GetTemperaturePage";
import GetForeCastPage from "./Pages/GetForeCastPage/GetForeCastPage";
import PageNotFound from "./Pages/PageNotFoundError/PageNotFound";
import Home from "./Pages/Home/Home";

function App() {
	return (
		<>
			<Routes>
				<Route path="/temperature" element={<GetTemperaturePage />} />
				<Route path="/weather" element={<GetForeCastPage />} />
				<Route path="/home" element={<Home />} />
				<Route path="/" element={<Home />} />
				<Route path="*" element={<PageNotFound />} />
			</Routes>
		</>
	);
}

export default App;
