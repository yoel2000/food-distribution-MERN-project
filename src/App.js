import React from "react"
import { render } from "react-dom"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Blog from './pages/Blog/Blog';
import Chat from './pages/Chat/Chat'
import Register from './pages/Register/Register';
import About from './pages/About/About';
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import contactUs from "./pages/Contact us/Contact us";
import Home_manager from "./pages/Home_manager/Home_manager";
import AddressesUpdate from "./pages/AddressesUpdate/AddressesUpdate";
import NavbarManager from "./components/NavBarManager/NavBarManager";
import DividersUpdate from "./pages/DividersUpdate/DividersUpdate";
import DailyDistribution from "./pages/DailyDistribution/DailyDistribution";
import HomeWorker from "./pages/Home_worker/Home_worker";
import NavbarWorker from "./components/NavbarWorker/NavBarWorker";


function App() {
    return (
      <BrowserRouter>
      <Navbar/>
      <div className="container mt-2" style={{ marginTop: 40 }}></div>
      <Switch>
      <Route path="/" component={Home} exact />
      <Route path="/login" component={Login} exact />
      <Route path='/register' component={Register} />
      <Route path='/about' component={About} />
      <Route path='/contactUs' component={contactUs} />
      <BrowserRouter>
      <NavbarManager/>
      <Route path='/home_manager' component={Home_manager}/>
      <Route path='/addressesUpdate' component={AddressesUpdate} />
      <Route path="/blog" component={Blog} />
      <Route path="/chat" component={Chat} />
      <Route path="/dividersUpdate" component={DividersUpdate} />
      <Route path="/dailyDistribution" component={DailyDistribution} />
      </BrowserRouter>
      <BrowserRouter>
      <NavbarWorker/>
      <Route path='/home_worker' component={HomeWorker} />
      <Route path="/blog" component={Blog} />
      <Route path="/chat" component={Chat} />
      </BrowserRouter>
      </Switch> <br/>
      </BrowserRouter>
    );
}

export default App;