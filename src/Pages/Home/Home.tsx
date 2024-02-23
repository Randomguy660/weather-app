function Home() {
	return (
		<div
			style={{
				width: "100vw",
				height: "100vh",
				display: "grid",
				placeItems: "center",
				gridAutoRows: "20px",
			}}>
			<div>
				<p>Home page</p>
			</div>

			<div
				style={{
					position: "fixed",
					bottom: "0",
					height: "50px",
					width: "100%",
					backgroundColor: "lightblue",
					display: "grid",
					placeItems: "center",
				}}>
				UNDER CONSTRUCTION
			</div>
			<a href="./#/temperature">Temperature</a>
			<a href="./#/weather">Forecast</a>
		</div>
	);
}
export default Home;
