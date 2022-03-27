const contenedorCrypto = document.getElementById('contenedorCrypto');
const tituloTransaccion = document.createElement('h3');
const inputTransaccion = document.createElement('input')
const inputCantidad = document.createElement('input')
const buttonTransaccion = document.createElement('button')
tituloTransaccion.className = 'h3 mb-3 font-weight-normal'
inputTransaccion.className = 'form-control'
inputCantidad.className = 'form-control'
buttonTransaccion.className = 'btn btn-lg btn-primary btn-block'
buttonTransaccion.type = 'submit'
buttonTransaccion.append("Submit")