import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import logo from './img/duo_simbolo.png';
import Cookies from 'universal-cookie';
import Navbar from "./navbar";

const cookies = new Cookies();

export default class TelaHome extends Component {
  constructor(props) {
    super(props);
    this.state = { redirect: false, usuario: '' };
    this.handleRedirect = this.handleRedirect.bind(this);
  }

  componentDidMount() {
    const user = cookies.get('usuario');
    if (user != undefined)
      this.setState({ usuario: user });
    else
      this.setState({ redirect: true });
  }

  handleRedirect(event) {
    event.preventDefault();
    this.setState({ redirect: true })
  }
  render() {
    if (this.state.redirect === true) {
      return <Redirect to={{ pathname: '/' }} />
    }

    return (
      <div className="content-wrapper">
        <Navbar />

        <div className="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-light">
          <div className="col-md-5 p-lg-5 mx-auto my-5">
            <h1 className="display-4 font-weight-normal">Forme equipes</h1>
            <p className="lead font-weight-normal">Trave batalhas.</p>
            <a className="btn btn-outline-secondary text-dark">Em breve.. </a>
          </div>
          <div className="product-device shadow-sm d-none d-md-block"></div>
          <div className="product-device product-device-2 shadow-sm d-none d-md-block"></div>
        </div>
        <footer className="container py-5">
          <div className="row">
            <div className="col-12 col-md">
              <img src={logo} className="img-fluid" style={{ width: '10%' }} alt="Simbolo_duo" />
              <small className="d-block mb-3 text-muted">&copy; 2018</small>
            </div>
            <div className="col-6 col-md">
              <h5>Conteúdo</h5>
              <ul className="list-unstyled text-small">
                <li><a className="text-muted" href="aleatorio">Pessoas aleatórias</a></li>
                <li><a className="text-muted" href="top100">TOP 100</a></li>
                <li><a className="text-muted" href="jogadas">JOGADAS INÉDITAS</a></li>
              </ul>
            </div>
            <div className="col-6 col-md">
              <h5>Equipe</h5>
              <ul className="list-unstyled text-small">
                <li><a className="text-muted" target="_blank" rel="noopener" href="https://github.com/Raksantos/Projeto-PWEB">Conheça os programadores</a></li>
              </ul>
            </div>
          </div>
        </footer>
      </div>


    );
  }


}
