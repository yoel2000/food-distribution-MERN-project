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


function App() {
    return (
      <BrowserRouter>
      <Navbar/>
      <div className="container mt-2" style={{ marginTop: 40 }}></div>
      <Switch>
      <Route path="/" component={Home} exact />
      <Route path="/login" component={Login} exact />
      <Route path="/blog" component={Blog} />
      <Route path="/chat" component={Chat} />
      <Route path='/register' component={Register} />
      <Route path='/about' component={About} />
      <Route path='/contactUs' component={contactUs} />
      </Switch> <br/>
      <Footer/>
      </BrowserRouter>
    );
}

export default App;