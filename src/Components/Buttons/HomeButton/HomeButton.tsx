import styles from "./HomeButton.module.css";

function HomeButton() {
	return (
		<a href="./" className={styles.button}>
			Go Back Home
		</a>
	);
}
export default HomeButton;
