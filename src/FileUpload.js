import React, { Component } from 'react';
import firebase from 'firebase';

class FileUpload extends Component {
  // seteo de variables globales del componente
  constructor() {
    super();
    this.state = {
      uploadValue: 0,
      picture: null
    };

    //hay que hacer un bind en las clases donde usamos this
    this.handleUpload = this.handleUpload.bind(this);
  }

	// esta funcion recibe un evento de onchange y se activa
	handleUpload (event) {
		// buscamos el primero porque puede ser multifile
		const file = event.target.files[0];
		const storageRef = firebase.storage().ref(`/photos/${file.name}`);
		const task = storageRef.put(file);
	
		task.on('state_changed', snapshot => {
			// hago el calculo para mostrar el avance del porcentaje
			let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
			this.setState ({
				uploadValue: percentage
			})
		}, error => {
			console.log(error.message)
		},() => {
			// cuando esta subida la imagen se guarda la URL
			this.setState({
				uploadValue: 100,
				picture: task.snapshot.downloadURL
			});
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
  			<input type="file" onChange={this.handleUpload}/>
  			<br/>
  			<img width="320" src={this.state.picture} alt="" />
  		</div>
  	)
  }
}

export default FileUpload;