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
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">

            <a className="navbar-brand" href="">
              <img src={logo} className="img-fluid" style={{ width: '2rem', height: '3rem' }}  alt="Simbolo_duo" />
            </a>
             <div className="btn collapse navbar-collapse" id="navbarResponsive">
             <ul className="navbar-nav ml-auto">
               <li className="nav-item"><a className="nav-link py-2 d-none d-md-inline-block text-danger" href="/">Inicio</a></li>
               <li className="nav-item"><a className="nav-link py-2 d-none d-md-inline-block text-info" href="/perfil">Perfil</a></li>
               <li className="nav-item"><a className="nav-link py-2 d-none d-md-inline-block text-warning" href="/jogar">Jogar</a></li>
               <li className="nav-item"><a className="nav-link py-2 d-none d-md-inline-block text-success" href="/sobre">Sobre</a></li>
               <li className="nav-item"><a className="nav-link py-2 d-none d-md-inline-block" href="/logout">Sair</a></li>
              </ul>
            </div>

        </nav>
            )
        }

    }
}
