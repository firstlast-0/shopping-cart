import { useOutletContext, Outlet } from "react-router-dom";

function Shop() {
    const [cart, setCart] = useOutletContext();

    return (
        <div>
            <Outlet context={[cart, setCart]} />
        </div>
    );
}

export default Shop;
