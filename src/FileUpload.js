import React, { Component } from 'react';

class FileUpload extends Component {
  // seteo de variables globales del componente
  constructor() {
    super();
    this.state = {
      uploadValue: 0
    };
  }

  render () {
  	return (
  		<div>
  			<br/>
  			<progress value={this.state.uploadValue} max="100">
  				{this.state.uploadValue} %
  			</progress>
  			<br/>
  			<input type="file" onChange={this.props.onUpload}/>
  		</div>
  	)
  }
}

export default FileUpload;