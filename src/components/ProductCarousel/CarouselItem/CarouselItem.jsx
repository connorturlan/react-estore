import { NavLink } from "react-router-dom";
import styles from "./CarouselItem.module.scss";

function CarouselItem(props) {
	const { id, name, image, price } = props.item;

	return (
		<NavLink className={styles.CarouselItem} to={`products/${id}`}>
			<img className={styles.carousel__image} src={image} alt={name} />
			<h1 className={styles.CarouselItem__Title}>{name}</h1>
			<h3>${price}</h3>
		</NavLink>
	);
}

export default CarouselItem;
