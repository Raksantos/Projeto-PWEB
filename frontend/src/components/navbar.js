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
          <a className="navbar-brand" href="">
            <img src={logo} className="img-fluid" style={{ width: '2rem', height: '3rem' }} alt="Simbolo_duo" />
          </a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div className="btn collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav ml-auto">
              {this.state.usuario ?
                <div className="navbar-nav ml-auto">
                  <li className="nav-item"><a className="nav-link py-2 d-none d-md-inline-block text-danger btn btn-dark" type="button" href="/">Início</a></li>
                  <div className="dropdown btn btn-dark">
                    <img className="dropdown-toggle" src={perfilBusto} type="button" id="dropdownMenu2" data-toggle="dropdown"></img>
                    <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenu2">
                      <a className="dropdown-item text-info btn btn-dark" type="button" href="/perfil">Perfil</a>
                      <a className="dropdown-item text-warning btn btn-dark" type="button" href="/jogar">Jogar</a>
                      <a className="dropdown-item btn btn-dark" type="button" href="/logout">Sair</a>
                    </div>
                  </div>
                </div>
                :
                <div className="navbar-nav ml-auto">
                  <li className="nav-item"><a className="nav-link py-2 d-none d-md-inline-block text-danger btn btn-dark" type="button" href="/">Início</a></li>
                  <div className="dropdown">
                    <img className="dropdown-toggle btn btn btn-dark" src={perfilBusto} type="button" id="dropdownMenu1" data-toggle="dropdown"></img>
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
