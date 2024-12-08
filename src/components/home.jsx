import { Link } from 'react-router-dom';

function Home() {
    return (
        <div className="home">
            <h1>FAKE STORE</h1>
            <p>This website uses data from the Fake Store API. Head over to the Shop section to browse our stock</p>
            <Link to="/shop"><button>SHOP NOW</button></Link>            
        </div>
    );
}

export default Home;
