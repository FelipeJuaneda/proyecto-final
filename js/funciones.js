//---------------------------------------------------Navegador - Header-----------------------------
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


let localesLi = document.getElementById('localesLi');
localesLi.addEventListener('click', function () {
    window.scrollTo(0, 600);
});

//EFECTO SCROLL A TITULO Y SUBTITULO
let tituloEfectoScroll = document.getElementById('tituloEfectoScroll');
let subtituloEfectoScroll = document.getElementById('subtituloEfectoScroll');

window.addEventListener('scroll', function () {
    let scrollenY = window.scrollY;
    tituloEfectoScroll.style.marginTop = scrollenY * 0.30 + "px";
    subtituloEfectoScroll.style.marginTop = scrollenY * 0.50 + "px";
})





//TITULO GALERIA COMERCIAL
const typed = new Typed('.typed', {
    strings: [
        '<i>Comercial</i>',
        '<i>Artesanal</i>',
        '<i>Colonial</i>'
    ],
    typeSpeed: 75, // Velocidad en mlisegundos para poner una letra,
    startDelay: 300, // Tiempo de retraso en iniciar la animacion. Aplica tambien cuando termina y vuelve a iniciar,
    backSpeed: 75, // Velocidad en milisegundos para borrrar una letra,
    smartBackspace: true, // Eliminar solamente las palabras que sean nuevas en una cadena de texto.
    shuffle: false, // Alterar el orden en el que escribe las palabras.
    backDelay: 1800, // Tiempo de espera despues de que termina de escribir una palabra.
    loop: true, // Repetir el array de strings
    loopCount: false, // Cantidad de veces a repetir el array.  false = infinite
    showCursor: true, // Mostrar cursor palpitanto
    cursorChar: '|', // Caracter para el cursor
    contentType: 'html', // 'html' o 'null' para texto sin formato
});


/* -------------------------------------------------------------------------------------------------- */




