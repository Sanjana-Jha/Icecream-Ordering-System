import './App.css';
import Home from './screens/Home';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Login from './screens/Login';
import Signup from './screens/Signup';
import Terms from './screens/Terms';
import FAQ from './screens/FAQ';
import Buy from './screens/Buy';
import Product from './screens/Product';
import Cart from './screens/Cart';
import Admin from './screens/Admin';
import AdminPanel from './screens/AdminPanel';
import Order from './screens/Order';
import Contact from './screens/Contact';

//import { CartProvider } from './components/CartContext';
//import { CartProvider } from './context/CartContext';
import { CartProvider } from './components/ContextRed';



function App() {
  return (
    <CartProvider>
      <Router>
        <div>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/createuser" element={<Signup />} />
            <Route exact path="/Terms" element={<Terms />} />
            <Route exact path="/FAQ" element={<FAQ />} />
            <Route exact path="/buy" element={<Buy />} />
            <Route exact path="/cart" element={<Cart />} />
            <Route exact path="/product" element={<Product />} />
            <Route exact path="/order" element={<Order />} />
            <Route exact path="/admin" element={<Admin />} />
            <Route path="/adminpanel" element={<AdminPanel />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
