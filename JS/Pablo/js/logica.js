
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
function renderizaPagina(resultado) {
    switch (resultado) {
        case "compraOK":
            contenedorCrypto.innerHTML = '';
            tituloTransaccion.innerHTML = `La compra fue realizada con éxito. La comisión por esta transacción fue de ${comisionTransaccion} pesos. Usted dispone de ${arrayCantidadCryptos[idCrypto].cantidad} ${tipoCrypto.toUpperCase()} y ${cantidadBilletera} pesos en su saldo`;
            contenedorCrypto.append(tituloTransaccion, buttonTransaccion);
            buttonTransaccion.onclick = () => {decreceTransacciones()};
            break;
        case "compraNoOK":
            contenedorCrypto.innerHTML = '';
            tituloTransaccion.innerHTML = `No dispone de suficiente dinero en billetera.`;
            contenedorCrypto.append(tituloTransaccion, buttonTransaccion);
            buttonTransaccion.onclick = () => {bucleTransaccion()};
            break;
        case "ventaOK":
            contenedorCrypto.innerHTML = '';
            tituloTransaccion.innerHTML = `La venta fue realizada con éxito. La comisión por esta transacción fue de ${comisionTransaccion} pesos. Usted dispone de ${arrayCantidadCryptos[idCrypto].cantidad} ${tipoCrypto.toUpperCase()} y ${cantidadBilletera} pesos en su saldo`;
            contenedorCrypto.append(tituloTransaccion, buttonTransaccion);
            buttonTransaccion.onclick = () => {decreceTransacciones()};
            break;
        case "ventaNoOK":
            contenedorCrypto.innerHTML = '';
            tituloTransaccion.innerHTML = `No tiene suficientes ${tipoCrypto} para vender.`;
            contenedorCrypto.append(tituloTransaccion, buttonTransaccion);
            buttonTransaccion.onclick = () => {bucleTransaccion()};
            break;
        case "ingresoBilleteraOK":
            contenedorCrypto.innerHTML = '';
            tituloTransaccion.innerHTML = `Dinero ingresado con éxito. La comisión por esta transacción fue de ${comisionTransaccion} pesos. Usted dispone de ${cantidadBilletera} pesos en su billetera`;
            contenedorCrypto.append(tituloTransaccion, buttonTransaccion);
            buttonTransaccion.onclick = () => {decreceTransacciones()};
            break;
        case "retiroBilleteraOK":
            contenedorCrypto.innerHTML = '';
            tituloTransaccion.innerHTML = `Dinero retirado con éxito. La comisión por esta transacción fue de ${comisionTransaccion} pesos. Usted dispone de ${cantidadBilletera} pesos en su billetera`;
            contenedorCrypto.append(tituloTransaccion, buttonTransaccion);
            buttonTransaccion.onclick = () => {decreceTransacciones()};
            break;
        case "retiroBilleteraNoOK":
            contenedorCrypto.innerHTML = '';
            tituloTransaccion.innerHTML = `No tiene fondos suficientes. Ustede dispone de ${cantidadBilletera} pesos.`;
            contenedorCrypto.append(tituloTransaccion, buttonTransaccion);
            buttonTransaccion.onclick = () => {decreceTransacciones()};
            break;
        case "noTransaccion":
            contenedorCrypto.innerHTML = '';
            tituloTransaccion.innerHTML = `No seleccionó tipo de transacción.`;
            contenedorCrypto.append(tituloTransaccion, buttonTransaccion);
            buttonTransaccion.onclick = () => {bucleTransaccion()};
    }
}

function transaccionesEjecutadas () {
    tituloTransaccion.innerHTML = `Todas las transacciones fueron ejecutadas. Muchas gracias por utilizar nuestro servicio`;
    contenedorCrypto.innerHTML = '';
    contenedorCrypto.append(tituloTransaccion);
}

function decreceTransacciones() {
    numeroDeTransacciones--
    numeroDeTransacciones > 0 ? bucleTransaccion() : transaccionesEjecutadas()
}

if (!localStorage.getItem('arrayCantidadCryptos')) localStorage.setItem('arrayCantidadCryptos', JSON.stringify(arrayCantidadCryptos));

