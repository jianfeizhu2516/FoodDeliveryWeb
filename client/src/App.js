import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import  Header  from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import FoodDetail from './pages/FoodDetail';
import FoodCard from './pages/FoodCard';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import 'remixicon/fonts/remixicon.css'

const router = createBrowserRouter([
  {
    path: "/",
    element:
      <div>
        <Header />
        {/* <Home /> */}
        <Footer />
      </div>
  },
  {
    path: "/foodDetail",
    element:
      <div>
        <Header />
        <FoodDetail />
        <Footer />
      </div>
  },
  {
    path: "/foods",
    element:
      <div>
        <Header />
        {/* <FoodCard /> */}
        <Footer />
      </div>
  },
  {
    path: "/cart",
    element:
      <div>
        <Header />
        {/* <Cart /> */}
        <Footer />
      </div>
  },
  {
    path: "/checkout",
    element:
      <div>
        <Header />
        <Checkout />
        <Footer />
      </div>
  },
  {
    path: "/contact",
    element:
      <div>
        <Header />
        <Footer />
      </div>
  },

]);
function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
