function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min))
}
let arrayCantidadCryptos = [
    { crypto: "ETH", cantidad: 0,},
    { crypto: "BTC", cantidad: 0,},
  ];

const arrayCryptos = [
    { crypto: "ETH", cotizacion: randomIntFromInterval(1000, 50000) }, 
    { crypto: "BTC", cotizacion: randomIntFromInterval(1000, 50000)},
];

const cotizacionETH = arrayCryptos.find((cual) => cual.crypto === "ETH");
const cotizacionBTC = arrayCryptos.find((cual) => cual.crypto === "BTC");

let numeroDeTransacciones = 0
let tipoTransaccion = "";
let tipoCrypto = "";
let cantidadIngresada = 0;
const comision = 0.05
let comisionTransaccion = 0
let operacion = ""
let cantidadBilletera = 700000;
let idCrypto = 0;