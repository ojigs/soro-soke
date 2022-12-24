import "./App.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faMicrophone } from "@fortawesome/free-solid-svg-icons";
import Home from "./pages/home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

library.add(faMicrophone);

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
      <Home />
    </div>
  );
}

export default App;
