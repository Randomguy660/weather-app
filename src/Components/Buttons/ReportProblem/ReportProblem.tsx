import styles from "./ReportProblem.module.css";

function ReportProblem() {
	function handleClick() {
		alert(
			"I havent made this yet. I will at some point. If you are trying to say the temperature is very off, that is probably because the name you entered is alos the name of another city somewhere in the world."
		);
	}

	return (
		<div className={styles.container} onClick={handleClick}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				strokeWidth="2"
				stroke="currentColor">
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
				/>
			</svg>
			Report Problem
		</div>
	);
}
export default ReportProblem;
