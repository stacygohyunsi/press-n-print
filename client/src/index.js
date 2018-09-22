import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import Main from './Main';
import Pictures from './Pictures';
import MyPictureList from './MyPictureList';
import Address from './Address';
import ThankYouInfo from './ThankYouInfo';
import store, { history } from './store';

import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, Route } from 'react-router-dom'


const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <div className="sans-serif">
        <Route exact path="/" component={Main} />
        <Route exact path="/pictures" component={Pictures} />
        <Route exact path="/cropping" component={MyPictureList} />
        <Route exact path="/success" component={ThankYouInfo} />        
        <Route exact path="/address" component={Address} />        
      </div>
    </BrowserRouter>
  </Provider>
);


ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
