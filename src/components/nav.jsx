import { Link, useLocation } from 'react-router-dom';
import { useRef, useEffect } from 'react';
import home from '/home.svg';
import shop from '/shop.svg';
import cartIcon from '/cart.svg';

const Nav = (props) => {
    let total = 0;
    for (let item of props.cart) {
        total += item.amount;
    }

    const location = useLocation();
    const homeRef = useRef(null);
    const shopRef = useRef(null);
    const cartRef = useRef(null);   

    useEffect(() => {
        homeRef.current.className = '';
        shopRef.current.className = '';
        cartRef.current.className = '';

        if (location.pathname === '/') {
            homeRef.current.className = 'selected';            
        } else if (location.pathname === '/shop') {            
            shopRef.current.className = 'selected';
        } else {
            cartRef.current.className = 'selected';
        }
    }, [location]);

    return (
        <>        
            <nav>
                <ul>
                    <li ref={homeRef}><Link to="/"><img src={home} alt="home" title='Home' /></Link></li>
                    <li ref={shopRef}><Link to="/shop"><img src={shop} alt="shop" title='Shop' /></Link></li>
                    <li ref={cartRef}><Link to="/cart"><img src={cartIcon} alt="cart" title='Cart' /></Link>{total}</li>
                </ul>
            </nav>
        </>        
    );
};

export default Nav;
