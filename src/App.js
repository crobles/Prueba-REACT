import React, { Component } from 'react';
import './App.scss';
//import axios from 'axios';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


class App extends Component {

  state = {
    list: [],
    cart: [],
    valueList: 'select'
  }

  componentDidMount() {
    /*axios.get(`http://api-search.cuponatic.com/get?c=Santiago&categoria=Belleza&n=60`)
      .then(res => {
        const lista = res.data;
        this.setState({ lista });
      })*/
    const listProd = require('./files/lista2.json');
    this.setState({
      list: listProd
    });
    
    if (localStorage.getItem('carrito')!= null) {
      const data = JSON.parse(localStorage.getItem("carrito"));
      this.setState({
        cart: data
      });
      let total = 0;
      for (const iterator of data) {
        let repa = null;
        repa = data[0].price.replace("$","");
        repa = repa.replace(".","");
        repa = parseInt(repa);
        total = total + repa;
      }
      console.log(total);
      localStorage.setItem('totalCompra', total );
    }
    

  }



  price(obj) { //convert obj.price to float
    return parseFloat(obj.valor_oferta.replace(/[^\.\d]/g, ''));
  }

  sortJson = (event) => {
    this.setState({
      valueList: event.target.value
    });
    if (event.target.value === 'titulo') {
      this.state.list.sort((a, b) => a.titulo.localeCompare(b.titulo));
    } else if (event.target.value === 'valor_oferta<') {
      this.state.list.sort((a, b) => this.price(a) - this.price(b));
    } else if (event.target.value === 'valor_oferta>') {
      this.state.list.sort((a, b) => this.price(b) - this.price(a));
    } else if (event.target.value === 'calificaciones') {
      this.state.list.sort((a, b) => b.calificaciones.localeCompare(a.calificaciones));
    } else if (event.target.value === 'distancia') {
      this.state.list.sort((a, b) => parseInt(a.distancia) - parseInt(b.distancia));
    }
  }

  addCart = (event) => {
    const elementID = event.target.id;
    const elementName = event.target.name;
    const elementPrice = event.target.value;
    const obj = this.state.cart;
    const elements = {
      'id': elementID,
      'name': elementName,
      'price': elementPrice
    };
    obj.push(elements);
    this.setState({
      cart: obj
    });
    localStorage.setItem('carrito', JSON.stringify(this.state.cart));
  }

  deleteCart = (event) => {
    const elementID = event.target.id;
    const obj = this.state.cart;
    for (var i = 0; i < obj.length; i++) {
      if (obj[i].id === elementID) {
        obj.splice(i, 1);
        break;
      }
    }
    
    this.setState({
      cart: obj
    });
    localStorage.setItem('carrito', JSON.stringify(this.state.cart));
  }

  ShoppingCart = () => {
    if (localStorage.getItem('carrito')!= null && localStorage.getItem('totalCompra')>0) {
      const data = JSON.parse(localStorage.getItem("carrito"));
      const total = localStorage.getItem("totalCompra")
      return (
        <div>
          <h2>Resumen de Carro de compras</h2>
          <div className='listProdNav'>
            <p>Productos comprados</p>
                <table>
                <tr>
                  <td>Producto</td>
                  <td>Precio</td>
                </tr>
                {
                  data.map(list =>
                    <tr>
                      <td>{list.name.substring(0, 30)+'...'}</td>
                      <td>{list.price}</td>
                    </tr>
                    
                  )
                }
                </table>
              <p>Su total es: {total}</p>
          </div>
        </div>
      );
    } else {
      return (<p>No hay lista de compras por pagar</p>);
    }
    
  }

  ShoppingCart2 = () => {
    localStorage.removeItem('carrito');
    localStorage.setItem('carrito', JSON.stringify(this.state.cart));
    window.location.href = "http://localhost:3000/carro";
  }

  render(){ 
    return(
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
            <this.ShoppingCart />
          </Route>
          <Route path="/">
            <this.Home />
          </Route>
        </Switch>
      </div>
    </Router>
    );
  }

  Home = () => {
    return (
      <div>
        <h2>Listado de Productos</h2>
        
        <div className='contentList'>
          <div>
            <select onChange={this.sortJson} >
              <option value="0" >Ordernar por...</option>
              <option value="titulo" >Titulo</option>
              <option value="valor_oferta<" >Menor Precio</option>
              <option value="valor_oferta>" >Mayor Precio</option>
              <option value="calificaciones" >Mejor Calificación</option>
              <option value="distancia" >Menor Distancia</option>
            </select>
          </div>

          { this.state.list.map(list => 
            <div className='contentProd'>
              <div className='image'>
                <img src={list.imagen_url}/>
              </div>
              <div className='attrs tittle'>{list.titulo}</div>
              <div className='attrs rate'>
                Calificaciones: {list.calificaciones}
                <br></br>
                Distancia: {list.distancia_format}
              </div>
              <div className='attrs off'>
                <li>Valor: {list.valor_original}</li>
                <li>Oferta: {list.valor_oferta}</li>
              </div>
              <div className='attrs addButton'>
                <button id={list.id_descuento} name={list.titulo} value={list.valor_oferta} onClick={this.addCart}>
                  Agregar
                </button>
              </div>
            </div>
          )}
        </div>
        <div className='floatCart'>
          <p>Carro de Compras</p>
          <div className='listProdNav'>
            <table>
            {
              this.state.cart.map(list =>
                <div className='contentProductCart'>
                  <tr>
                    <td>{list.name.substring(0, 30)+'...'}</td>
                    <td><button id={list.id}  onClick={this.deleteCart}>Quitar</button></td>
                  </tr>
                </div>
              )
            }
            </table>
          </div>
          {this.state.cart.length > 0
            ? <button onClick={this.ShoppingCart2}> Pagar </button>
            : null
          }
        </div>
      </div> 
    );
  }

 



}

export default App;
