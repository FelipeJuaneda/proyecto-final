
//ARRAY
local.push(new Locales(01, "Local 1", 5000, "3m x 4m", "https://dummyimage.com/600x400/000/fff", "chico"));
local.push(new Locales(02, "Local 2", 7000, "5,5m x 5m", "https://dummyimage.com/500x300/000/fff", "chico"));
local.push(new Locales(03, "Local 3", 8000, "6m x 6m", "https://dummyimage.com/400x500/000/fff", "grande"));
local.push(new Locales(04, "Local 4", 10000, "8 x 7m", "https://dummyimage.com/300x300/000/fff", "grande"));


/* productos */

//INSTANCIAR OBJETOS Y ASOCIAR A ARRAY GLOBAL
productos.push(new Producto(1, "Taza", 65, "https://dummyimage.com/300x300/000/fff"));
productos.push(new Producto(2, "Vaso", 70, "https://dummyimage.com/300x300/000/fff"));
productos.push(new Producto(3, "Cubiertos", 100, "https://dummyimage.com/300x300/000/fff"));
productos.push(new Producto(4, "Platos", 75, "https://dummyimage.com/300x300/000/fff"));
productos.push(new Producto(5, "Copa", 100, "https://dummyimage.com/300x300/000/fff"));
//GENERAR INTERFAZ DE PRODUCTOS CON UNA FUNCION
productosUI(productos, 'productosContenedor');

//Boton confirmar carrito
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
                                            <select id="provFiltro"></select> 
                                            <select id="munFiltro"></select>
                                            <button id="btnEnvio">Enviar</button>`;
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
        //alertaEstado(mensaje, "success")

    }).catch((mensaje) => {
        alertaEstado(mensaje, "error")
    })
}
