import { useOutletContext, useNavigate } from "react-router-dom";
import cartIcon from '/cart.svg';
import PropTypes from 'prop-types';

const Shop = () => {
    const [cart, setCart, imageURL] = useOutletContext();
    let navigate = useNavigate();

    function addToCart(index, name, price, img) {
        let cartCopy = cart.slice();
        let no = +document.querySelector(`input[name='${index}']`).value;
        if (!no) {
            return;
        }

        for (let item of cartCopy) {
            if (item.name === name) {
                item.amount += no;
                setCart(cartCopy);
                navigate('/cart');
                return;
            }
        }

        cartCopy.push({name, amount: no, price, img});
        setCart(cartCopy);
        navigate('/cart');
    }    

    return (
        <div className="shop">
            <br />
            <h1>Products</h1>
            <br /><br />
            <div className="products">
                {imageURL.map((img, index) => {
                    return (
                        <div className='item' key={index}>
                            <div><img src={img.image} alt={img.title} /></div>
                            <div className="info">
                                <h3>{img.title}</h3>
                                <div className="price">${img.price}</div>
                                <div className="actions">
                                    Quantity: <input type="number" className="quantity" name={index} />
                                    <button className="addToCart" onClick={() => addToCart(index, img.title, img.price, img.image)}>
                                            <img src={cartIcon} alt="cart" />
                                            Add to cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

// Shop.PropTypes = {
//     handler: PropTypes.func,
//     cart: PropTypes.array,
// };

export default Shop;
