import { useOutletContext, Link } from "react-router-dom";

function Cart() {
    const [cart, setCart] = useOutletContext();
    let total = 0;
    let totalItems = 0;
    for (let item of cart) {
        total += item.amount * item.price;
    }
    for (let item of cart) {
        totalItems += item.amount;
    }

    function removeHandler(index) {
        let cartCopy = cart.slice();
        cartCopy.splice(index, 1);
        setCart(cartCopy);
    }

    return (
        <div className="cart">
            {cart.length > 0 ?
                <div>
                    {cart.map((item, index) => {
                        return (
                            <div className="item" key={index}>
                                <img src={item.img} alt={item.name} />
                                <div>
                                    <h2>{item.name}</h2><br />
                                    Quantity: <h3>{item.amount}</h3><br />
                                    Total Price: <h3>${item.price * item.amount}</h3><br />
                                    <button className="remove" onClick={() => {removeHandler(index)}}>x</button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            : <div className="cartInfo"><h1>Your Cart is empty</h1>
                    <Link to='/shop'><button className="addToCart">SHOP NOW</button></Link>
                </div>}
            

            <div className="cartInfo">
                <h1>Cart</h1>
                <h2>Total: ${total.toFixed(2)}</h2><br />
                <h2>Items: {totalItems}</h2><br />
                <button onClick={() => {setCart([])}} className="addToCart">Checkout</button>
            </div>
        </div>
    );
}

export default Cart;