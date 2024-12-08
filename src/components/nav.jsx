import { Link } from 'react-router-dom';
import home from '/home.svg';
import shop from '/shop.svg';
import cart from '/cart.svg';

const Nav = () => {
    return (
        <>        
            <nav>
                <ul>
                    <li><Link to="/"><img src={home} alt="home" /></Link></li>
                    <li><Link to="/shop"><img src={shop} alt="shop" /></Link></li>
                    <li><Link to="/cart"><img src={cart} alt="cart" /></Link></li>
                </ul>
            </nav>
        </>
        
    );
};

export default Nav;
