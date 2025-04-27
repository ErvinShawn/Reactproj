import { Link } from "react-router-dom";

const NavBar=()=>{
    return (
        <nav>
            <div>
                <Link to="/">Home</Link>
            </div>
            <div>
                <Link to="/">Home</Link>
                <Link to="/fav">Favourites</Link>
            </div>
        </nav>
    )
}

export default NavBar;