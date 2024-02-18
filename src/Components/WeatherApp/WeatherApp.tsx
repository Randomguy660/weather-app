import { useRef } from "react";
import GetTemperature from "../GetTemperature/GetTemperature";
import styles from "./WeatherApp.module.css";
import { motion, useAnimate } from "framer-motion";

function WeatherApp() {
	const cityInput = useRef<HTMLInputElement>(null);
	const [scope, animateText] = useAnimate();

	const TITLE = "Enter City Name";
	const staggerTime = 0.05;

	const textFocus = async () => {
		if (cityInput.current?.value == "") {
			await animateText(
				"label",
				{ transform: "translate(8.2em, 0.4em)" },
				{ duration: 0.7, ease: "easeInOut" }
			);
			animateText(
				"label",
				{ transform: "translate(8.2em, -0.5em)" },
				{ duration: 0.3, ease: "easeInOut" }
			);
			animateText(
				"div.box",
				{ transform: "translate(7.35em, -0.8em)" },
				{ duration: 0.3, ease: "easeInOut" }
			);
		}
	};

	const textBlur = async () => {
		if (cityInput.current?.value == "") {
			animateText(
				"div.box",
				{ transform: "translate(7.35em, 0.1em)" },
				{ duration: 0.3, ease: "easeInOut" }
			);
			await animateText(
				"label",
				{ transform: "translate(8.2em, 0.4em)" },
				{ duration: 0.3, ease: "easeInOut" }
			);
			animateText(
				"label",
				{ transform: "translate(-0.5em, 0.4em)" },
				{ duration: 0.7, ease: "easeInOut" }
			);
			animateText(
				"div.box",
				{ transform: "translate(7.35em, 0.1em)" },
				{ duration: 0 }
			);
		}
	};

	const titleVariants = {
		start: {
			y: 0,
			color: "var(--main-color)",
		},
		end: {
			y: -10,
			color: "var(--accent-color)",
		},
	};

	return (
		<>
			<motion.div
				transition={{
					staggerChildren: staggerTime,
				}}
				initial="start"
				animate="end"
				className={styles.title}>
				{TITLE.split(" ").map((word, index) => (
					<motion.span
						style={{ display: "inline-block" }}
						key={index}>
						{word.split("").map((char, index) => (
							<motion.span
								variants={titleVariants}
								transition={{
									duration: 0.8,
									ease: "easeInOut",
									repeat: Infinity,
									repeatType: "reverse",
								}}
								style={{ display: "inline-block" }}
								key={index}>
								{char}
							</motion.span>
						))}
						{index < word.length - 2 ? (
							<motion.span style={{ display: "inline-block" }}>
								&nbsp;
							</motion.span>
						) : null}
					</motion.span>
				))}
			</motion.div>
			<motion.div ref={scope} className={styles.container} layout>
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
						transform: "translate(-0.5em, 0.4em)",
					}}
					className={styles.inputLabel}
					htmlFor="cityInput">
					City
				</motion.label>
				<motion.div
					initial={{
						transform: "translate(7.35em, 0.1em)",
					}}
					className={`${styles.placeholderBox} box`}></motion.div>
				<GetTemperature inputRef={cityInput} />
			</motion.div>
		</>
	);
}
export default WeatherApp;
