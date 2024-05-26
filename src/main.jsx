import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx';
import Shop from './components/shop.jsx';
import Card from './components/card.jsx';
import Cart from './components/cart.jsx';
import Home from './components/home.jsx';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            { index: true, element: <Home /> },
            {
                path: 'shop',
                element: <Shop />,
                children: [
                    { index: true, element: <Card /> },
                    { path: 'cart', element: <Cart /> },
                ],
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
