import './App.css';
import React from "react"
import { render } from "react-dom"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';


function App() {
    return (
      <BrowserRouter>
      <Switch>
      <Route path="/" component={Home} exact />
      <Route path="/login" component={Login} exact />
      </Switch>
      </BrowserRouter>
    );
}

export default App;