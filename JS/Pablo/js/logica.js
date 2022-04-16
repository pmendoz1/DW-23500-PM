//Llena arrayCryptos con fetch de coinranking.com vía CORS proxy
fetch(`${proxyUrl}${baseUrl}`, { 
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': `${apiKey}`,
      'Access-Control-Allow-Origin': "*"
    }
})
.then((respuesta) => {
    if(respuesta.ok) {
        respuesta.json().then((consulta) => {
            arrayCryptos = consulta.data.coins
            console.log(arrayCantidadCryptos)
            for(i=0;i<arrayCryptos.length;i++){
                arrayCantidadCryptos[i].id = i
                arrayCantidadCryptos[i].uuid = arrayCryptos[i].uuid;
                arrayCantidadCryptos[i].symbol = arrayCryptos[i].symbol;
                arrayCantidadCryptos[i].iconUrl = arrayCryptos[i].iconUrl;
                arrayCantidadCryptos[i].cantidad = 0
            }
            console.log(arrayCryptos)
            console.log(arrayCantidadCryptos)
            console.log(arrayCantidadCryptos[2].id)
        })
    }
})
.catch((error) => {
    console.log(error)
})

// Genera cotizaciones random para las Cryptos
function calculaTransaccion(primerNumero, segundoNumero, operacion) {
    comisionTransaccion = (segundoNumero * comision).toFixed(2);
    switch (operacion) {
        case "+":
            return primerNumero + segundoNumero;
        case "-":
            return primerNumero - segundoNumero;
        default:
            return 0;
    }
}
// Se guardan cálculos de compra, ventas de cryptos y movimientos de billetera por cada transaccion realizada.
function guardaCalculo() {
    arrayCantidadCryptos[idCrypto].cantidad = calculaTransaccion((JSON.parse(localStorage.getItem("arrayCantidadCryptos")))[idCrypto].cantidad, cantidadIngresada, operacion);
    cantidadBilletera = calculaTransaccion(cantidadBilletera, (cantidadIngresada * arrayCryptos[idCrypto].price), operacionBilletera) - comisionTransaccion;
    localStorage.setItem("arrayCantidadCryptos", JSON.stringify(arrayCantidadCryptos));
}
// Se renderiza página, de acuerdo a la lógica aplicada.
function renderizaPagina(resultado) {
    contenedorCrypto.innerHTML = '';
    switch (resultado) {
        case "compraOK":
            Swal.fire({
                title: '¡Felicitaciones!',
                text: `La compra fue realizada con éxito. La comisión por esta transacción fue de ${comisionTransaccion} pesos. Usted dispone de ${arrayCantidadCryptos[idCrypto].cantidad} ${tipoCrypto.toUpperCase()} y ${cantidadBilletera.toFixed(2)} pesos en su saldo`,
                icon: 'success',
                confirmButtonColor: "#800080",
                timer:0,
            })
            decreceTransacciones();
            break;
        case "compraNoOK":
            Swal.fire({
                title: '¡Ops!',
                text: 'No dispone de suficiente dinero en billetera.',
                icon: 'error',
                confirmButtonColor: "#800080",
                timer:0,
            })
            bucleTransaccion();
            break;
        case "ventaOK":
            Swal.fire({
                title: '¡Felicitaciones!',
                text: `La venta fue realizada con éxito. La comisión por esta transacción fue de ${comisionTransaccion} pesos. Usted dispone de ${arrayCantidadCryptos[idCrypto].cantidad} ${tipoCrypto.toUpperCase()} y ${cantidadBilletera.toFixed(2)} pesos en su saldo`,
                icon: 'success',
                confirmButtonColor: "#800080",
                timer:0,
            })
            decreceTransacciones();
            break;
        case "ventaNoOK":
            Swal.fire({
                title: '¡Ops!',
                text: `No tiene suficientes ${tipoCrypto} para vender.`,
                icon: 'warning',
                confirmButtonColor: "#800080",
                timer:0,
            })
            bucleTransaccion();
            break;
        case "ingresoBilleteraOK":
            Swal.fire({
                title: '¡Felicitaciones!',
                text: `Dinero ingresado con éxito. La comisión por esta transacción fue de ${comisionTransaccion} pesos. Usted dispone de ${cantidadBilletera.toFixed(2)} pesos en su billetera`,
                icon: 'success',
                confirmButtonColor: "#800080",
                timer:0,
            })
            decreceTransacciones();
            break;
        case "retiroBilleteraOK":
            Swal.fire({
                title: '¡Felicitaciones!',
                text: `Dinero retirado con éxito. La comisión por esta transacción fue de ${comisionTransaccion} pesos. Usted dispone de ${cantidadBilletera.toFixed(2)} pesos en su billetera`,
                icon: 'success',
                confirmButtonColor: "#800080",
                timer:0,
            })
            decreceTransacciones();
            break;
        case "retiroBilleteraNoOK":
            Swal.fire({
                title: '¡Ops!',
                text: `No tiene fondos suficientes. Ustede dispone de ${cantidadBilletera.toFixed(2)} pesos.`,
                icon: 'warning',
                confirmButtonColor: "#800080",
                timer:0,
            })
            bucleTransaccion();
            break;
        case "transaccionesEjecutadas":
            tituloTransaccion.innerHTML = `Todas las transacciones fueron ejecutadas. Muchas gracias por utilizar nuestro servicio`;
            buttonVolver.innerText = "Volver a empezar";
            buttonVolver.href = "../";
            contenedorCrypto.append(tituloTransaccion, buttonVolver);
    }
}
// Se descuentan transacciones a realizar
function decreceTransacciones() {
    numeroDeTransacciones--
    numeroDeTransacciones > 0 ? bucleTransaccion() : renderizaPagina("transaccionesEjecutadas");
}



