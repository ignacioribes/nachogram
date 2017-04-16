import React, { Component } from 'react';
import firebase from 'firebase';

class FileUpload extends Component {
  // seteo de variables globales del componente
  constructor() {
    super();
    this.state = {
      uploadValue: 0
    };

	this.uploadNewPhoto = this.uploadNewPhoto.bind(this);
  }

  // subir imagen
  uploadNewPhoto (event) {
    const file = event.target.files[0];
    const storageRef = firebase.storage().ref(`fotos/${file.name}`);
    const task = storageRef.put(file);

    // Listener que se ocupa del estado de la carga del fichero
    task.on('state_changed', snapshot => {
      // Calculamos el porcentaje de tamaño transferido y actualizamos
      // el estado del componente con el valor
      let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      this.setState({
        uploadValue: percentage
      })
    }, error => {
      // Ocurre un error
      console.error(error.message);
    }, () => {
      // Subida completada
      // Obtenemos la URL del fichero almacenado en Firebase storage
      // Obtenemos la referencia a nuestra base de datos 'pictures'
      // Creamos un nuevo registro en ella
      // Guardamos la URL del enlace en la DB
      const record = {
        photoURL: this.state.user.photoURL,
        displayName: this.state.user.displayName,
        image: task.snapshot.downloadURL
      }
      const dbRef = firebase.database().ref('pictures');
      const newPicture = dbRef.push();
      newPicture.set(record);
    });
  }

  render () {
  	return (
  		<div>
  			<br/>
  			<progress value={this.state.uploadValue} max="100">
  				{this.state.uploadValue} %
  			</progress>
  			<br/>
  			<input type="file" onChange={this.uploadNewPhoto}/>
  		</div>
  	)
  }
}

export default FileUpload;