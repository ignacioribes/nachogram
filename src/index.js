import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import App from './App';
import './index.css';

firebase.initializeApp({
    apiKey: "AIzaSyDErtHEntY89cV4BZn6htwXSPs1-hTbvEI",
    authDomain: "nachogram-55f08.firebaseapp.com",
    databaseURL: "https://nachogram-55f08.firebaseio.com",
    projectId: "nachogram-55f08",
    storageBucket: "nachogram-55f08.appspot.com",
    messagingSenderId: "803636053967"
});

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