arrayCantidadCryptos = (JSON.parse(localStorage.getItem("arrayCantidadCryptos")));
let cantidadETH = arrayCantidadCryptos[0].cantidad
let cantidadBTC = arrayCantidadCryptos[1].cantidad

//Mostramos página de cantidad de transacciones.
tituloTransaccion.innerHTML = "Ingrese el número de transacciones a realizar:"
contenedorCrypto.append(tituloTransaccion, inputTransaccion, buttonTransaccion);
buttonTransaccion.onclick = () => {
    numeroDeTransacciones = parseInt(inputTransaccion.value);
    inputTransaccion.value = '';
    bucleTransaccion();
}
//Solicitamos tipo de transacción para análisis.
function bucleTransaccion() {
    tituloTransaccion.innerHTML = "Qué tipo de transacción quiere realizar?.<br>Compra: 1<br>Venta: 2 <br>Ingresar dinero: 3 <br>Retirar dinero: 4";
    contenedorCrypto.append(tituloTransaccion, inputTransaccion, buttonTransaccion);
    buttonTransaccion.onclick = () => {
        tipoTransaccion = inputTransaccion.value
        inputTransaccion.value = '';
    //Analizamos el tipo de transacción ingresada y mostramos cryptos disponibles.
    switch(tipoTransaccion){
        case "1":
            operacion = "+"
            tituloTransaccion.innerHTML = `<h1> Indique crypto y cantidad a comprar.</h1>
            <h2>A continuación cryptos disponibles y su cotización:</h2>
            <p>${arrayCryptos[0].crypto}  ${arrayCryptos[0].cotizacion}</p>
            <p>${arrayCryptos[1].crypto}  ${arrayCryptos[1].cotizacion}</p>`;
            contenedorCrypto.append(tituloTransaccion, inputTransaccion, inputCantidad, buttonTransaccion);
            buttonTransaccion.onclick = () => {
                tipoCrypto = inputTransaccion.value
                cantidadIngresada = parseInt(inputCantidad.value);
                inputTransaccion.value = '';
                inputCantidad.value = '';
                //Analizamos si para la crypto seleccionada tenemos suficiente dinero y mostramos opciones de acuerdo al análisis.
                if(tipoCrypto.toUpperCase() === "ETH" && cantidadBilletera >= (cantidadIngresada * cotizacionETH.cotizacion)){
                    idCrypto = 0;
                    cantidadETH = calculaTransaccion(cantidadETH, cantidadIngresada, operacion);
                    arrayCantidadCryptos[0].cantidad = (JSON.parse(localStorage.getItem("arrayCantidadCryptos")))[0].cantidad + cantidadIngresada;
                    localStorage.setItem("arrayCantidadCryptos", JSON.stringify(arrayCantidadCryptos));
                    cantidadBilletera = calculaTransaccion(cantidadBilletera, (cantidadIngresada * cotizacionETH.cotizacion), "-") - comisionTransaccion;
                    renderizaPagina("compraOK");
                }else if(tipoCrypto.toUpperCase() === "BTC" && cantidadBilletera >= (cantidadIngresada * cotizacionBTC.cotizacion)){
                    idCrypto = 1;
                    cantidadBTC = calculaTransaccion(cantidadBTC, cantidadIngresada, operacion);
                    arrayCantidadCryptos[1].cantidad = (JSON.parse(localStorage.getItem("arrayCantidadCryptos")))[1].cantidad + cantidadIngresada;
                    localStorage.setItem("arrayCantidadCryptos", JSON.stringify(arrayCantidadCryptos));
                    cantidadBilletera = calculaTransaccion(cantidadBilletera, (cantidadIngresada * cotizacionBTC.cotizacion), "-") - comisionTransaccion;
                    renderizaPagina("compraOK");
                }else{
                    renderizaPagina("compraNoOK");
                }
            }
            break;     
        case "2":
            operacion = "-"
            tituloTransaccion.innerHTML = `Indique crypto y cantidad a vender.<br> A continuación cryptos disponibles y su cotización:<br>`+ JSON.stringify(arrayCryptos);
            contenedorCrypto.append(tituloTransaccion, inputTransaccion, inputCantidad, buttonTransaccion);
            buttonTransaccion.onclick = () => {
                tipoCrypto = inputTransaccion.value
                cantidadIngresada = parseInt(inputCantidad.value);
                inputTransaccion.value = '';
                inputCantidad.value = '';
                //analizamos crypto sleccionada, si tenemos suficientes para vender y sumamos cantidad vendida a billetera.
                if(tipoCrypto.toUpperCase() === "ETH" && cantidadETH >= cantidadIngresada){
                    idCrypto = 0;
                    cantidadETH = calculaTransaccion(cantidadETH, cantidadIngresada, operacion);
                    arrayCantidadCryptos[0].cantidad = (JSON.parse(localStorage.getItem("arrayCantidadCryptos")))[0].cantidad - cantidadIngresada;
                    localStorage.setItem("arrayCantidadCryptos", JSON.stringify(arrayCantidadCryptos));
                    cantidadBilletera = calculaTransaccion(cantidadBilletera, (cantidadIngresada * cotizacionETH.cotizacion), "+") - comisionTransaccion;
                    renderizaPagina("ventaOK");
                }else if(tipoCrypto.toUpperCase() === "BTC" && cantidadBTC >= cantidadIngresada){
                    idCrypto = 1
                    cantidadBTC = calculaTransaccion(cantidadBTC, cantidadIngresada, operacion);
                    arrayCantidadCryptos[1].cantidad = (JSON.parse(localStorage.getItem("arrayCantidadCryptos")))[1].cantidad - cantidadIngresada;
                    localStorage.setItem("arrayCantidadCryptos", JSON.stringify(arrayCantidadCryptos));
                    cantidadBilletera = calculaTransaccion(cantidadBilletera, (cantidadIngresada * cotizacionBTC.cotizacion), "+") - comisionTransaccion;
                    renderizaPagina("ventaOK");
                }else{
                    renderizaPagina("ventaNoOK");
                }
            }
            break;
        case "3":
            operacion = "+"
            tituloTransaccion.innerHTML = `Cuánto dinero desea ingresar?`;
            contenedorCrypto.removeChild(inputTransaccion);
            contenedorCrypto.append(tituloTransaccion, inputCantidad, buttonTransaccion);
            buttonTransaccion.onclick = () => {
                cantidadIngresada = parseInt(inputCantidad.value);
                inputCantidad.value = '';
                cantidadBilletera = calculaTransaccion(cantidadBilletera, cantidadIngresada, operacion) - comisionTransaccion;
                renderizaPagina("ingresoBilleteraOK")
            }
            break;
        case "4":
            operacion = "-"
            tituloTransaccion.innerHTML = `Cuánto dinero desea retirar?`;
            contenedorCrypto.removeChild(inputTransaccion);
            contenedorCrypto.append(tituloTransaccion, inputCantidad, buttonTransaccion);
            buttonTransaccion.onclick = () => {
                cantidadIngresada = parseInt(inputCantidad.value);
                inputCantidad.value = '';
                if(cantidadBilletera >= cantidadIngresada){
                    cantidadBilletera = calculaTransaccion(cantidadBilletera, cantidadIngresada, operacion) - comisionTransaccion;
                    renderizaPagina("retiroBilleteraOK");
                }else{
                    renderizaPagina("retiroBilleteraNoOK");
                }
            }
            break;      
        default:
            renderizaPagina("noTransaccion");
            }
        }
    }

// for(let i = 0; i < numeroDeTransacciones; i++){
//     }
//     //alert("Todas las transacciones fueron ejecutadas. Muchas gracias por utilizar nuestro servicio");
//     // tituloTransaccion.innerHTML = `Todas las transacciones fueron ejecutadas. Muchas gracias por utilizar nuestro servicio`;
//     // contenedorCrypto.removeChild(inputTransaccion);
//     // contenedorCrypto.removeChild(inputCantidad);
//     // contenedorCrypto.removeChild(buttonTransaccion);
//     // contenedorCrypto.append(tituloTransaccion);





