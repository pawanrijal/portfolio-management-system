import Login from "./components/Login";
import Register from "./components/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Stock from "./components/AddStock";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="stock" element={<Stock />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
