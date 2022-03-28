import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
    return(
        <div className="Home">
            <h1>Go to Editor!</h1>
            <Link to="/editor">Editor</Link>
        </div>
    )
}

export default Home;