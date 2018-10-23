import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Duo from	'./components/duo_page';
import Cadastro from './components/cadastro';
import Login from './components/login';
import Perfil from './components/perfil';
import Home from './components/home';
import Logout from './components/logout';
import Jogar from './components/jogar';

export default class Rotas extends Component {
    render(){
        return (
            <Router>
                <Switch>
                    <Route exact path="/" component={Duo} />
                    <Route exact path="/cadastro" component={Cadastro} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/perfil" component={Perfil} />
                    <Route exact path="/home" component={Home} />
                    <Route exact path="/jogar" component={Jogar} />
                    <Route path="/logout" component={Logout} />
                </Switch>
            </Router>
            );
    }


}
