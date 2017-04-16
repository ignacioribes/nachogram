import React, { Component } from 'react';
import firebase from 'firebase';

import './App.css';
import background from './space.gif';
import FileUpload from './FileUpload';
import PostUpload from './PostUpload';

class App extends Component {
  constructor () {
    super();
    this.state = {
      user: null,
      pictures: [],
      posts: []
    };

    this.handleAuth = this.handleAuth.bind(this);
  }

  componentWillMount () {

    //hack to set global variable XD temporal nececito los datos del usuario en toda la app
     window.MyVars = {
          userData: null
      };
    // Cada vez que el método 'onAuthStateChanged' se dispara, recibe un objeto (user)
    // Lo que hacemos es actualizar el estado con el contenido de ese objeto.
    // Si el usuario se ha autenticado, el objeto tiene información.
    // Si no, el usuario es 'null'
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ user });

      // guardo datos del usuario en una variable global y me cargo todas las normas de seguridad
      window.MyVars.userData = user;
    });

    // traigo los fackings elementos desde firebase para mostrarlos
    firebase.database().ref('pictures').on('child_added', snapshot => {
      this.setState({
        pictures: this.state.pictures.concat(snapshot.val())
      });
    });

    firebase.database().ref('posts').on('child_added', snapshot => {
      this.setState({
        posts: this.state.posts.concat(snapshot.val())
      });
    });
  }

  handleAuth () {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider)
      .then(result => console.log(`${result.user.email} ha iniciado sesión`))
      .catch(error => console.log(`Error ${error.code}: ${error.message}`));
  }

  handleLogout () {
    firebase.auth().signOut()
      .then(result => console.log(`${result.user.email} ha iniciado sesión`))
      .catch(error => console.log(`Error ${error.code}: ${error.message}`));
  }

  renderLoginButton () {
    if (!this.state.user) {
      return (
        <div className="app-intro">
          <p className="app-intro-welcome-text">Come on dude, into the app!</p>
          <button onClick={this.handleAuth} className="app-btn">
            Log in with Google
          </button>
        </div>
      );
    } else  {
      return (
        <div className="app-intro">
          <p className="app-intro-welcome-text">Hi, { this.state.user.displayName }!</p>

          <button onClick={this.handleLogout} className="app-btn">
            Salir
          </button>

          <FileUpload onUpload={ this.handleUpload } />

          <br/>

          <PostUpload SendPost={ this.writeNewPost } />

          {
            this.state.pictures.map(picture => (
              <div className="app-card">
                <figure className="app-card-image">
                  <img width="320" src={picture.image} />
                  <figCaption className="app-card-footer">
                    <img className="app-card-avatar" src={picture.photoURL} alt={picture.displayName} />
                    <span className="app-card-name">{picture.displayName}</span>
                  </figCaption>
                </figure>
              </div>
            )).reverse()
          }

          {
            this.state.posts.map(post => (
              <p>{post.title} por {post.author}</p>
            )).reverse()
          }

        </div>

      );
    }
  }

  render() {
    return (
      <div className="app">
        <div className="app-header">
          <h2 className="app-logo">🚀</h2>
        </div>
        { this.renderLoginButton() }
      </div>
    );
  }
}

export default App;