//--------------------------------FUNCION GENERADORA DE INTERFAZ CON INPUT SI O NO---------------------------
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
        contenedorFiltro.innerHTML = "";
    }

    //--------------------------------------------CONTENEDOR LOCALES--------------------------
    //IF ELSE - SI O NO
    if ((sioNo == "si") || (sioNo == "SI") || (sioNo == "Si")) {
        contenedorDispo.innerHTML = "";
        window.scrollTo(0, 900);
        //FILTRO DE LOCALES
        let contenedorFiltro = document.getElementById("contenedorFiltro");
        let filtroLocales = document.createElement("div");
        contenedorFiltro.innerHTML = `<h2 class="text-center">Inserte numero de local para filtrar <br> (del 1 al 10)</h2>
                                <input id="inputFiltro" class="text-center" type="number" placeholder="Local numero...">
                                <div id="localFiltradoCont"></div>`;
        contenedorFiltro.append(filtroLocales);
        //generando filtro por numero de local

        inputFiltro.addEventListener('input', function () {
            //Cuando ocurra el evento se realiza un filtro
            if (inputFiltro.value != "" && inputFiltro.value <= 10) {
                window.scrollTo(0, 920);
                const inputFiltro = document.getElementById('inputFiltro');
                const filtrados = local.find(locales => locales.id == inputFiltro.value);
                console.log(filtrados);
                //Ocupo la funcion para generar interfaz con el array filtrado
                let localFiltradoCont = document.getElementById('localFiltradoCont');
                let localFiltrado = document.createElement("div");
                /* GENERANDO LOCALES FILTRADOS POR NUMERO DE LOCAL */
                localFiltradoCont.innerHTML =
                    `<div class="card text-center mt-4" style="width: 30rem; margin:auto">
                        <div class="card-body">
                            <h5 class="card-title">${filtrados.local}</h5>
                            <h6 class="card-subtitle mb-2 text-muted">Precio por mes${filtrados.precio}$</h6>
                            <p class="card-text">Y cuenta con un espacio de{filtrados.espacio} </p>
                            <img src="${filtrados.img}" alt="" style="width: 100%">
                        </div>
                    </div>`;

                localFiltradoCont.append(localFiltrado);
            }
            //para que se borre interfgaz cuando no hay valor seleccionado
            else if (inputFiltro.value == "") {
                localFiltradoCont.innerHTML = "";
            }
            //por si no se encuentra local
            else {
                localFiltradoCont.innerHTML = '<p class="text-center fs-2" style="color: red">No se encontro Local - Verifique numero</p>';
            }
        }
        );

        //GENERADOR DE LOCALES
        for (const locales of local) {
            let { local, precio, espacio, id } = locales;
            localStorage.setItem('ListaLocales', JSON.stringify(local))
            let localesCont = document.createElement("div");
            localesCont.classList.add("w-100");
            localesCont.innerHTML = `<div class="carrusel">
                                            <div class="carrusel-items">
                                                <div class="carrusel-item">
                                                    <div class="card">
                                                        <div class="card-body">
                                                            <h5 class="card-title">${local}</h5>
                                                            <h6 class="card-subtitle mb-2 text-muted">Precio por mes: ${precio}$</h6>
                                                            <p class="card-text">Y cuenta con un espacio de ${espacio}</p>
                                                            <button id='${id}' class= 'btnLocal btn btn-warning'>Ver Local</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>`;
            contenedorDispo.append(localesCont);
        }


        //-------------------------------------CARRUSEL DE LOCALES-----------------------------------
        //declarando variables
        let localessionoClase = document.querySelector(".localesSiono");
        let maxDeScroll = localessionoClase.scrollWidth - localessionoClase.clientWidth;
        let intervalo = null;
        let velocidadCarrusel = 1;
        //funcion de carrusel
        const empezarCarrusel = () => {
            intervalo = setInterval(() => {
                localessionoClase.scrollLeft = localessionoClase.scrollLeft + velocidadCarrusel;
                if (localessionoClase.scrollLeft === maxDeScroll) {
                    velocidadCarrusel = -1;
                } else if (localessionoClase.scrollLeft === 0) {
                    velocidadCarrusel = 1;
                }
            }, 11);
        }
        const pararCarrusel = () => {
            clearInterval(intervalo);
        };
        localessionoClase.addEventListener('mouseover', () => {
            pararCarrusel();
        });
        localessionoClase.addEventListener('mouseout', () => {
            empezarCarrusel();
        });
        //llamo a la funcion
        empezarCarrusel();
    }

    //POR SI PONEN NO
    else {
        contenedorDispo.innerHTML = "";
        contenedorFiltro.innerHTML = "";

        window.scrollTo(0, 970);
        let localesCont = document.createElement("div");
        localesCont.classList.add('w-100')
        localesCont.innerHTML = `<p class="fs-2" style="color:var(--color-negro); background-color: var(--color-blanco); padding: 10px; border-radius:5px;"> No hay problema!</p>`;
        console.log(localesCont);
        contenedorDispo.append(localesCont);
    }




    //BOTONES VER LOCAL
    let botonesLocales = document.getElementsByClassName("btnLocal");
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
function obtenerLocales() {
    ('ListaLocales' in localStorage) && local.localStorage.getItem('ListaLocales').split(',');
};


//TIMEOUT MODAL INSTAGRAM
setTimeout(() => {
    Swal.fire({
        title: '<strong>Seguinos en las <u style="color:var(--color-naranja)">Redes</u></strong>',
        icon: 'info',
        html:
            'En <b>Instagram </b> ' +
            '<a href="https://www.instagram.com/felipejuaneda/"><svg width="30px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/></svg></a>',
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText:
            '<i class="fa fa-thumbs-up"></i> Ok!',
        confirmButtonAriaLabel: 'Thumbs up, great!',
        cancelButtonText: '<i class="fa fa-thumbs-down"></i>',
        cancelButtonAriaLabel: 'Thumbs down'
    })
}, 5000);




/* ----------------------------------------- CARRITO------------------------------------------- */

//GENERANDO PRODUCTO DE LOCALES
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
};

