import React from 'react';
import logo from './logo.svg';
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Listado de Productos</Link>
            </li>
            <li>
              <Link to="/carro">Resumen de Carro de compras</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/carro">
            <ShoppingCart />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

const Home = () => {
  return <h2>Listado de Productos</h2>;
}

const ShoppingCart = () => {
  return <h2>Resumen de Carro de compras</h2>;
}

export default App;
