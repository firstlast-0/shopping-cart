import { Link, useLocation } from 'react-router-dom';
import { useRef, useEffect } from 'react';
import home from '/home.svg';
import shop from '/shop.svg';
import cart from '/cart.svg';

const Nav = () => {
    const location = useLocation();
    const homeRef = useRef(null);
    const shopRef = useRef(null);
    const cartRef = useRef(null);   

    useEffect(() => {
        if (location.pathname === '/') {
            homeRef.current.className = 'selected';
            shopRef.current.className = '';
            cartRef.current.className = '';
        } else if (location.pathname === '/shop') {
            homeRef.current.className = '';
            shopRef.current.className = 'selected';
            cartRef.current.className = '';
        } else {
            homeRef.current.className = '';
            shopRef.current.className = '';
            cartRef.current.className = 'selected';
        }
    }, [location]);

    return (
        <>        
            <nav>
                <ul>
                    <li ref={homeRef}><Link to="/"><img src={home} alt="home" /></Link></li>
                    <li ref={shopRef}><Link to="/shop"><img src={shop} alt="shop" /></Link></li>
                    <li ref={cartRef}><Link to="/cart"><img src={cart} alt="cart" /></Link></li>
                </ul>
            </nav>
        </>        
    );
};

export default Nav;
