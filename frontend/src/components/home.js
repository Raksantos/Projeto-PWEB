import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import logo from './img/duo_simbolo.png';
import Cookies from 'universal-cookie';
import Navbar from "./navbar";
import Footer from "./footer";
const cookies = new Cookies();

export default class TelaHome extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const user = cookies.get('usuario');
    if (user == undefined)
        this.props.history.push('/');        
}

  render() {
    return (
      <div>
      <Navbar />
      <div className="content-wrapper">
        <div className="position-relative overflow-hidden p-3 p-md-5 text-center bg-light">
          <div className="col-md-5 p-lg-5 mx-auto my-5">
            <h1 className="display-4 font-weight-normal">Forme equipes</h1>
            <p className="lead font-weight-normal">Trave batalhas.</p>
            <a className="btn btn-outline-secondary text-dark">Em breve.. </a>
          </div>
          <div className="product-device shadow-sm d-none d-md-block"></div>
          <div className="product-device product-device-2 shadow-sm d-none d-md-block"></div>
        </div>
      </div>
      <Footer />
      </div>


    );
  }


}
