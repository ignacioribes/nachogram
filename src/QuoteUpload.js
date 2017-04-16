import React, { Component } from 'react';

class QuoteUpload extends Component {
  // seteo de variables globales del componente
  constructor() {
    super();
  }

  render () {
  	return (
  		<div>
  			<input type="text" value="" />
  			<button onClick={this.props.SendQuote} >Enviar</button>
  		</div>
  	)
  }
}

export default QuoteUpload;