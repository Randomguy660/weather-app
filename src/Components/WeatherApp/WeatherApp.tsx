import { useRef } from "react";
import GetTemperature from "../GetTemperature/GetTemperature";
import styles from "./WeatherApp.module.css";
import { motion, useAnimate } from "framer-motion";

function WeatherApp() {
	const cityInput = useRef<HTMLInputElement>(null);
	const [scope, animateText] = useAnimate();

	const textFocus = async () => {
		if (cityInput.current?.value == "") {
			await animateText(
				"label",
				{ transform: "translate(9em, 0.4em)" },
				{ duration: 0.7, ease: "easeInOut" }
			);
			animateText(
				"label",
				{ transform: "translate(9em, -0.5em)" },
				{ duration: 0.3, ease: "easeInOut" }
			);
			animateText(
				"div.box",
				{ transform: "translate(8.15em, -0.8em)" },
				{ duration: 0.3, ease: "easeInOut" }
			);
		}
	};

	const textBlur = async () => {
		if (cityInput.current?.value == "") {
			animateText(
				"div.box",
				{ transform: "translate(8.15em, 0.1em)" },
				{ duration: 0.3, ease: "easeInOut" }
			);
			await animateText(
				"label",
				{ transform: "translate(9em, 0.4em)" },
				{ duration: 0.3, ease: "easeInOut" }
			);
			animateText(
				"label",
				{ transform: "translate(0.2em, 0.4em)" },
				{ duration: 0.7, ease: "easeInOut" }
			);
			animateText(
				"div.box",
				{ transform: "translate(8.15em, 0.1em)" },
				{ duration: 0 }
			);
		}
	};

	return (
		<div ref={scope} className={styles.container}>
			<input
				onFocus={() => textFocus()}
				onBlur={() => textBlur()}
				id="cityInput"
				className={styles.input}
				ref={cityInput}
				type="text"
				placeholder=" "
			/>
			<motion.label
				initial={{
					transform: "translate(0.2em, 0.4em)",
				}}
				className={styles.inputLabel}
				htmlFor="cityInput">
				City
			</motion.label>
			<motion.div
				initial={{
					transform: "translate(8.15em, 0.1em)",
				}}
				className={`${styles.placeholderBox} box`}></motion.div>
			<GetTemperature inputRef={cityInput} />
		</div>
	);
}
export default WeatherApp;
