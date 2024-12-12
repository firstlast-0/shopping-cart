import { useOutletContext } from "react-router-dom";

function Cart() {
    const [cart, setCart] = useOutletContext();
    let total = 0;
    for (let item of cart) {
        total += item.amount * item.price;
    }

    return (
        <div>
            <h1>Cart</h1>
            <h2>Total: {total}</h2><br />
            <button onClick={() => {setCart([])}} disabled>Checkout</button>
            <br /><br />
            {cart.map((item, index) => {
                return (
                    <div className="item" key={index}>
                        <img src={item.img} alt={item.name} />

                        <div>
                            <h2>{item.name}</h2><br />
                            Quantity: <h3>{item.amount}</h3><br />
                            Total Price: <h3>{item.price * item.amount}</h3>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default Cart;