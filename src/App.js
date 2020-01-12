import React from 'react';
import './App.css';
import axios from 'axios';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


const App = () => {
  const as = getList();
  console.log(as);
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

const getList = async () =>{
  try {
    const res = await axios.get(`http://api-search.cuponatic.com/get?c=Santiago&categoria=Belleza&n=60`, {
      headers: {
        'Content-Type': null
      }
    });
    return res;
  } catch (error) {
     console.log(error);
  }
}

const Home = () => {
  return <h2>Listado de Productos</h2>;
}

const ShoppingCart = () => {
  return <h2>Resumen de Carro de compras</h2>;
}

export default App;
