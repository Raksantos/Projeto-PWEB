import React from 'react';
import Cookies from 'universal-cookie';
import logo from './img/duo_simbolo.png';
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
        else
          this.setState({ redirect: true });
      }
    
      handleRedirect(event) {
        event.preventDefault();
        this.setState({ redirect: true })
      }

    render() {
        if (!this.state.redirect) {
            return (
                <nav className="site-header sticky-top py-1 bg-dark">
          <div className="container d-flex flex-column flex-md-row justify-content-between">
            <a className="py-2" href="">
              <img src={logo} className="img-fluid" style={{ width: '10%' }} alt="Simbolo_duo" />
            </a>
            <a className="py-2 d-none d-md-inline-block text-danger" href="/">Inicio</a>
            <a className="py-2 d-none d-md-inline-block text-info" href="/perfil">Perfil</a>
            <a className="py-2 d-none d-md-inline-block text-warning" href="/jogar">Jogar</a>
            <a className="py-2 d-none d-md-inline-block text-white" href="/noticias">Notícias</a>
            <a className="py-2 d-none d-md-inline-block text-gray" href="/suporte">Suporte</a>
            <a className="py-2 d-none d-md-inline-block text-success" href="/sobre">Sobre</a>
            <a className="py-2 d-none d-md-inline-block" href="/logout">Sair</a>
          </div>
        </nav>
            )
        } 

    }
}

