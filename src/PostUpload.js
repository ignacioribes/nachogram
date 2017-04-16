import React, { Component } from 'react';
import firebase from 'firebase';

class PostUpload extends Component {
  // seteo de variables globales del componente
  constructor() {
    super();
    this.state = {
      title: null
    };

    this.writeNewPost = this.writeNewPost.bind(this);
  }

  //subir post
  writeNewPost() {

  	// por ahora tengo estos valores en duro hasta que sepa como pasarlos
    const author = window.MyVars.userData.displayName;
    const uid = window.MyVars.userData.uid;
    const body = "body";

    // A post entry.
    var postData = {
      author: author,
      uid: uid,
      body: body,
      title: this.refs.title.value,
      starCount: 0
    };

    // Get a key for a new Post.
    var newPostKey = firebase.database().ref().child('posts').push().key;

    // Write the new post's data simultaneously in the posts list and the user's post list.
    var updates = {};
    updates['/posts/' + newPostKey] = postData;
    updates['/user-posts/' + uid + '/' + newPostKey] = postData;

    return firebase.database().ref().update(updates);
  }

  render () {
  	return (
  		<div>
			<input ref="title" type="text" placeholder="Enter topic here..." />
			<button onClick={ this.writeNewPost } >Enviar</button>
  		</div>
  	)
  }
}

export default PostUpload;