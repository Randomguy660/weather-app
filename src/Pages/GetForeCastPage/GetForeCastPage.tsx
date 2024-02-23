import styles from "./GetForeCastPage.module.css";
import GetForeCast from "../../Components/GetForeCast/GetForeCast";
import { useRef, useState } from "react";
import HomeButton from "../../Components/Buttons/HomeButton/HomeButton";
import ReportProblem from "../../Components/Buttons/ReportProblem/ReportProblem";

function GetForCastPage() {
	const inputBox = useRef<HTMLInputElement>(null);
	const [fetching, setFetching] = useState<boolean>(false);

	function startFetch() {
		setFetching(true);
		setTimeout(() => setFetching(false), 1000);
	}

	return (
		<>
			<div
				style={{
					position: "absolute",
					top: 0,
					right: 0,
					padding: "10px",
				}}>
				<HomeButton />
			</div>
			<ReportProblem />
			<div className={styles.container}>
				<div className={styles["input-container"]}>
					<input
						ref={inputBox}
						className={styles["text-input"]}
						type="text"
						placeholder="Enter City Name..."
					/>
					<button onClick={startFetch}>Get Forecast</button>
				</div>
				<div className={styles["forecast-display"]}>
					<GetForeCast
						inputRef={inputBox.current as HTMLInputElement}
						fetching={fetching}
					/>
				</div>

				<div className={styles.footer}>
					<div>
						WORK IN PROGRESS CHECK THE CONSOLE AFTER PRESSING THE
						BUTTON
					</div>
				</div>
			</div>
		</>
	);
}
export default GetForCastPage;
