import { useOutletContext, Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import cartIcon from '/cart.svg';
import PropTypes from 'prop-types';

const useImageURL = () => {
    const [imageURL, setImageURL] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://fakestoreapi.com/products', { mode: 'cors' })
            .then((response) => {
                if (response.status >= 400) {
                    throw new Error('server error');
                }
                return response.json();
            })
            .then((response) => {
                response = response.slice(0, 12);
                setImageURL(response);
            })
            .catch((error) => setError(error))
            .finally(() => setLoading(false));
    }, []);

    return { imageURL, error, loading };
};

const Shop = () => {
    const [cart, setCart] = useOutletContext();
    let total = 0;
    for (let item of cart) {
        total += item.amount;
    }

    function addToCart(index, name, img) {
        let cartCopy = cart.slice();
        let no = +document.querySelector(`input[name='${index}']`).value;

        for (let item of cartCopy) {
            if (item.name === name) {
                item.amount += no;
                setCart(cartCopy);
                return;
            }
        }

        cartCopy.push({name, amount: no, img});
        setCart(cartCopy);
    }

    let { imageURL, error, loading } = useImageURL();

    if (loading) return <p>Loading...</p>;
    if (error) return <p>A network error was encountered</p>;

    return (        
        <div className="shop">
            <h1>Products</h1>
            <h2>Items in Cart: {total}</h2><br />
            <Link to="/cart"><button>Go to Cart</button></Link>
            <br /><br />
            <div className="products">
                {imageURL.map((img, index) => {
                    return (
                        <div className='item' key={index}>
                            <div><img src={img.image} alt={img.title} /></div>
                            <div className="info">
                                <h3>{img.title}</h3><br />
                                <span className="price">${img.price}</span>
                                <br />
                                Quantity: <input type="number" className="quantity" name={index} />
                                <Link to="/cart">
                                    <button className="addToCart" onClick={() => addToCart(index, img.title, img.image)}>
                                        <img src={cartIcon} alt="cart" />
                                        Add to cart
                                    </button>
                                </Link>
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

// function Shop() {
//     const [cart, setCart] = useOutletContext();

//     return (
//         <div>
//             <Outlet context={[cart, setCart]} />
//         </div>
//     );
// }

export default Shop;
