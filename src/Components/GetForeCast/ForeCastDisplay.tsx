import { useState } from "react";
import styles from "./ForeCastDisplay.module.css";

type ForeCastDisplayProps = {
	cityData: [number, number, string];
	geoCoding: boolean;
	fetching: boolean;
};

function ForeCastDisplay({
	cityData,
	geoCoding,
	fetching,
}: ForeCastDisplayProps) {
	const [selectedTabIndex, setSelectedTabIndex] = useState<number>(0);

	if (cityData) {
		console.log();
	}

	const tabText = [
		"mon",
		"tue",
		"wed",
		"thu",
		"fri",
		"sat",
		"sun",
		"mon",
		"tue",
		"wed",
		"thu",
		"fri",
		"sat",
		"sun",
	];

	const tabs = [
		<div className={styles.display}>
			{geoCoding ? (
				<div>GeoCoding</div>
			) : fetching ? (
				<div>Fetching Data...</div>
			) : (
				<div>Not Doing Anything</div>
			)}
		</div>,
		<div className={styles.display}>
			{geoCoding ? (
				<div>GeoCoding</div>
			) : fetching ? (
				<div>Fetching Data...</div>
			) : (
				<div>Not Doing Anything</div>
			)}
		</div>,
		<div className={styles.display}>
			{geoCoding ? (
				<div>GeoCoding</div>
			) : fetching ? (
				<div>Fetching Data...</div>
			) : (
				<div>Not Doing Anything</div>
			)}
		</div>,
		<div className={styles.display}>
			{geoCoding ? (
				<div>GeoCoding</div>
			) : fetching ? (
				<div>Fetching Data...</div>
			) : (
				<div>Not Doing Anything</div>
			)}
		</div>,
		<div className={styles.display}>
			{geoCoding ? (
				<div>GeoCoding</div>
			) : fetching ? (
				<div>Fetching Data...</div>
			) : (
				<div>Not Doing Anything</div>
			)}
		</div>,
	];

	return (
		<>
			<div className={styles.container}>
				{tabs[selectedTabIndex]}
				<div className={styles["buttons-container"]}>
					{tabs.map((_, index) => (
						<div
							key={index}
							onClick={() => setSelectedTabIndex(index)}
							className={styles["tab-button"]}>
							{tabText[new Date().getDay() + (index - 1)]}
						</div>
					))}
				</div>
			</div>
		</>
	);
}
export default ForeCastDisplay;
