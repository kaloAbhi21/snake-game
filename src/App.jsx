import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import Play from "./components/Play";

function App() {
  return (
    <Router>
      <Routes>
        <Route path={"/"} element={<Home />}></Route>
        <Route path={"/play"} element={<Play />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
