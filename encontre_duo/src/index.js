import React from 'react';
import ReactDOM from 'react-dom';
import Rotas from './rotas';
import registerServiceWorker from './registerServiceWorker';



ReactDOM.render(<Rotas/>
    , document.getElementById('root'));
registerServiceWorker();
