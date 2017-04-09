import React, { Component } from 'react';
import firebase from 'firebase';

//importo elemento creado por mi
import FileUpload from './FileUpload';

//importo css
import './App.css';

class App extends Component {
  // seteo de variables globales del componente
  constructor() {
    super();
    this.state = {
      user: null
    };

    //hay que hacer un bind en las clases donde usamos this
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
          <img src={this.state.user.photoURL} alt={this.state.user.displayName} />
          <p>Hi {this.state.user.displayName}</p>
          <button onClick={this.handleLogout}>Logout</button>

          <FileUpload />

        </div>
        );
    } else {
      //si el usuario no está logeado
      return (
        <button onClick={this.handleAuth}>Login with Google</button>
        )
    }
  }

  // render final de la aplicacion
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to Nachograms ⚡️</h2>
        </div>
        <p className="App-intro">
          { this.renderLoginButton() }
        </p>
      </div>
    );
  }
}

export default App;
