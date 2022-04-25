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
                arrayCantidadCryptos.push({id: i, uuid: arrayCryptos[i].uuid, symbol: arrayCryptos[i].symbol, iconUrl: arrayCryptos[i].iconUrl, cantidad: 0})
                // arrayCantidadCryptos[i].id = i
                // arrayCantidadCryptos[i].uuid = arrayCryptos[i].uuid;
                // arrayCantidadCryptos[i].symbol = arrayCryptos[i].symbol;
                // arrayCantidadCryptos[i].iconUrl = arrayCryptos[i].iconUrl;
                // arrayCantidadCryptos[i].cantidad = 0
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
    // contenedorCrypto.innerHTML = '';
    switch (resultado) {
        case "compraOK":
            Swal.fire({
                title: '¡Felicitaciones!',
                text: `La compra fue realizada con éxito. La comisión por esta transacción fue de ${comisionTransaccion} pesos. Usted dispone de ${arrayCantidadCryptos[idCrypto].cantidad} ${tipoCrypto.toUpperCase()} y ${arrayDatosUsuario[datosUsuario.id].billetera.toFixed(2)} pesos en su saldo`,
                icon: 'success',
                confirmButtonColor: "#800080",
                timer:0,
            })
            bucleTransaccion();
            break;
        case "compraNoOK":
            Swal.fire({
                title: '¡Ops!',
                text: 'No dispone de suficiente dinero en billetera o ingresó un valor incorrecto.',
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
            bucleTransaccion();
            break;
        case "ventaNoOK":
            Swal.fire({
                title: '¡Ops!',
                text: `No tiene suficientes ${tipoCrypto} para vender o ingresó un valor incorrecto.`,
                icon: 'warning',
                confirmButtonColor: "#800080",
                timer:0,
            })
            bucleTransaccion();
            break;
        case "noHayCryptos":
            Swal.fire({
                title: '¡Ops!',
                text: `No tiene Cryptos para vender o ingresó un valor incorrecto!.`,
                icon: 'warning',
                confirmButtonColor: "#800080",
                timer:0,
            })
            bucleTransaccion();
            break;
        case "ingresoBilleteraOK":
            Swal.fire({
                title: '¡Felicitaciones!',
                text: `Dinero ingresado con éxito. La comisión por esta transacción fue de ${comisionTransaccion} pesos. Usted dispone de ${arrayDatosUsuario[datosUsuario.id].billetera.toFixed(2)} pesos en su billetera`,
                icon: 'success',
                confirmButtonColor: "#800080",
                timer:0,
            })
            bucleTransaccion();
            break;
        case "retiroBilleteraOK":
            Swal.fire({
                title: '¡Felicitaciones!',
                text: `Dinero retirado con éxito. La comisión por esta transacción fue de ${comisionTransaccion} pesos. Usted dispone de ${arrayDatosUsuario[datosUsuario.id].billetera.toFixed(2)} pesos en su billetera`,
                icon: 'success',
                confirmButtonColor: "#800080",
                timer:0,
            })
            bucleTransaccion();
            break;
        case "BilleteraNoOK":
            Swal.fire({
                title: '¡Ops!',
                text: `No tiene fondos suficientes o ingresó un valor incorrecto. Ustede dispone de ${arrayDatosUsuario[datosUsuario.id].billetera.toFixed(2)} pesos.`,
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



//Mostramos página de login.
tituloTransaccion.innerHTML = "Ingrese usuario y contraseña:"
contenedorCrypto.append(tituloTransaccion, inputUsuario, inputContrasena, buttonTransaccion);
buttonTransaccion.onclick = () => {
    if (!localStorage.getItem('arrayDatosUsuario')) localStorage.setItem('arrayDatosUsuario', JSON.stringify(arrayDatosUsuario));
    arrayDatosUsuario = (JSON.parse(localStorage.getItem("arrayDatosUsuario")));
    const checkUsuario = arrayDatosUsuario.find(arrayDatosUsuario => arrayDatosUsuario.usuario === inputUsuario.value)
        if (!checkUsuario) {
            tituloTransaccion.innerHTML = "Usuario y/o clave incorrectos."
        }else{
            if (checkUsuario.usuario === inputUsuario.value && checkUsuario.password === inputContrasena.value) {
                cantidadBilletera = parseInt(checkUsuario.billetera);
                datosUsuario = checkUsuario;
                tituloTransaccion.innerHTML = "";
                bucleTransaccion();
            }else{
                tituloTransaccion.innerHTML = "Usuario y/o clave incorrectos."
            }
            
        }
}
//Ejecutamos transacciones de acuerdo a la opción seleccionada.
function bucleTransaccion() {
    if (!localStorage.getItem('arrayCantidadCryptos')) localStorage.setItem('arrayCantidadCryptos', JSON.stringify(arrayCantidadCryptos));
    arrayCantidadCryptos = (JSON.parse(localStorage.getItem("arrayCantidadCryptos")));
    contenedorCrypto.innerHTML = '';
    tituloTransaccion.innerHTML = "Qué tipo de transacción quiere realizar?";
    contenedorSubtitulo.append(tituloTransaccion);
    contenedorCrypto.append(buttonComprar, buttonVender, buttonIngresoDinero, buttonRetiraDinero);



        const renderizarTienda = () => {
            contenedorCrypto.innerHTML = '';
            if (operacion === "+") {
                tituloTransaccion.innerHTML = `Indique cantidad a comprar. Usted dispone de $${arrayDatosUsuario[datosUsuario.id].billetera.toFixed(2)} en su billetera.`
                contenedorSubtitulo.append(tituloTransaccion)
                for (const producto of arrayCryptos) {
                  //Creamos los elementos HTML
                    const divProducto = document.createElement('div');
                    const imgProducto = document.createElement('img');
                    const nombreProducto = document.createElement('h2');
                    const precioProducto = document.createElement('h3');
                    const cantidadCrypto = document.createElement('input')
                    const botonComprar = document.createElement('button');
                
                  //Les agregamos los estilos asignandoles clases de css
                    divProducto.className = 'card';
                    imgProducto.className = 'card-img-top';
                    nombreProducto.className = 'nombre-producto';
                    precioProducto.className = 'card-precio';
                    cantidadCrypto.className = 'form-control'
                    cantidadCrypto.placeholder = 'Indique Cantidad'
                    botonComprar.className = 'btn btn-primary';
                
                  //Le agregamos el contenido a los elementos creados y el id a los que vamos a necesitar despues
                    imgProducto.src = producto.iconUrl;
                    nombreProducto.append(producto.symbol);
                    precioProducto.append(`$ ${parseInt(producto.price).toFixed(2)}`);
                    botonComprar.append('Comprar');
                    botonComprar.id = producto.uuid;
                
                    botonComprar.onclick = () => {
                        if (!parseInt(cantidadCrypto.value)){
                            renderizaPagina("compraNoOK");
                        }else {
                            if (arrayDatosUsuario[datosUsuario.id].billetera >= (cantidadCrypto.value * producto.price)) {
                                const productoComprado = arrayCantidadCryptos.find(producto => producto.uuid === botonComprar.id);
                                console.log(productoComprado);
                                arrayCantidadCryptos[productoComprado.id].cantidad = calculaTransaccion((JSON.parse(localStorage.getItem("arrayCantidadCryptos")))[productoComprado.id].cantidad, parseInt(cantidadCrypto.value), operacion);
                                arrayDatosUsuario[datosUsuario.id].billetera = calculaTransaccion(arrayDatosUsuario[datosUsuario.id].billetera, (cantidadCrypto.value * arrayCryptos[productoComprado.id].price), operacionBilletera) - comisionTransaccion;
                                tipoCrypto = productoComprado.symbol;
                                idCrypto = productoComprado.id;
                                localStorage.setItem("arrayCantidadCryptos", JSON.stringify(arrayCantidadCryptos));
                                localStorage.setItem("arrayDatosUsuario", JSON.stringify(arrayDatosUsuario));
                                renderizaPagina("compraOK");
                                cantidadCrypto.value = ''
                            }else{
                                renderizaPagina("compraNoOK");
                            }
                        }
                        
                    }
                //Agregamos los elementos creados a su elemento contenedor que es divProducto
                    divProducto.append(imgProducto, nombreProducto, precioProducto, cantidadCrypto, botonComprar);
                
                //Le agregamos al contenedor de la tienda cada uno de los divProducto
                    contenedorCrypto.append(divProducto);
                }
            }else if (operacion === "-"){
                tituloTransaccion.innerHTML = `Indique cantidad a vender. Usted dispone de las siguientes Cryptos:`
                contenedorSubtitulo.append(tituloTransaccion)
                for (const producto of arrayCantidadCryptos) {
                    if (arrayCantidadCryptos[producto.id].cantidad === 0) {
                        continue;
                    }
                    //Creamos los elementos HTML
                      const divProducto = document.createElement('div');
                      const imgProducto = document.createElement('img');
                      const nombreProducto = document.createElement('h2');
                      const precioProducto = document.createElement('h3');
                      const cantidadCrypto = document.createElement('input');
                      const cantidadDisponible = document.createElement('h4');
                      const botonVender = document.createElement('button');
                  
                    //Les agregamos los estilos asignandoles clases de css
                      divProducto.className = 'card';
                      imgProducto.className = 'card-img-top';
                      nombreProducto.className = 'nombre-producto';
                      precioProducto.className = 'card-precio';
                      cantidadCrypto.className = 'form-control'
                      cantidadCrypto.placeholder = 'Indique Cantidad'
                      cantidadDisponible.className = 'nombre-producto'
                      botonVender.className = 'btn btn-primary';
                  
                    //Le agregamos el contenido a los elementos creados y el id a los que vamos a necesitar despues
                      imgProducto.src = producto.iconUrl;
                      nombreProducto.append(producto.symbol);
                      precioProducto.append(`$ ${parseInt(arrayCryptos[producto.id].price).toFixed(2)}`);
                      cantidadDisponible.append(`Disponible: ${producto.cantidad}`)
                      botonVender.append('Vender');
                      botonVender.id = producto.uuid;
                  
                      botonVender.onclick = () => {
                        const productoComprado = arrayCantidadCryptos.find(producto => producto.uuid === botonVender.id);
                        if (!parseInt(cantidadCrypto.value)){
                            renderizaPagina("ventaNoOK");
                        }else{
                            if (arrayCantidadCryptos[productoComprado.id].cantidad >= cantidadCrypto.value){
                                console.log(productoComprado);
                                arrayCantidadCryptos[productoComprado.id].cantidad = calculaTransaccion((JSON.parse(localStorage.getItem("arrayCantidadCryptos")))[productoComprado.id].cantidad, parseInt(cantidadCrypto.value), operacion);
                                arrayDatosUsuario[datosUsuario.id].billetera = calculaTransaccion(arrayDatosUsuario[datosUsuario.id].billetera, (cantidadCrypto.value * arrayCryptos[productoComprado.id].price), operacionBilletera) - comisionTransaccion;
                                tipoCrypto = productoComprado.symbol;
                                idCrypto = productoComprado.id;
                                localStorage.setItem("arrayCantidadCryptos", JSON.stringify(arrayCantidadCryptos));
                                localStorage.setItem("arrayDatosUsuario", JSON.stringify(arrayDatosUsuario));
                                renderizaPagina("ventaOK");
                                cantidadCrypto.value = ''
                            }
                            else{
                            renderizaPagina("ventaNoOK");
                            }
                        }
                       
                      }
                  //Agregamos los elementos creados a su elemento contenedor que es divProducto
                      divProducto.append(imgProducto, nombreProducto, precioProducto, cantidadDisponible, cantidadCrypto, botonVender);
                  
                  //Le agregamos al contenedor de la tienda cada uno de los divProducto
                      contenedorCrypto.append(divProducto);
                    // }else{
                    //     renderizaPagina("noHayCryptos");
                    // }
                }
            }
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
    // buttonVender.onclick = () => {
    //     operacion = "-"
    //     operacionBilletera = "+"
    //     contenedorCrypto.innerHTML = '';
    //     tituloTransaccion.innerHTML = `<h1> Indique crypto y cantidad a vender.</h1>
    //     <h2>A continuación cryptos disponibles y su cotización:</h2>
    //     <p>${arrayCryptos[1].symbol}:  ${parseInt(arrayCryptos[1].price).toFixed(2)}</p>
    //     <p>${arrayCryptos[0].symbol}:  ${parseInt(arrayCryptos[0].price).toFixed(2)}</p>`;
    //     contenedorCrypto.append(tituloTransaccion, inputTransaccion, inputCantidad, buttonTransaccion);
    //     buttonTransaccion.onclick = () => {
    //         tipoCrypto = inputTransaccion.value
    //         cantidadIngresada = parseInt(inputCantidad.value);
    //         inputTransaccion.value = '';
    //         inputCantidad.value = '';
    //         //analizamos crypto sleccionada, si tenemos suficientes para vender y sumamos cantidad vendida a billetera.
    //         if(tipoCrypto.toUpperCase() === "ETH" && arrayCantidadCryptos[1].cantidad >= cantidadIngresada){
    //             idCrypto = 1;
    //             guardaCalculo();
    //             renderizaPagina("ventaOK");
    //         }else if(tipoCrypto.toUpperCase() === "BTC" && arrayCantidadCryptos[0].cantidad >= cantidadIngresada){
    //             idCrypto = 0
    //             guardaCalculo();
    //             renderizaPagina("ventaOK");
    //         }else{
    //             renderizaPagina("ventaNoOK");
    //         }
    //     }
    // }
    buttonComprar.onclick = () => {
        operacion = "+"
        operacionBilletera = "-"
        renderizarTienda();
    }
    buttonVender.onclick = () => {
        operacion = "-"
        operacionBilletera = "+"
        renderizarTienda ();
    }
    buttonIngresoDinero.onclick = () => {
        operacionBilletera = "+"
        contenedorCrypto.innerHTML = '';
        tituloTransaccion.innerHTML = `Cuánto dinero desea ingresar? Usted dispone de $${arrayDatosUsuario[datosUsuario.id].billetera.toFixed(2)} en su billetera.`;
        contenedorCrypto.append(tituloTransaccion, inputCantidad, buttonTransaccion);
        buttonTransaccion.onclick = () => {
            cantidadIngresada = parseInt(inputCantidad.value);
            inputCantidad.value = '';
            if (!cantidadIngresada) {
                renderizaPagina("BilleteraNoOK");
            }else{
                arrayDatosUsuario[datosUsuario.id].billetera = calculaTransaccion(arrayDatosUsuario[datosUsuario.id].billetera, cantidadIngresada, operacionBilletera) - comisionTransaccion;
            // cantidadBilletera = calculaTransaccion(cantidadBilletera, cantidadIngresada, operacionBilletera) - comisionTransaccion;
            localStorage.setItem("arrayDatosUsuario", JSON.stringify(arrayDatosUsuario));
            renderizaPagina("ingresoBilleteraOK")
            }
            
        }
    }
    buttonRetiraDinero.onclick = () => {
        operacionBilletera = "-"
        contenedorCrypto.innerHTML = '';
        tituloTransaccion.innerHTML = `Cuánto dinero desea retirar? Usted dispone de $${arrayDatosUsuario[datosUsuario.id].billetera.toFixed(2)} en su billetera.`;
        contenedorCrypto.append(tituloTransaccion, inputCantidad, buttonTransaccion);
        buttonTransaccion.onclick = () => {
            cantidadIngresada = parseInt(inputCantidad.value);
            inputCantidad.value = '';
            if (!cantidadIngresada) {
                renderizaPagina("BilleteraNoOK");
            }else{
                if(arrayDatosUsuario[datosUsuario.id].billetera >= cantidadIngresada){
                    arrayDatosUsuario[datosUsuario.id].billetera = calculaTransaccion(arrayDatosUsuario[datosUsuario.id].billetera, cantidadIngresada, operacionBilletera) - comisionTransaccion;
                    localStorage.setItem("arrayDatosUsuario", JSON.stringify(arrayDatosUsuario));
                    renderizaPagina("retiroBilleteraOK");
                }else{
                    renderizaPagina("BilleteraNoOK");
                }
            }
        }
    }
}