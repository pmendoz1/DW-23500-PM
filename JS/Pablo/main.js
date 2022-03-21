function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min))
}
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

const arrayCryptos = [
    { crypto: "ETH", cotizacion: randomIntFromInterval(1000, 50000) }, 
    { crypto: "BTC", cotizacion: randomIntFromInterval(1000, 50000)},
];
const cotizacionETH = arrayCryptos.find((cual) => cual.crypto === "ETH")
const cotizacionBTC = arrayCryptos.find((cual) => cual.crypto === "BTC")

let numeroDeTransacciones = 0
let tipoTransaccion = "";
let cantidadETH = 10;
let cantidadBTC = 5;
let tipoCrypto = "";
let cantidadIngresada = 0;
const comision = 0.05
let comisionTransaccion = 0
let operacion = ""
let cantidadBilletera = 700000;

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

tituloTransaccion.innerHTML = "Ingrese el número de transacciones a realizar:"

contenedorCrypto.append(tituloTransaccion, inputTransaccion, buttonTransaccion);
buttonTransaccion.onclick = () => {
    numeroDeTransacciones = inputTransaccion.value
    inputTransaccion.value = '';

for(let i = 0; i < numeroDeTransacciones; i++){
    tituloTransaccion.innerHTML = "Qué tipo de transacción quiere realizar?.<br>Compra: 1<br>Venta: 2 <br>Ingresar dinero: 3 <br>Retirar dinero: 4";
    contenedorCrypto.append(tituloTransaccion, inputTransaccion, buttonTransaccion);
    buttonTransaccion.onclick = () => {
        tipoTransaccion = inputTransaccion.value
        inputTransaccion.value = '';
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
                if(tipoCrypto.toUpperCase() === "ETH" && cantidadBilletera >= (cantidadIngresada * cotizacionETH.cotizacion)){
                    cantidadETH = calculaTransaccion(cantidadETH, cantidadIngresada, operacion);
                    cantidadBilletera = calculaTransaccion(cantidadBilletera, (cantidadIngresada * cotizacionETH.cotizacion), "-") - comisionTransaccion;
                    tituloTransaccion.innerHTML = `La compra fue realizada con éxito. La comisión por esta transacción fue de ${comisionTransaccion} pesos. Usted dispone de ${cantidadETH} ${tipoCrypto.toUpperCase()} y ${cantidadBilletera} pesos en su saldo`;
                    contenedorCrypto.innerHTML = '';
                    contenedorCrypto.append(tituloTransaccion);
                }else if(tipoCrypto.toUpperCase() === "BTC" && cantidadBilletera >= (cantidadIngresada * cotizacionBTC.cotizacion)){
                    cantidadBTC = calculaTransaccion(cantidadBTC, cantidadIngresada, operacion);
                    cantidadBilletera = calculaTransaccion(cantidadBilletera, (cantidadIngresada * cotizacionBTC.cotizacion), "-") - comisionTransaccion;
                    tituloTransaccion.innerHTML = `La compra fue realizada con éxito. La comisión por esta transacción fue de ${comisionTransaccion} pesos. Usted dispone de ${cantidadBTC} ${tipoCrypto.toUpperCase()} y ${cantidadBilletera} pesos en su saldo`;
                    contenedorCrypto.removeChild(inputTransaccion);
                    contenedorCrypto.removeChild(inputCantidad);
                    contenedorCrypto.removeChild(buttonTransaccion);
                    contenedorCrypto.append(tituloTransaccion);
                }else{
                    contenedorCrypto.removeChild(inputTransaccion);
                    contenedorCrypto.removeChild(inputCantidad);
                    contenedorCrypto.removeChild(buttonTransaccion);
                    tituloTransaccion.innerHTML = `No se realizaron compras de Cryptos.`;
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
                if(tipoCrypto.toUpperCase() === "ETH" && cantidadETH >= cantidadIngresada){
                    cantidadETH = calculaTransaccion(cantidadETH, cantidadIngresada, operacion);
                    cantidadBilletera = calculaTransaccion(cantidadBilletera, (cantidadIngresada * cotizacionETH.cotizacion), "+") - comisionTransaccion;
                    tituloTransaccion.innerHTML = `La venta fue realizada con éxito. La comisión por esta transacción fue de ${comisionTransaccion} pesos. Usted dispone de ${cantidadETH} ${tipoCrypto.toUpperCase()} y ${cantidadBilletera} pesos en su saldo`;
                    contenedorCrypto.removeChild(inputTransaccion);
                    contenedorCrypto.removeChild(inputCantidad);
                    contenedorCrypto.removeChild(buttonTransaccion);
                    contenedorCrypto.append(tituloTransaccion);
                }else if(tipoCrypto.toUpperCase() === "BTC" && cantidadBTC >= cantidadIngresada){
                    cantidadBTC = calculaTransaccion(cantidadBTC, cantidadIngresada, operacion);
                    cantidadBilletera = calculaTransaccion(cantidadBilletera, (cantidadIngresada * cotizacionBTC.cotizacion), "+") - comisionTransaccion;
                    tituloTransaccion.innerHTML = `La venta fue realizada con éxito. La comisión por esta transacción fue de ${comisionTransaccion} pesos. Usted dispone de ${cantidadBTC} ${tipoCrypto.toUpperCase()} y ${cantidadBilletera} pesos en su saldo`;
                    contenedorCrypto.removeChild(inputTransaccion);
                    contenedorCrypto.removeChild(inputCantidad);
                    contenedorCrypto.removeChild(buttonTransaccion);
                    contenedorCrypto.append(tituloTransaccion);
                }else{
                    contenedorCrypto.removeChild(inputTransaccion);
                    contenedorCrypto.removeChild(inputCantidad);
                    contenedorCrypto.removeChild(buttonTransaccion);
                    tituloTransaccion.innerHTML = `No tiene suficientes ${tipoCrypto} para vender.`;
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
                tituloTransaccion.innerHTML = `Dinero ingresado con éxito. La comisión por esta transacción fue de ${comisionTransaccion} pesos. Usted dispone de ${cantidadBilletera} pesos en su billetera`;
                contenedorCrypto.removeChild(inputCantidad);
                contenedorCrypto.removeChild(buttonTransaccion);
                contenedorCrypto.append(tituloTransaccion);
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
                    tituloTransaccion.innerHTML = `Dinero retirado con éxito. La comisión por esta transacción fue de ${comisionTransaccion} pesos. Usted dispone de ${cantidadBilletera} pesos en su billetera`;
                    contenedorCrypto.removeChild(inputCantidad);
                    contenedorCrypto.removeChild(buttonTransaccion);
                    contenedorCrypto.append(tituloTransaccion);
                }else{
                    alert(`No tiene fondos suficientes. Ustede dispone de ${cantidadBilletera} pesos.`);
                    tituloTransaccion.innerHTML = `No tiene fondos suficientes. Ustede dispone de ${cantidadBilletera} pesos.`;
                    contenedorCrypto.removeChild(inputCantidad);
                    contenedorCrypto.removeChild(buttonTransaccion);
                    contenedorCrypto.append(tituloTransaccion);
                }
            }
            break;      
        default:
            tituloTransaccion.innerHTML = `No seleccionó tipo de transacción.`;
            contenedorCrypto.removeChild(inputTransaccion);
            contenedorCrypto.removeChild(inputCantidad);
            contenedorCrypto.removeChild(buttonTransaccion);
            contenedorCrypto.append(tituloTransaccion);
                break;
            }
        }
    }
    //alert("Todas las transacciones fueron ejecutadas. Muchas gracias por utilizar nuestro servicio");
    // tituloTransaccion.innerHTML = `Todas las transacciones fueron ejecutadas. Muchas gracias por utilizar nuestro servicio`;
    // contenedorCrypto.removeChild(inputTransaccion);
    // contenedorCrypto.removeChild(inputCantidad);
    // contenedorCrypto.removeChild(buttonTransaccion);
    // contenedorCrypto.append(tituloTransaccion);
}




