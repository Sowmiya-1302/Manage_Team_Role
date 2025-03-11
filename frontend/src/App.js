import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Teams from "./pages/Teams";
import Roles from "./pages/Roles";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/roles" element={<Roles />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;
