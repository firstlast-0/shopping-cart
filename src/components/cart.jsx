import { useOutletContext } from "react-router-dom";

function Cart() {
    const [cart] = useOutletContext();

    return (
        <div>
            <h1>Cart</h1>
            <br />
            <button disabled>Checkout</button>
            {cart.map((item, index) => {
                return (
                    <div key={index}>
                        <img src={item.img} alt={item.name} />
                        <h2>{item.amount} x</h2> <h3>{item.name}</h3>
                    </div>
                );
            })}

        </div>
    );
}

export default Cart;