import { useState } from 'react';
import { Outlet } from "react-router-dom";
import Nav from './components/nav.jsx';
import './App.css';

function App() {
    const [cart, setCart] = useState([]);

    return (
        <div className='hom'>
            <Nav />
            <Outlet context={[cart, setCart]} />
        </div>
    );
}

export default App;
