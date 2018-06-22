import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Duo from './duo_page';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Duo />, document.getElementById('root'));
registerServiceWorker();
