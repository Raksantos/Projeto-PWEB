import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import logo from './img/duo_simbolo.png';

export default class TelaHome extends Component {
  constructor(props) {
    super(props);
    this.state = { redirect: false, usuario: '' };
    this.handleRedirect = this.handleRedirect.bind(this);
  }

  componentDidMount() {
    console.log(this.props.usuario)
    this.setState({ usuario: this.props.usuario })
  }

  handleRedirect() {
    this.setState({ redirect: true })
  }
  render() {
    if (this.state.redirect === true) {
      return <Redirect to={{ pathname: '/perfil', state: { usuario: this.state.usuario } }} />
    }
    var nome = this.props.usuario.nome;
    var email = this.props.usuario.email;
    var jogos = this.props.usuario.jogos;
    var rotas = this.props.usuario.rotas;
    var descricao = this.props.usuario.descricao;
    var usuario = this.props.usuario.id;
    var token = this.props.usuario.token;
    console.log("Props     :" + JSON.stringify(this.props.usuario))
    console.log("State     :" + JSON.stringify(this.state.usuario))
    console.log("Redirect     :" + JSON.stringify(this.state.redirect))
    return (

      <div className="content-wrapper">
        <nav className="site-header sticky-top py-1 bg-dark">
          <div className="container d-flex flex-column flex-md-row justify-content-between">
            <a className="py-2" href="">
              <img src={logo} className="img-fluid" style={{ width: '10%' }} alt="Simbolo_duo" />
            </a>
            <a className="py-2 d-none d-md-inline-block text-danger" href="">Inicio</a>
            <a className="py-2 d-none d-md-inline-block text-info" onClick={this.handleRedirect}>Perfil</a>
            <a className="py-2 d-none d-md-inline-block text-warning" href="/jogos">Jogos</a>
            <a className="py-2 d-none d-md-inline-block text-white" href="/noticias">Notícias</a>
            <a className="py-2 d-none d-md-inline-block text-gray" href="/suporte">Suporte</a>
            <a className="py-2 d-none d-md-inline-block text-success" href="/sobre">Sobre</a>
            <a className="py-2 d-none d-md-inline-block" href="/">Sair</a>
          </div>
        </nav>

        <div className="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-light">
          <div className="col-md-5 p-lg-5 mx-auto my-5">
            <h1 className="display-4 font-weight-normal">Forme equipes</h1>
            <p className="lead font-weight-normal">Trave batalhas.</p>
            <a className="btn btn-outline-secondary text-dark" href="">Em breve.. </a>
          </div>
          <div className="product-device shadow-sm d-none d-md-block"></div>
          <div className="product-device product-device-2 shadow-sm d-none d-md-block"></div>
        </div>
        <footer class="container py-5">
          <div class="row">
            <div class="col-12 col-md">
              <img src={logo} className="img-fluid" style={{ width: '10%' }} alt="Simbolo_duo" />
              <small class="d-block mb-3 text-muted">&copy; 2018</small>
            </div>
            <div class="col-6 col-md">
              <h5>Conteúdo</h5>
              <ul class="list-unstyled text-small">
                <li><a class="text-muted" href="">Pessoas aleatórias</a></li>
                <li><a class="text-muted" href="">TOP 100</a></li>
                <li><a class="text-muted" href="">JOGADAS INÉDITAS</a></li>
              </ul>
            </div>
            <div class="col-6 col-md">
              <h5>Equipe</h5>
              <ul class="list-unstyled text-small">
                <li><a class="text-muted" href="">Conheça os programadores</a></li>
              </ul>
            </div>
          </div>
        </footer>
      </div>


    );
  }


}
