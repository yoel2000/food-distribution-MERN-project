import React from "react"
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
import NavbarManager from "./components/NavBarManager/NavBarManager";
import DividersUpdate from "./pages/DividersUpdate/DividersUpdate";
import HomeWorker from "./pages/Home_worker/Home_worker";
import NavbarWorker from "./components/NavbarWorker/NavBarWorker";

import DailyDistribution from "./pages/DailyDistribution/DailyDistribution2";
import Deliveries from "./pages/Deliveries/Deliveries2";

import Dashboard from "./pages/Dashboard/Dashboard";
import ChatContainer from "./pages/ChatContainer/ChatContainer";
import { UserContextProvider } from "./UserContext";
import { ManagerChat } from "./pages/ManagerChat/ManagerChat";
import myPieChart from "./components/PieChart/PieChart";
import MyChart from "./components/Chart/Chart";



function App() {
    return (
      <BrowserRouter>
      <UserContextProvider>
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
      <Route path='/deliveries' component={Deliveries} />
      <Route path="/blog" component={Blog} />
      <Route path="/chat" component={ManagerChat} />
      <Route path="/dividersUpdate" component={DividersUpdate} />
      <Route path="/dailyDistribution" component={DailyDistribution} />
      <Route path='/addressesUpdate' component={Deliveries} />
      <Route path='/dashboard' component={Dashboard} />
      <Route path='/piechart' component={myPieChart} />
      <Route path="/mychart" component={MyChart} />
      </BrowserRouter>
      <BrowserRouter>
      <NavbarWorker/>
      <Route path='/home_worker' component={HomeWorker} />
      <Route path="/blog" component={Blog} />
      <Route path="/chat" component={ManagerChat} />
      </BrowserRouter>
      </Switch>
      </UserContextProvider>
      </BrowserRouter>
    );
}

export default App;