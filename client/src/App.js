import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import FoodDetail from './pages/FoodDetail';
import FoodCard from './pages/FoodCard';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import 'remixicon/fonts/remixicon.css'
import "./styles/routerStyle.scss"
import SuccessPayment from './pages/SuccessPayment';
import FailedPayment from './pages/FailedPayment';
const router = createBrowserRouter([
  {
    path: "/",
    element:
      <div className='pageDiv'>
        <Header />
        <Home />
        <Footer />
      </div>
  },
  {
    path: "/foodDetail",
    element:
      <div className='pageDiv'>
        <Header />
        <FoodDetail />
        <Footer />
      </div>
  },
  {
    path: "/foods",
    element:
      <div className='pageDiv'>
        <Header />
        <FoodCard />
        <Footer />
      </div>
  },
  {
    path: "/cart",
    element:
      <div className='pageDiv'>
        <Header />
        <Cart />
        <Footer />
      </div>
  },
  {
    path: "/checkout",
    element:
      <div className='pageDiv'>
        <Header />
        <Checkout />
        <Footer />
      </div>
  },
  {
    path: "/contact",
    element:
      <div className='pageDiv'>
        <Header />
        <Footer />
      </div>
  },
  {
    path: "/login",
    element:
      <div className='pageDiv'>
        <Header />
        <Login style={{flex:1}}/>
        <Footer />
      </div >
  },
{
  path: "/signup",
    element:
  <div className='pageDiv'>
    <Header />
    <Signup />
    <Footer />
  </div>
},
{
  path: "/successfulPayment",
    element:
  <div className='pageDiv'>
    <Header />
    <SuccessPayment />
    <Footer />
  </div>
},
{
  path: "/failedPayment",
    element:
  <div className='pageDiv'>
    <Header />
    <FailedPayment />
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
