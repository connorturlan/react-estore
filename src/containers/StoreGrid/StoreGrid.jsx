import styles from "./StoreGrid.module.scss";
import StoreItem from "../../components/StoreItem/StoreItem";

function StoreGrid(props) {
	return (
		<div className={styles.StoreGrid}>
			{props.items.map((item, index) => (
				<StoreItem key={index} item={item}></StoreItem>
			))}
		</div>
	);
}

export default StoreGrid;