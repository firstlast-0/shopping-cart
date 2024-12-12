import { useState } from 'react';
import { Outlet } from "react-router-dom";
import Nav from './components/nav';

import './App.css';

function App() {
    const [cart, setCart] = useState([]);

    return (
        <div>
            <Nav cart={cart} />
            <Outlet context={[cart, setCart]} />
        </div>
    );
}

export default App;
