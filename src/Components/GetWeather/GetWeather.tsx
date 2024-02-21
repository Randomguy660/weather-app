import styles from "./GetWeather.module.css";

function GetWeather() {
	return (
		<>
			<div className={styles.container}>
				<input type="text" placeholder="Enter city..." />
				<button>Get Weather</button>
			</div>
		</>
	);
}
export default GetWeather;
