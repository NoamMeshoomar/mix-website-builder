import { Routes, Route, useLocation } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Home from './pages/Home/Home';
import Editor from './pages/Editor/Editor';
import WebsiteDisplayer from './pages/WebsiteDisplayer/WebsiteDisplayer';
import './App.css';

const App = () => {
    const location = useLocation();

    return (

        <div className="App">
            {location.pathname !== "/website" && <NavBar />}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/website" element={<WebsiteDisplayer />} />
                <Route path="/editor" element={<Editor />} />
            </Routes>
        </div>
    );
}

export default App;