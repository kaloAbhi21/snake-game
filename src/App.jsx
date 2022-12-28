import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Dual from "./components/Dual";
import Home from "./components/Home";
import Play from "./components/Play";

function App() {
  return (
    <Router>
      <Routes>
        <Route path={"/"} element={<Home />}></Route>
        <Route path={"/play"} element={<Play />}></Route>
        <Route path={"/dual"} element={<Dual />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