//LOCAL 1 ---------------------------------------------
fetch("data/localuno.json")
    .then(respuesta => respuesta.json())
    .then(data => {
        for (const literal of data) {
            productos.push(new Producto(literal.id, literal.nombre, literal.precio, literal.img, literal.cantidad));
            productosUI(productos, 'productosContenedor');
        }
    }).catch(mensaje => console.error(mensaje));



//BOTON DE COMPRA 
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
        prod.classList.add('w-75');
        prod.classList.add('m-auto');
        prod.classList.add('mb-4')
        prod.innerHTML =
            `
        <div class"contenedorModalCarrito w-100 m-auto">
            <h2 style="color:var(--color-naranja);">${producto.nombre} </h2>        
            <span>Precio: $ ${producto.precio} /</span>
            <span style="color:var(--color-negro);">Cantidad: ${producto.cantidad} /</span>
            <span style="color:var(--color-negro);">Subtotal: $${producto.subTotal()}</span>
            <a id="${producto.id}" class="btn btn-success btn-add">+</a>
            <a id="${producto.id}" class="btn btn-secondary btn-sub">-</a>
            <a id="${producto.id}" class="btn btn-danger btn-delete">x</a>
        </div>
        `;
        productosCarrito.append(prod);
    }
    //BOTONES PARA AGREGAR O ELIMINAR PRODUCTO EN CARRITO
    document.querySelectorAll('.btn-delete').forEach(boton => boton.onclick = eliminarCarrito);
    document.querySelectorAll('.btn-add').forEach(boton => boton.onclick = addCarrito);
    document.querySelectorAll('.btn-sub').forEach(boton => boton.onclick = subCarrito);
    //para que actualice total
    totalCarrito();
}
//funcion borrar carrito
function eliminarCarrito(e) {
    let posicion = carrito.findIndex(producto => producto.id == e.target.id);
    carrito.splice(posicion, 1);
    carritoHTML(carrito);
    localStorage.setItem('Carrito', JSON.stringify(carrito));
}
function addCarrito() {
    let agregarProducto = carrito.find(p => p.id == this.id);
    agregarProducto.agregarCantidadPersonalizada(1);
    this.parentNode.children[2].innerHTML = "Cantidad: " + agregarProducto.cantidad;
    this.parentNode.children[3].innerHTML = "Subtotal: " + agregarProducto.subTotal();
    localStorage.setItem('Carrito', JSON.stringify(carrito));
    //llamar aca tambien para la interfaz
    totalCarrito();
}
function subCarrito() {
    let agregarProducto = carrito.find(p => p.id == this.id);
    if (agregarProducto.cantidad > 1) {
        agregarProducto.agregarCantidadPersonalizada(-1);
        this.parentNode.children[2].innerHTML = "Cantidad: " + agregarProducto.cantidad;
        this.parentNode.children[3].innerHTML = "Subtotal: " + agregarProducto.subTotal();
        localStorage.setItem('Carrito', JSON.stringify(carrito));
        //llamar aca tambien para la interfaz
        totalCarrito();
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
    totalCarritoInterfaz.innerHTML = "Total: $" + total;
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
    totalCarritoInterfaz.innerHTML = "Total: $" + 0;
}
//--------------Funcion generadora de alertas------------------------------
function alertaEstado(mensaje, tipo) {
    Swal.fire(
        'Estado de compra',
        mensaje,
        tipo
    )

};

//----------------------------BOTON CONFIRMACION DE CARRITO----------------------------
confirmar.onclick = () => {
    let total = totalCarrito();
    saldoCliente -= total;
    //Llamo la funcion creadora de promesas y defino un comportamiento para then(si es aceptada) y catch(si es rechazada)
    promesaCompra(saldoCliente).then((mensaje) => {
        //procesarEnvio();

        //--------------------- FUNCIONALIDAD DE GESTION DE ENVIO -----------------//
        //1° AGREGAR SPINNER MIENTRAS SE SOLUCIONA EL PEDIO DE PROVINCIAS
        productosCarrito.innerHTML = ` <div class="spinner-border text-warning" role="status">
                                        <span class="visually-hidden">Loading...</span>
                                        </div>`
        //2° AGREGAR LA LLAMADA AL METODO FETCH A LA API NACIONAL DE PROVINCIAS
        fetch('https://apis.datos.gob.ar/georef/api/provincias')
            //RESUELVO LA PROMESA GENERADA OBTENIENDO UN OBJETO RESPONSE
            .then((respuesta) => {
                //TRANSFORMO EL OBJETO RESPONSE TOMANDO EL JSON Y PASANDOLO A OBJETO LITERAL
                return respuesta.json()
                //RESUELVO LA PROMESA CON LA TRANSFORMACION OBTENIENDO UN OBJETO LITERAL DE DATOS
            }).then((datos) => {
                console.log(datos);
                //3°GENERO LA INTERFAZ DE SELECCION DE PROVINCIAS
                productosCarrito.innerHTML = `<h3>Info del Envio</h3>
                                            <select class="w-50" id="provFiltro"></select> 
                                            <select id="munFiltro"></select>
                                            <button class="btn btn-warning" id="btnEnvio">Enviar</button>`;
                //OBTENGO DESDE EL DOM EL SELECT PROVINCIA
                const provFiltro = document.getElementById('provFiltro');
                //RECORRO LA INFO OBTENIDA DE LA API Y LA AGREGO AL SELECT
                for (const provincia of datos.provincias) {
                    provFiltro.innerHTML += `<option value="${provincia.id}">${provincia.nombre}</option>`;
                }
                //4° ASOCIAR AL EVENTO CHANGE LA PETICION DE LOS MUNICIPIOS DE LA PROVINCIA SELECCIONADA
                provFiltro.onchange = () => {
                    let idProvincia = provFiltro.value;
                    console.log(idProvincia);
                    //5° GENERAR LA RUTA DE LA API CON EL ID DE LA PROVINCIA SELECCIONADA
                    let rutaBusqueda = `https://apis.datos.gob.ar/georef/api/municipios?provincia=${idProvincia}&campos=id,nombre&max=100`;
                    fetch(rutaBusqueda)
                        .then(respuesta => respuesta.json())
                        .then(datos => {
                            console.log(datos);
                            //6° GENERAR INTERFAZ DE SELECT DE MUNICIPIOS CON LOS DATOS
                            let munFiltro = document.getElementById('munFiltro');
                            for (const municipio of datos.municipios) {
                                munFiltro.innerHTML += `<option value="${municipio.id}">${municipio.nombre}</option>`;
                            }
                            //7° ASOCIAR EVENTO CLICK AL BOTON DE ENVIO SI LA INTERFAZ DE ENVIO ESTA COMPLETA
                            document.getElementById('btnEnvio').onclick = () => {
                                console.log("ENVIAR A " + munFiltro.value + " EN  PROVINCIA ID " + idProvincia);
                                //8° ENVIAR LA INFORMACION DEL CLIENTE AL BACKEND CON FETCH Y EL METODO POST
                                fetch('https://jsonplaceholder.typicode.com/posts', {
                                    method: 'POST',
                                    body: JSON.stringify({
                                        carrito: carrito, //ACA DEFINO LA INFO A ENVIAR.
                                        idProvincia: idProvincia,
                                        idMunicipio: munFiltro.value
                                    }),
                                    headers: {
                                        'Content-type': 'application/json; charset=UTF-8',
                                    },
                                    //FINAL DEL FETCH- SI SE OBTUVO BIEN IR A THEN
                                }).then(respuesta => respuesta.json())
                                    .then(data => {
                                        Swal.fire(
                                            'Compra Confirmada',
                                            "PEDIDO N° " + data.id + " EN CAMINO",
                                            'success'
                                        )
                                    })
                            }
                        })
                }
            })
            .catch((mensaje) => { console.log(mensaje) })
    }).catch((mensaje) => {
        alertaEstado(mensaje, "error")
    })
}