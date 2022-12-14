import { useContext, useEffect } from "react";
import ShoppingCartItem from "../../components/ShoppingCartItem/ShoppingCartItem";
import { ProductContext } from "../../contexts/ProductContext";
import { ShoppingCartContext } from "../../contexts/ShoppingCartContext";
import { updateProductStock } from "../../services/api";
import styles from "./ShoppingCart.module.scss";

function ShoppingCart(props) {
	const { products, fetchProducts } = useContext(ProductContext);
	const { cartItems, setCart } = useContext(ShoppingCartContext);

	const findProductByID = (productID) =>
		products.find((product) => product.id === productID);

	const clearCart = async (e) => {
		// update the database.
		await fetchProducts();

		// restock items.
		Object.entries(cartItems).forEach(([productID, quantity]) => {
			const originalQty =
				quantity + (findProductByID(productID).stock || 0);
			updateProductStock(productID, originalQty);
		});

		// remove all items from the cart.
		setCart({});
	};

	// scroll to top on mount.
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<main className={styles.ShoppingCart}>
			<h1>Shopping Cart</h1>
			{/* <p>
				doot doot <i className="fa fa-shopping-cart"></i>
			</p> */}
			<button onClick={clearCart}>Empty Cart</button>
			<ul className={styles.ShoppingList}>
				{Object.entries(cartItems).map(([productID, quantity]) => (
					<ShoppingCartItem
						key={productID}
						product={findProductByID(productID)}
						quantity={quantity}
					/>
				))}
				<li>
					Subtotal: $
					{Object.entries(cartItems)
						.reduce(
							(subtotal, [productID, quantity]) =>
								subtotal +
								(parseInt(
									findProductByID(productID).price * 100
								) *
									parseInt(quantity)) /
									100,
							0
						)
						.toFixed(2)}
				</li>
			</ul>
		</main>
	);
}

export default ShoppingCart;
