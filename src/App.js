import React, { Component } from 'react';
import firebase from 'firebase';

import './App.css';

class App extends Component {
  // seteo de variables globales
  constructor() {
    super();
    this.state = {
      user: null
    };

    //que hace eso?
    this.handleAuth = this.handleAuth.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  // se activa cuando está todo cargado
  componentWillMount() {
    //guardo la infomacion nuevo despues de un login-logout
    firebase.auth().onAuthStateChanged(user => {
      this.setState({
        user: user
      });
    });
  }

  // login con firebase
  handleAuth () {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider)
      .then(result => console.log(`${result.user.email} ha iniciado sesion)`))
      .catch(error => console.log(`Error ${error.code}: ${error.message}`));
  }

  // logout con firebase
  handleLogout () {
    firebase.auth().signOut()
      .then(result => console.log(`${result.user.email} ha cerro la sesion)`))
      .catch(error => console.log(`Error ${error.code}: ${error.message}`));
  }

  // login button
  renderLoginButton () {
    if(this.state.user) {
      //si es usuario está logeado
      return (
        <div>
          <img src={this.state.user.photoURL} />
          <p>Hi {this.state.user.displayName}</p>
          <button onClick={this.handleLogout}>Logout</button>
        </div>
        );
    } else {
      //si el usuario no está logeado
      return (
        <button onClick={this.handleAuth}>Login with Google</button>
        )
    }
  }

  // render de la aplicacion
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Nachogram</h2>
        </div>
        <p className="App-intro">
          { this.renderLoginButton() }
        </p>
      </div>
    );
  }
}

export default App;
