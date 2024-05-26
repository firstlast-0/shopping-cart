import { useState, useEffect } from 'react';
import { useOutletContext, Link } from "react-router-dom";
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
                response = response.slice(0, 10);
                setImageURL(response);
            })
            .catch((error) => setError(error))
            .finally(() => setLoading(false));
    }, []);

    return { imageURL, error, loading };
};

const Card = () => {
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
        <>
            <h1>Shop</h1>
            <h2>Items in Cart: {total}</h2><br />
            <Link to="/shop/cart"><button>Go to Cart</button></Link>
            {imageURL.map((img, index) => {
                return (
                    <div key={index}>
                        <img src={img.image} alt={img.title} />
                        <h3>{img.title}</h3>
                        <input type="number" name={index} />
                        <Link to="/shop/cart"><button onClick={() => addToCart(index, img.title, img.image)}>Add to cart</button></Link>
                        
                    </div>
                );
            })}
        </>
    );
};

Card.propTypes = {
    handler: PropTypes.func,
    cart: PropTypes.array,
};

export default Card;
