import React from 'react';
import Cookies from 'universal-cookie';
import logo from './img/duo_simbolo.png';
import perfilBusto from './img/PerfilBusto.ico'
import TelaLogin from './login.js';
import 'bootstrap'
import './custom.css'
const cookies = new Cookies();

export default class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { redirect: false, usuario: '' };
    this.handleRedirect = this.handleRedirect.bind(this);
  }

  componentDidMount() {
    const user = cookies.get('usuario');
    if (user != undefined)
      this.setState({ usuario: user });
    //else
    //this.setState({ redirect: true });
  }

  handleRedirect(event) {
    event.preventDefault();
    this.setState({ redirect: true })
  }

  render() {
    if (!this.state.redirect) {
      return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <a className="navbar-brand" href="/">
            <img src={logo} className="img-fluid" style={{ width: '6%', height: '6%' }} alt="Simbolo_duo" />
            <span className="text-light">  Encontre seu Duo</span>
          </a>
          <button class="navbar-toggler" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav ml-auto">
              {this.state.usuario ?
                <div className="navbar-nav ml-auto">
                  <div className="dropdown btn btn-dark">
                    <img className="dropdown-toggle" src={perfilBusto} id="dropdownMenu2" data-toggle="dropdown"></img>
                    <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenu2">
                      <a className="dropdown-item text-info btn btn-dark" href="/perfil">Perfil</a>
                      <a className="dropdown-item text-warning btn btn-dark" href="/jogar">Jogar</a>
                      <a className="dropdown-item btn btn-dark" href="/logout">Sair</a>
                    </div>
                  </div>
                </div>
                :
                <div className="navbar-nav ml-auto">
                  <div className="dropdown">
                    <span className="nav-link py-2 d-none d-md-inline-block text-light btn btn-dark" id="dropdownMenu1" data-toggle="dropdown">Login/Cadastro</span>
                    <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenu1">
                      <TelaLogin />
                    </div>
                  </div>
                </div>
              }
            </ul>
          </div>
        </nav>
      )
    }

  }
}
