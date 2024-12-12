import { useState, useEffect } from 'react';
import { Outlet, useLocation } from "react-router-dom";
import Nav from './components/nav';

import './App.css';

function App() {
    const [cart, setCart] = useState([]);

    return (
        <div>
            <Nav></Nav>
            <Outlet context={[cart, setCart]} />
        </div>
    );
}

export default App;
