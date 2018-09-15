import React, { Component } from 'react';
import './App.css';


class App extends Component {

  render() {
    return (
      <div className="App">
        <a href='https://api.instagram.com/oauth/authorize/?client_id=700c80600a8040cda30166ee4e4f8cc2&redirect_uri=http://localhost:3000/pictures&response_type=code'>
          <button type="button" className="button btn btn-info">Print photos from instagram</button>
        </a>
      </div>
    );
  }
}

export default App;