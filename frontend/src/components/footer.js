import './cadastroLogin.css';
import img_rodrigo from './img/rodrigo_dev.png';
import img_henrique from './img/henrique_dev.png';
import img_jao from './img/jao_dev.png';
import img_pedro from './img/pedro_dev.png';
import React from 'react';
import Cookies from 'universal-cookie';
import logo from './img/duo_simbolo.png';
const cookies = new Cookies();

export default class Footer extends React.Component {
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
              </ul>

            </div>
            <div className="col-6 col-md">
              <ul className="list-unstyled text-small">
                <br></br>
                <li><a className="text-muted" href="jogadas">JOGADAS INÉDITAS</a></li>
                <li><a className="text-muted" href="/sobre">Sobre</a></li>
              </ul>
            </div>
            <div className="col-6 col-md">
              <h5>Equipe</h5>
              <ul className="list-unstyled text-small">
                <li><a className="text-muted" target="_blank" rel="noopener" href="https://github.com/Raksantos/Projeto-PWEB">Conheça os programadores</a></li>
                <div className="row">
                  <div className="col-md-auto"><img src={img_rodrigo} className="icon_dev rounded-circle" alt="Desenvolvedor Rodrigo" /></div>
                  <div className="col-md-auto"><img src={img_pedro} className="icon_dev rounded-circle" alt="Desenvolvedor Pedro" /></div>
                  <div className="col-md-auto"><img src={img_jao} className="icon_dev rounded-circle" alt="Desenvolvedor Joao" /></div>
                  <div className="col-md-auto"><img src={img_henrique} className="icon_dev rounded-circle" alt="Desenvolvedor Henrique" /></div>
                </div>
              </ul>
            </div>
          </div>
        </footer>
      )
    }

  }
}

