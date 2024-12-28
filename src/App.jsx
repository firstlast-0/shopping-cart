import { useState, useEffect } from 'react';
import { Outlet } from "react-router-dom";
import Nav from './components/nav';
import './App.css';

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

function App() {
    const [cart, setCart] = useState([]);
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

        return (
            <div>
                <Nav cart={cart} />
                <Outlet context={[cart, setCart, imageURL]} />
            </div>
        );
    }    
}

export default App;
