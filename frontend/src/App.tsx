import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/homePage/HomePage";
import ShoppingCart from "./pages/shoppingCart/ShoppingCart";
import Navbar from "./components/navbar/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <main className="app">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cart" element={<ShoppingCart />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