//Mostramos página de cantidad de transacciones.
tituloTransaccion.innerHTML = "Ingrese el número de transacciones a realizar:"
contenedorCrypto.append(tituloTransaccion, inputTransaccion, buttonTransaccion);
buttonTransaccion.onclick = () => {
    numeroDeTransacciones = parseInt(inputTransaccion.value);
    inputTransaccion.value = '';
    bucleTransaccion();
}
//Ejecutamos transacciones de acuerdo a la opción seleccionada.
function bucleTransaccion() {
    if (!localStorage.getItem('arrayCantidadCryptos')) localStorage.setItem('arrayCantidadCryptos', JSON.stringify(arrayCantidadCryptos));
    arrayCantidadCryptos = (JSON.parse(localStorage.getItem("arrayCantidadCryptos")));
    contenedorCrypto.innerHTML = '';
    tituloTransaccion.innerHTML = "Qué tipo de transacción quiere realizar?";
    contenedorCrypto.append(tituloTransaccion, buttonComprar, buttonVender, buttonIngresoDinero, buttonRetiraDinero);
    buttonComprar.onclick = () => {


        const renderizarTienda = () => {
            contenedorCrypto.innerHTML = '';
            for (const producto of arrayCryptos) {
              //Creamos los elementos HTML
              const divProducto = document.createElement('div');
            //   const imgProducto = document.createElement('img');
              const nombreProducto = document.createElement('h2');
              const precioProducto = document.createElement('h3');
              const cantidadCrypto = document.createElement('input')
              const botonComprar = document.createElement('button');
          
              //Les agregamos los estilos asignandoles clases de css
              divProducto.className = 'card';
            //   imgProducto.className = 'card-img-top';
              nombreProducto.className = 'nombre-producto';
              precioProducto.className = 'card-precio';
              cantidadCrypto.className = 'form-control'
              botonComprar.className = 'btn btn-primary';
          
              //Le agregamos el contenido a los elementos creados y el id a los que vamos a necesitar despues
            //   imgProducto.src = producto.img;
              nombreProducto.append(producto.symbol);
              precioProducto.append(`$ ${parseInt(producto.price).toFixed(2)}`);
              botonComprar.append('Comprar');
              botonComprar.id = producto.uuid;
          
              botonComprar.onclick = () => {
                const productoComprado = arrayCantidadCryptos.find(producto => producto.uuid === botonComprar.id);
                // let foundIndex = arrayCantidadCryptos.findIndex(x => x === "symbol: producto.symbol)
                console.log(productoComprado);
                arrayCantidadCryptos[productoComprado.id].cantidad = parseInt(cantidadCrypto.value);
                console.log(arrayCantidadCryptos)
                cantidadCrypto.value = ''
                

                // carrito.push({ nombre: productoComprado.modelo, precio: productoComprado.precio })
                // localStorage.setItem("carrito", JSON.stringify(carrito))
              }
            //Agregamos los elementos creados a su elemento contenedor que es divProducto
                divProducto.append(nombreProducto, precioProducto, cantidadCrypto, botonComprar);
    
            //Le agregamos al contenedor de la tienda cada uno de los divProducto
                contenedorCrypto.append(divProducto);
            }
        }
        renderizarTienda();
    }



    //     operacion = "+"
    //     operacionBilletera = "-"
    //     contenedorCrypto.innerHTML = '';
    //     tituloTransaccion.innerHTML = `<h1> Indique crypto y cantidad a comprar.</h1>
    //     <h2>A continuación cryptos disponibles y su cotización:</h2>
    //     <p>${arrayCryptos[1].symbol}:  ${parseInt(arrayCryptos[1].price).toFixed(2)}</p>
    //     <p>${arrayCryptos[0].symbol}:  ${parseInt(arrayCryptos[0].price).toFixed(2)}</p>`;
    //     contenedorCrypto.append(tituloTransaccion, inputTransaccion, inputCantidad, buttonTransaccion);
    //     buttonTransaccion.onclick = () => {
    //         tipoCrypto = inputTransaccion.value
    //         cantidadIngresada = parseInt(inputCantidad.value);
    //         inputTransaccion.value = '';
    //         inputCantidad.value = '';
    //         //Analizamos si para la crypto seleccionada tenemos suficiente dinero y mostramos opciones de acuerdo al análisis.
    //         if(tipoCrypto.toUpperCase() === "ETH" && cantidadBilletera >= (cantidadIngresada * arrayCryptos[1].price)){
    //             idCrypto = 1;
    //             guardaCalculo();
    //             renderizaPagina("compraOK");
    //         }else if(tipoCrypto.toUpperCase() === "BTC" && cantidadBilletera >= (cantidadIngresada * arrayCryptos[0].price)){
    //             idCrypto = 0;
    //             guardaCalculo();
    //             renderizaPagina("compraOK");
    //         }else{
    //             renderizaPagina("compraNoOK");
    //         }
    //     }
    // }
    buttonVender.onclick = () => {
        operacion = "-"
        operacionBilletera = "+"
        contenedorCrypto.innerHTML = '';
        tituloTransaccion.innerHTML = `<h1> Indique crypto y cantidad a vender.</h1>
        <h2>A continuación cryptos disponibles y su cotización:</h2>
        <p>${arrayCryptos[1].symbol}:  ${parseInt(arrayCryptos[1].price).toFixed(2)}</p>
        <p>${arrayCryptos[0].symbol}:  ${parseInt(arrayCryptos[0].price).toFixed(2)}</p>`;
        contenedorCrypto.append(tituloTransaccion, inputTransaccion, inputCantidad, buttonTransaccion);
        buttonTransaccion.onclick = () => {
            tipoCrypto = inputTransaccion.value
            cantidadIngresada = parseInt(inputCantidad.value);
            inputTransaccion.value = '';
            inputCantidad.value = '';
            //analizamos crypto sleccionada, si tenemos suficientes para vender y sumamos cantidad vendida a billetera.
            if(tipoCrypto.toUpperCase() === "ETH" && arrayCantidadCryptos[1].cantidad >= cantidadIngresada){
                idCrypto = 1;
                guardaCalculo();
                renderizaPagina("ventaOK");
            }else if(tipoCrypto.toUpperCase() === "BTC" && arrayCantidadCryptos[0].cantidad >= cantidadIngresada){
                idCrypto = 0
                guardaCalculo();
                renderizaPagina("ventaOK");
            }else{
                renderizaPagina("ventaNoOK");
            }
        }
    }
    buttonIngresoDinero.onclick = () => {
        operacionBilletera = "+"
        contenedorCrypto.innerHTML = '';
        tituloTransaccion.innerHTML = `Cuánto dinero desea ingresar?`;
        contenedorCrypto.append(tituloTransaccion, inputCantidad, buttonTransaccion);
        buttonTransaccion.onclick = () => {
            cantidadIngresada = parseInt(inputCantidad.value);
            inputCantidad.value = '';
            cantidadBilletera = calculaTransaccion(cantidadBilletera, cantidadIngresada, operacionBilletera) - comisionTransaccion;
            renderizaPagina("ingresoBilleteraOK")
        }
    }
    buttonRetiraDinero.onclick = () => {
        operacionBilletera = "-"
        contenedorCrypto.innerHTML = '';
        tituloTransaccion.innerHTML = `Cuánto dinero desea retirar?`;
        contenedorCrypto.append(tituloTransaccion, inputCantidad, buttonTransaccion);
        buttonTransaccion.onclick = () => {
            cantidadIngresada = parseInt(inputCantidad.value);
            inputCantidad.value = '';
            if(cantidadBilletera >= cantidadIngresada){
                cantidadBilletera = calculaTransaccion(cantidadBilletera, cantidadIngresada, operacionBilletera) - comisionTransaccion;
                renderizaPagina("retiroBilleteraOK");
            }else{
                renderizaPagina("retiroBilleteraNoOK");
            }
        }
    }
    }





