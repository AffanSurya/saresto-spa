import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NavbarComponent from "./components/Navbar";
import FooterComponent from "./components/Footer";
import Order from "./pages/Order";

function App() {
  return (
    <Router>
      <NavbarComponent />
      <div className="mx-auto flex min-w-0 max-w-4xl flex-col px-4 pb-12 pt-6 lg:px-8 lg:pb-16 lg:pt-8 xl:pb-24">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pesan" element={<Order />} />
        </Routes>
      </div>
      <FooterComponent />
    </Router>
  );
}

export default App;
