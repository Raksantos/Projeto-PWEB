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
              {this.state.usuario ?
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <a className="nav-link text-info btn btn-dark" href="/perfil">Perfil</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link text-warning btn btn-dark" href="/jogar">Jogar</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link btn btn-dark" href="/logout">Sair</a>
                  </li>
                </ul>
                :
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item dropdown">
                    <span className="nav-link py-2 text-light btn btn-dark" id="dropdownMenu1" data-toggle="dropdown">Login/Cadastro</span>
                    <div className="dropdown-menu dropdown-menu-right">
                      <TelaLogin />
                    </div>
                  </li>
                </ul>
              }
          </div>
        </nav>
      )
    }

  }
}
