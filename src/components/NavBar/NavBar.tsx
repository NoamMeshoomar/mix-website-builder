import { Link } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {
    return(
        <div className="NavBar">
            <Link to="/" className="logo">
                <h3 style={{fontSize: 42, fontWeight: 600, color: "var(--dark-grey-color)"}}>Mix</h3>
            </Link>
        </div>
    )
}

export default NavBar;