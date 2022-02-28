//CLASE
class Producto {
    constructor(id, local, precio, espacio, img, tag) {
        this.id = parseInt(id)
        this.local = local.toUpperCase();
        this.precio = precio;
        this.espacio = espacio;
        this.img = img;
        this.tag = tag;
    }
    //metodos
    descuento(valor) {
        this.precio = this.precio - valor;
    }
    mostrar() {
        return "El " + this.local + " cuesta " + this.precio + " pesos POR MES " + "y cuenta con un espacio de " + this.espacio;
    }
}