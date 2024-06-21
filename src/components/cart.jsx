import { useOutletContext } from "react-router-dom";

function Cart() {
    const [cart] = useOutletContext();

    return (
        <div>
            <h1>Cart</h1>
            <button disabled>Checkout</button>
            <br /><br />
            {cart.map((item, index) => {
                return (
                    <div className="item" key={index}>
                        <img src={item.img} alt={item.name} />

                        <div>
                            <h2>{item.name}</h2><br />
                            Quantity: <h3>{item.amount}</h3>                            
                        </div>
                    </div>
                );
            })}

        </div>
    );
}

export default Cart;