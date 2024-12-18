import { useOutletContext, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import cartIcon from '/cart.svg';
import PropTypes from 'prop-types';

const useImageURL = () => {
    const [imageURL, setImageURL] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("https://fakestoreapi.com/products", { mode: 'cors' })
            .then((response) => {
                if (response.status >= 400) {
                    throw new Error('server error');
                }
                return response.json();
            })
            .then((response) => {
                response = response.slice(0, 19);
                setImageURL(response);
            })
            .catch((error) => setError(error))
            .finally(() => setLoading(false));
    }, []);

    return { imageURL, error, loading };
};

const Shop = () => {
    const [cart, setCart] = useOutletContext();
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
                return;
            }
        }

        cartCopy.push({name, amount: no, price, img});
        setCart(cartCopy);
        navigate('/cart');
    }

    let { imageURL, error, loading } = useImageURL(); 

    if (loading) {
        return <div className="loading"></div>
    } else if (error) {
        return <p>A network error was encountered</p>
    } else {
        imageURL = imageURL.filter(function (item) {
            if (item.category === "men's clothing" || item.category === "women's clothing") {
                return true;
            }
        });
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

// function Shop() {
//     const [cart, setCart] = useOutletContext();

//     return (
//         <div>
//             <Outlet context={[cart, setCart]} />
//         </div>
//     );
// }

export default Shop;
