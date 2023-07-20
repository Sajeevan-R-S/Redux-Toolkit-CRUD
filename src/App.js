import { BrowserRouter, Routes, Route } from "react-router-dom";

import Nav from "./components/Nav";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
    <Nav />
      <Routes>
        <Route path="/" element={<Home />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
