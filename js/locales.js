//CLASE LOCALES
class Locales {
  constructor(id, local, precio, espacio, img, tag) {
    this.id = parseInt(id);
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
    return (
      "El " +
      this.local +
      " cuesta " +
      this.precio +
      " pesos POR MES " +
      "y cuenta con un espacio de " +
      this.espacio
    );
  }
}

//LOCAL 1
class Producto {
  constructor(id, nombre, precio, img, cantidad) {
    this.id = parseInt(id);
    this.nombre = nombre.toUpperCase();
    this.precio = parseFloat(precio);
    this.img = img;
    this.cantidad = cantidad || 1;
  }
  addCantidad() {
    this.cantidad++;
  }
  subTotal() {
    return this.precio * this.cantidad;
  }
  agregarCantidadPersonalizada(valor) {
    this.cantidad += valor;
  }
}
