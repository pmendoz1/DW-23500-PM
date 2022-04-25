let arrayCantidadCryptos = [];
let arrayDatosUsuario = [
  {id: 0, usuario: "PABLO", password:"12345", billetera: 0},
  {id: 1, usuario: "JUAN", password:"54321", billetera: 0},
]

const baseUrl = "https://api.coinranking.com/v2/coins";
const proxyUrl = "https://cors-anywhere.herokuapp.com/";
const apiKey = "coinranking9c76c3a9531fd87864848d24fd7ee2bac0aefff22c4952bd";

let arrayCryptos = [];
let numeroDeTransacciones = 0
let tipoTransaccion = "";
let tipoCrypto = "";
let cantidadIngresada = 0;
const comision = 0.05;
let comisionTransaccion = 0;
let operacion = "";
let operacionBilletera = "";
let cantidadBilletera = 0;
let idCrypto = 0;
let datosUsuario =[];