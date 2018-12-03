import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import logo from './img/duo_simbolo.png';
import Cookies from 'universal-cookie';
import BuscarDuoManual from "./buscarDuoManual";
import BuscarDuoAuto from "./buscarDuoAuto";
import Navbar from "./navbar";
import Footer from "./footer";
const cookies = new Cookies();

export default class Jogar extends Component {
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
				<div className="position-relative p-3 p-md-5 text-center bg-light">
				<h1 className="display-4 font-weight-normal">Buscar Duo</h1>
					<div className="row p-5">
						<div className="col-md-6 pb-5">
							<BuscarDuoManual />
						</div>
						<div className="col-md-6 pb-5">
							<BuscarDuoAuto />
						</div>	
					</div>
					<div className="product-device shadow-sm d-none d-md-block"></div>
					<div className="product-device product-device-2 shadow-sm d-none d-md-block"></div>
				</div>
				<Footer />
			</div>


		);
	}


}
