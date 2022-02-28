//Navegador - Header
const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');

    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');
    })
}
navSlide();




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
    if (sioNo == "si") {
        contenedorDispo.innerHTML = "";
        for (const producto of productos) {
            let { local, precio, espacio, id } = producto;
            localStorage.setItem('ListaLocales', JSON.stringify(productos))
            let localesCont = document.createElement("div");
            localesCont.classList.add('col');
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
    } else if (sioNo == "SI") {
        contenedorDispo.innerHTML = "";
        for (const producto of productos) {
            let { local, precio, espacio, id } = producto;
            localStorage.setItem('ListaLocales', JSON.stringify(productos))
            let localesCont = document.createElement("div");
            localesCont.classList.add('col');
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
    } else {
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
            let seleccion = productos.find(producto => producto.id == this.id);
            imagenesLocales.innerHTML = "El local seleccionado es " + seleccion.local;
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
                gravity: "bottom",
                position: "center",
                style: {
                    background: "linear-gradient(to right, #ffe4c4, black)",
                },
                }).showToast();
        })
    }
}

function obtenerLocales() {
    ('ListaLocales' in localStorage) && productos.localStorage.getItem('ListaLocales').split(',');
}
