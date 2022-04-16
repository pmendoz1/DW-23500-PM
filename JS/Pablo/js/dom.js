const contenedorCrypto = document.getElementById('contenedorCrypto');
const tituloTransaccion = document.createElement('h3');
const inputTransaccion = document.createElement('input');
const inputCantidad = document.createElement('input');
const buttonTransaccion = document.createElement('button');
const buttonComprar = document.createElement('button');
const buttonVender = document.createElement('button');
const buttonIngresoDinero = document.createElement('button');
const buttonRetiraDinero = document.createElement('button');
const buttonVolver = document.createElement('a');
tituloTransaccion.className = 'h3 mb-3 font-weight-normal'
inputTransaccion.className = 'form-control'
inputCantidad.className = 'form-control'
buttonTransaccion.className = 'btn btn-lg btn-primary btn-block'
buttonTransaccion.type = 'button'
buttonTransaccion.append("Continuar");

buttonComprar.className = 'btn btn-outline-primary'
buttonComprar.type = 'button'
buttonComprar.value = "Comprar"
buttonComprar.append("Comprar");

buttonVender.className = 'btn btn-outline-primary'
buttonVender.type = 'button'
buttonVender.value = "Vender"
buttonVender.append("Vender");

buttonIngresoDinero.className = 'btn btn-outline-primary'
buttonIngresoDinero.type = 'button'
buttonIngresoDinero.value = "IngresoDinero"
buttonIngresoDinero.append("Ingresar Dinero");

buttonRetiraDinero.className = 'btn btn-outline-primary'
buttonRetiraDinero.type = 'button'
buttonRetiraDinero.value = "RetiraDinero"
buttonRetiraDinero.append("Retirar Dinero");


buttonVolver.className = 'btn btn-lg btn-primary btn-block'