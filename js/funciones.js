//Navegador - Header
const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');

    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');
    })
}
navSlide();

//Efecto scroll header
window.addEventListener('scroll', function () {
    const header = document.querySelector('header');

    header.classList.toggle("scrollAbajo", window.scrollY > 0)
})

/* -------------------------------------------------------------------------------------------------- */

//Verificacion de edades
const verificadorBoton = document.getElementById("verificador");
verificadorBoton.addEventListener("click", verificarEdad);
function verificarEdad() {
    let edad = document.getElementById("edad").value;
    let salidaVeri = document.getElementById("salidaVerificador");
    if ((edad != "") && (edad >= 18)) {
        localStorage.setItem('EdadUsuario', JSON.stringify(edad));
        salidaVeri.innerText = `Bienvenido! tu edad es de ${edad} años`;
    } else {
        salidaVeri.innerText = `DATOS INCORRECTOS - No eres mayor de 18`;
    }
    obtenerEdad();
}
function obtenerEdad() {
    'EdadUsuario' in localStorage && edad.localStorage.getItem('EdadUsuario');
}


/* -------------------------------------------------------------------------------------------------- */



//IF ELSE - SI O NO
let botonDispo = document.getElementById("botonLocaldispo");
botonDispo.addEventListener("click", localesSiono);

function localesSiono() {
    //LIMPIADOR DE BUSQUEDA
    let sioNo = document.getElementById("sionoInput").value;
    let contenedorDispo = document.getElementById("localesDispo");
    let limpiador = document.getElementById("borrarLocales");
    limpiador.addEventListener('click', borradorLocales);
    function borradorLocales() {
        contenedorDispo.innerHTML = "";
        contenedorImgs.innerHTML = "";
        imagenesLocales.innerHTML = "";
    }

    //CONTENEDOR LOCALES
    if ((sioNo == "si") || (sioNo == "SI") || (sioNo == "Si")) {
        contenedorDispo.innerHTML = "";
        for (const locales of local) {
            let { local, precio, espacio, id } = locales;
            localStorage.setItem('ListaLocales', JSON.stringify(local))
            let localesCont = document.createElement("div");
            localesCont.innerHTML = `<div class="card" style="width: 18rem;">
                                        <div class="card-body">
                                            <h5 class="card-title">${local}</h5>
                                            <h6 class="card-subtitle mb-2 text-muted">Precio por mes: ${precio}$</h6>
                                            <p class="card-text">Y cuenta con un espacio de ${espacio}</p>
                                            <button id='${id}' class= 'btnLocal btn btn-warning'>Ver Local</button>
                                        </div>
                                    </div>`;
            contenedorDispo.append(localesCont);
        }

    }
    else {
        contenedorDispo.innerHTML = "";
        let localesCont = document.createElement("div");
        localesCont.innerHTML = `No hay problema!`;
        contenedorDispo.append(localesCont);
    }

    //BOTONES VER LOCAL
    let botonesLocales = document.getElementsByClassName("btnLocal");
    let contenedorImgs = document.getElementById('contenedorImgs');
    let imagenesLocales = document.getElementById('imagenesLocales')
    for (const boton of botonesLocales) {
        boton.addEventListener('click', function () {
            let seleccion = local.find(locales => locales.id == this.id);
            Swal.fire({
                title: `${seleccion.local}`,
                text: `El local cuenta con un espacio de ${seleccion.espacio}`,
                imageUrl: `${seleccion.img}`,
                imageWidth: "100%",
                imageAlt: 'Custom image',
                padding: "2rem 1rem "
            });
            Toastify({
                text: `Mostrando ${seleccion.local}`,
                duration: 1500,
                gravity: "top",
                position: "center",
                style: {
                    background: "linear-gradient(to right, var(--color-naranja), black)",
                },
            }).showToast();
        })
    }
}


//generando filtro por numero de local
/* const inputFiltro = document.getElementById('inputFiltro');

inputFiltro.addEventListener('input', function () {
    //Cuando ocurra el evento se realiza un filtro
    const filtrados= productos.filter(producto => producto.id);
    console.log(filtrados);
    //Ocupo la funcion para generar interfaz con el array filtrado
    
}) */


function obtenerLocales() {
    ('ListaLocales' in localStorage) && local.localStorage.getItem('ListaLocales').split(',');
}

