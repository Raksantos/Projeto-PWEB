import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import logo from './img/duo_simbolo.png';
import Cookies from 'universal-cookie';
import Navbar from "./navbar";
import Footer from "./footer";
import img1 from './img/img_melhores.jpg';
import img2 from './img/img_amigos.jpg';
import img3 from './img/img_cadastro.jpg';
const cookies = new Cookies();

export default class TelaHome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      usuario: null
    }
  }

  componentDidMount() {
    const user = cookies.get('usuario');
    if (user == undefined)
      this.props.history.push('/');
    if (user != null)
      this.setState({ usuario: user });
  }

  render() {
    return (
      <div className="">
        <Navbar />
        {this.state.usuario ?
          <div className="content-wrapper mb-5">
            <div id="carouselHome" className="carousel slide" data-ride="carousel">
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <div className="row justify-content-center">
                    <img className="d-block" src={img1} alt="First slide"></img>
                  </div>
                  <div className="container">
                    <div className="carousel-caption pb-5 mb-5">
                      <h1 className=""><strong>Jogue com os Melhores.</strong></h1>
                      <p>Forme equipes e enfrente os melhores competidores.</p>
                    </div>
                  </div>
                </div>
                <div className="carousel-item">
                  <div className="row justify-content-center">
                    <img className="d-block" src={img2} alt="Second slide"></img>
                  </div>
                  <div className="container">
                    <div className="carousel-caption pb-5 mb-5">
                      <h1><strong>Faça novos Amigos.</strong></h1>
                      <p>Encontre jogadores sérios e não-tóxicos em um ambiente amigável.</p>
                    </div>
                  </div>
                </div>
                <div className="carousel-item">
                  <div className="row justify-content-center">
                    <img className="d-block" src={img3} alt="Third slide"></img>
                  </div>
                  <div className="container">
                    <div className="carousel-caption pb-5 mb-5">
                      <h1><strong>Não perca tempo. Supere seus desafios.</strong></h1>
                      <p><a className="btn btn-light" href="/jogar">Jogue Agora</a></p>
                    </div>
                  </div>
                </div>
              </div>
              <a className="carousel-control-prev" href="#carouselHome" role="button" data-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="sr-only">Previous</span>
              </a>
              <a className="carousel-control-next" href="#carouselHome" role="button" data-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="sr-only">Next</span>
              </a>
            </div>
          </div>
          :
          <div className="content-wrapper">
            <div id="carouselHome" className="carousel slide" data-ride="carousel">
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <div className="row justify-content-center">
                    <img className="d-block" src={img1} alt="First slide"></img>
                  </div>
                  <div className="container">
                    <div className="carousel-caption pb-5 mb-5">
                      <h1 className=""><strong>Jogue com os Melhores.</strong></h1>
                      <p>Forme equipes e enfrente os melhores competidores.</p>
                    </div>
                  </div>
                </div>
                <div className="carousel-item">
                  <div className="row justify-content-center">
                    <img className="d-block" src={img2} alt="Second slide"></img>
                  </div>
                  <div className="container">
                    <div className="carousel-caption pb-5 mb-5">
                      <h1><strong>Faça novos Amigos.</strong></h1>
                      <p>Encontre jogadores sérios e não-tóxicos em um ambiente amigável.</p>
                    </div>
                  </div>
                </div>
                <div className="carousel-item">
                  <div className="row justify-content-center">
                    <img className="d-block" src={img3} alt="Third slide"></img>
                  </div>
                  <div className="container">
                    <div className="carousel-caption pb-5 mb-5">
                      <h1><strong>Entre agora ou Cadastre-se para participar.</strong></h1>
                      <p>É rápido, gratuito e precisamos apenas do seu email.</p>
                    </div>
                  </div>
                </div>
              </div>
              <a className="carousel-control-prev" href="#carouselHome" role="button" data-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="sr-only">Previous</span>
              </a>
              <a className="carousel-control-next" href="#carouselHome" role="button" data-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="sr-only">Next</span>
              </a>
            </div>
          </div>
        }
        <Footer />
      </div>
    );
  }
}
