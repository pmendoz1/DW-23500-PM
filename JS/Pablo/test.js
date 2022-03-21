function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min))
}


const alimentos = [{crypto: "ETH", cotizacion: randomIntFromInterval(1000, 50000)}, {crypto: "BTC", cotizacion: randomIntFromInterval(1000, 50000)}];

const resultado = alimentos.find((el) => el.crypto === "ETH")
console.log(resultado.cotizacion)



class Producto {
    constructor(nombre, precio) {
        this.nombre  = nombre.toUpperCase();
        this.precio  = parseFloat(precio);
    }
    sumaIva() {
        this.precio = this.precio * 1.21;
    }
  }