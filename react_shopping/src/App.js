import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { Navbar } from "./components/navbar";
import { Shop } from "./pages/shop/shop";
import { Cart } from "./pages/cart/cart";
import { CheckoutForm } from './pages/notready/checkout';
import { ShopContextProvider } from "./context/shop-context"
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Favorites } from "./pages/favorites/favorites";
import './App.css';
import '../src/components/navbar.css'

function App() {
  return (
    <div className="App">
      <div className="App-Box">
        <GoogleOAuthProvider clientId='534515032115-eece85p2ciud1sbdnhu303kpnhc0kd0r.apps.googleusercontent.com'>
          <ShopContextProvider>
          <Router>
            <Navbar/>
            <Routes>
              <Route path="/" element={ <Shop/> }/>
              <Route path="/cart" element={ <Cart/> }/>
              <Route path="/checkout" element={ <CheckoutForm/> }/>
              <Route path="/favorites" element={ <Favorites/> }/>
            </Routes>
          </Router>
          </ShopContextProvider>
        </GoogleOAuthProvider>
      </div>
    </div>
  );
}

export default App;