/* setTimeout(() => {
    Swal.fire({
        title: '<strong>Seguinos en las <u>Redes</u></strong>',
        icon: 'info',
        html:
            'En <b>Instagram </b>, ' +
            '<a href="https://www.instagram.com/felipejuaneda/">Clickea aca</a>' ,
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText:
            '<i class="fa fa-thumbs-up"></i> Ok!',
        confirmButtonAriaLabel: 'Thumbs up, great!',
        cancelButtonText: '<i class="fa fa-thumbs-down"></i>',
        cancelButtonAriaLabel: 'Thumbs down'
    })
}, 5000); */




/* ----------------------------------------- CARRITO------------------------------------------- */


function productosUI(productos, id) {
    let productosRender = document.getElementById(id);
    productosRender.innerHTML = "";
    for (const producto of productos) {
            let divProducto = document.createElement("div");
            //Agrego la clase columna
            
            //Agrego la estructura de la clase card para generarla en la interfaz
            divProducto.innerHTML = `<div class="card cartaProductos">
                                    <img src="${producto.img}" class="card-img-top" alt="...">
                                    <div class="card-body">
                                    <h5 class="card-title">${producto.nombre}</h5>
                                    <p class="card-text">Precio: $${producto.precio}</p>
                                    <button id='${producto.id}' class = 'btnCompra btn btn-primary'>Comprar</button>
                                    </div>
                                    </div>`
            productosRender.append(divProducto);
    }
    seleccionarProducto();
}

function seleccionarProducto() {
    let botones = document.getElementsByClassName('btnCompra');
    for (const boton of botones) {
            boton.addEventListener('click', function () {
                    let seleccion = carrito.find(producto => producto.id == this.id);
                    if (seleccion) {
                            seleccion.addCantidad();
                    } else {
                            seleccion = productos.find(producto => producto.id == this.id);
                            carrito.push(seleccion);
                    }
                    localStorage.setItem('Carrito', JSON.stringify(carrito));
                    //Llamo a la funcion para generar la interfaz de carrito
                    carritoHTML(carrito);
                    totalCarrito();
                    //Uso de la librería toastify para mostrar un mensaje de accion
                    Toastify({
                            text: `Se ha agregado el producto: ${seleccion.nombre}`,
                            duration: 1500,
                            gravity: "top-right",
                            
                    }).showToast();
            })
    }        

}
//Funcion para generar la interfaz del modal
function carritoHTML(lista) {
    //modifico el valor del badge que indica la cantidad de productos en el carrito
    cantidadCarrito.innerHTML = lista.length;
    //Vacio la interfaz de carrito
    productosCarrito.innerHTML = "";
    //Recorro la lista del carrito y genero la interfaz
    for (const producto of lista) {
            let prod = document.createElement('div');
            prod.innerHTML = `${producto.nombre} 
            <span class="badge bg-warning text-dark">Precio: $ ${producto.precio}</span>
            <span class="badge bg-primary">Cantidad: ${producto.cantidad}</span>
            <span class="badge bg-dark">Subtotal: $${producto.subTotal()}</span>`;
            productosCarrito.append(prod);
    }
}

//-----------Funcion generadora de promesas---------------------------
function promesaCompra(saldo) {
    return new Promise(function (aceptado, rechazado) {
            if (saldo > 0) {
                    aceptado('Compra aceptada');

            } else {
                    rechazado('Compra rechazada');
            }
    })
}
//---------------Funcion calcular total carrito-------------------------------
function totalCarrito() {
    //Realizo la suma total del carrito
    let total = carrito.reduce((totalCompra, actual) => totalCompra += actual.subTotal(), 0);
    totalCarritoInterfaz.innerHTML= "Total: $"+total;
    return total;
}
//--------------Funcion vaciar localstorage y array carrito----------------------
function vaciarCarrito() {
    //borro el localStorage
    localStorage.clear();
    //borro el array carrito con splice
    carrito.splice(0, carrito.length);
    //Llamo a la funcion para generar una interfaz vacia
    carritoHTML(carrito);
    totalCarritoInterfaz.innerHTML= "Total: $"+0;
}
//--------------Funcion generadora de alertas------------------------------
function alertaEstado(mensaje, tipo) {
    Swal.fire(
            'Estado de compra',
            mensaje,
            tipo
    )

}