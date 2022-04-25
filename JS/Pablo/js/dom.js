const contenedorCrypto = document.getElementById('contenedorCrypto');
const contenedorSubtitulo = document.getElementById('contenedorSubtitulo');
const tituloTransaccion = document.createElement('h3');
const inputTransaccion = document.createElement('input');
const inputUsuario = document.createElement('input');
const inputContrasena = document.createElement('input');
const inputCantidad = document.createElement('input');
const buttonTransaccion = document.createElement('button');
const buttonComprar = document.createElement('button');
const buttonVender = document.createElement('button');
const buttonIngresoDinero = document.createElement('button');
const buttonRetiraDinero = document.createElement('button');
const buttonVolver = document.createElement('a');

tituloTransaccion.className = 'h3 mb-3 font-weight-normal'
contenedorSubtitulo.className = 'contenedor-subtitulo'
inputTransaccion.className = 'form-control'
inputUsuario.className = 'form-control'
inputContrasena.className = 'form-control'
inputCantidad.className = 'form-control'
buttonTransaccion.className = 'btn btn-lg btn-primary btn-block'
buttonTransaccion.type = 'button'
buttonTransaccion.append("Continuar");

buttonComprar.className = 'btn btn-info'
buttonComprar.type = 'button'
buttonComprar.value = "Comprar"
buttonComprar.append("Comprar");

buttonVender.className = 'btn btn-info'
buttonVender.type = 'button'
buttonVender.value = "Vender"
buttonVender.append("Vender");

buttonIngresoDinero.className = 'btn btn-info'
buttonIngresoDinero.type = 'button'
buttonIngresoDinero.value = "IngresoDinero"
buttonIngresoDinero.append("Ingresar Dinero");

buttonRetiraDinero.className = 'btn btn-info'
buttonRetiraDinero.type = 'button'
buttonRetiraDinero.value = "RetiraDinero"
buttonRetiraDinero.append("Retirar Dinero");


buttonVolver.className = 'btn btn-lg btn-primary btn-block'