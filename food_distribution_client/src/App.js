import './App.css';
import React from "react"
import { render } from "react-dom"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Blog from './pages/Blog/Blog';
import Chat from './pages/Chat/Chat'
import Register from './pages/Register/Register';


function App() {
    return (
      <BrowserRouter>
      <Switch>
      <Route path="/" component={Home} exact />
      <Route path="/login" component={Login} exact />
      <Route path="/blog" component={Blog} />
      <Route path="/chat" component={Chat} />
      <Route path='/register' component={Register} />
      </Switch>
      </BrowserRouter>
    );
}

export default App;