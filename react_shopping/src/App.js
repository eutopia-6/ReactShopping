import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { Navbar } from "./components/navbar";
import { Shop } from "./pages/shop/shop";
import { Cart } from "./pages/cart/cart";
import { Notready } from './pages/notready/notready';
import { ShopContextProvider } from "./context/shop-context"
import { GoogleOAuthProvider } from '@react-oauth/google';
import './App.css';
import '../src/components/navbar.css'

function App() {
  return (
    <div className="App">
      <GoogleOAuthProvider clientId='97815386692-82ttib8dqglele56ndmsf9t0c1l17uii.apps.googleusercontent.com'>
        <ShopContextProvider>
        <Router>
          <Navbar/>
          <Routes>
            <Route path="/" element={ <Shop/> }/>
            <Route path="/cart" element={ <Cart/> }/>
            <Route path="/staytuned" element={ <Notready/> }/>
          </Routes>
        </Router>
        </ShopContextProvider>
      </GoogleOAuthProvider>
    </div>
  );
}

export default App;
