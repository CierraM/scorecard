import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import './App.css';
import Home from "./pages/home";
import ScoreCard from "./pages/scoreCard";
import Course from "./pages/course";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/:id" element={<ScoreCard/>}/>
                <Route path="/create" element={<Course/>}/>
            </Routes>
        </Router>
    );
}

export default App;
