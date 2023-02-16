//ENTREGA PROYECTO FINAL

//Creamos un class para la generacion de objetos
class Articulo {
    constructor(producto, precio, stock) {
        this.producto = producto;
        this.precio = precio;
        this.stock = stock;
    }
}

//Declaracion de base de datos
let base_datos = [];

//Consulta y creacion de localStorage con operador termario
let primer_local = (localStorage.getItem('base_datos_articulos')) ? base_datos = JSON.parse(localStorage.getItem('base_datos_articulos')) : localStorage.setItem('base_datos_articulos', JSON.stringify(base_datos))

//Declaracion de constantes y llamado a nodos del html
const boton = document.getElementById('formulario_carga')
const div_producto = document.getElementById('productos')

//Accion del formulario
boton.addEventListener('submit', (e) => {

    e.preventDefault()
    //Declarar variables y relacionarlas con nodos del html
    let nombre_art = document.getElementById('nombre_producto').value.toLowerCase();
    let precio_art = parseFloat(document.getElementById('precio_producto').value);
    let stock_art = parseInt(document.getElementById('stock_producto').value);
    //Creamos nuevos objetos
    const producto1 = new Articulo(nombre_art, precio_art, stock_art);
    //Los incorporamos al array
    base_datos.push(producto1)
    //Los incorporamos al localStorage
    localStorage.setItem('base_datos_articulos', JSON.stringify(base_datos))

    div_producto.innerHTML = " "

    formulario_carga.reset()
    //Incorporar el producto en el DOM
    base_datos.forEach((producto, indice) => {
        div_producto.innerHTML += `<div class="div_articulo" id="producto${indice}">
                                        <h2>${producto.producto}</h2>
                                        <h5>$${producto.precio}</h5>
                                        <p>Stock: ${producto.stock}</p>
                                        <input type="button" value="Eliminar" id="eliminar">
                                    </div>`
    })
    //Incorporacion de Tostify
    Toastify({
        text: "Producto incorporado",
        duration: 3500,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            border: "2px solid black",
            background: "rgb(97, 97, 156)",
        },
        onClick: function () { } // Callback after click
    }).showToast();
    //Eliminar el producto elegido
    base_datos.forEach((producto, indice) => {
        document.getElementById(`producto${indice}`).lastElementChild.addEventListener('click', () => {
            Swal.fire({
                title: 'Está seguro de eliminar el producto?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Sí, seguro',
                cancelButtonText: 'No, no quiero'
            }).then((result) => {
                if (result.isConfirmed) {
                    document.getElementById(`producto${indice}`).remove()
                    base_datos.splice(indice, 1)
                    localStorage.setItem('base_datos_articulos', JSON.stringify(base_datos))
                    //incorporacion del Sweet Alert                    
                    Swal.fire({
                        icon: 'success',
                        title: `${producto.producto} eliminado`,
                    })
                }
            })
        })
    })
    //Incorporacion de boton para ordenar alfabeticamente
    //Declaro variable vinculada a un objeto del html
    const btn_ordenar = document.getElementById('ordenar')
    //le incorporo un evento a esa variable
    btn_ordenar.addEventListener('click', () => {
        //Declarar variables y relacionarlas con nodos del html    
        let ordenar_productos = document.getElementById('ordenar_productos').value
        let menor = document.getElementById('menor').value
        let mayor = document.getElementById('mayor').value
        //Genero una copia de la base de datos original
        base_datos_ordenada = [...base_datos]
        //ordeno de menor a mayor segun el precio
        if (ordenar_productos === menor) {
            base_datos_ordenada.sort((a, b) => {
                if (a.precio > b.precio) {
                    return 1;
                }
                if (a.precio < b.precio) {
                    return -1;
                }
                return 0;
            }
            )
        } else if (ordenar_productos === mayor) {
            base_datos_ordenada.sort((b, a) => {
                if (a.precio > b.precio) {
                    return 1;
                }
                if (a.precio < b.precio) {
                    return -1;
                }
                return 0;
            }
            )
        }
        //Vacio el div del html
        div_producto.innerHTML = " "
        //Iecorro el array y plasmo nuevamento los productos en el dom
        base_datos_ordenada.forEach((producto, indice) => {
            div_producto.innerHTML += `<div class="div_articulo" id="producto${indice}">
                                        <h2>${producto.producto}</h2>
                                        <h5>$${producto.precio}</h5>
                                        <p>Stock: ${producto.stock}</p>
                                        <input type="button" value="Eliminar" id="eliminar">
                                    </div>`
        })
        //Le doy funcion para eliminar productos en el DOM  
        base_datos_ordenada.forEach((producto, indice) => {
            document.getElementById(`producto${indice}`).lastElementChild.addEventListener('click', () => {
                Swal.fire({
                    title: 'Está seguro de eliminar el producto?',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Sí, seguro',
                    cancelButtonText: 'No, no quiero'
                }).then((result) => {
                    if (result.isConfirmed) {
                        document.getElementById(`producto${indice}`).remove()
                        base_datos_ordenada.splice(indice, 1)
                        localStorage.setItem('base_datos_articulos', JSON.stringify(base_datos_ordenada))
                        //incorporacion del Sweet Alert                    
                        Swal.fire({
                            icon: 'success',
                            title: `${producto.producto} eliminado`,
                            confirmButtonText: 'ok',
                        })
                    }
                })
            })
        })
    })
})
//Incorporacion de fetch
//llamado a un obejto del HTML
const cotizacion_dolar = document.getElementById('cotizacion_dolar')
//Sentencia para llamar a la API, tomar los datos que provee y mostrarlos en el DOM
fetch("https://criptoya.com/api/dolar")
    .then(respuesta => respuesta.json())
    .then(({ oficial, solidario, blue }) => {
        cotizacion_dolar.innerHTML = `
            <h2>COTIZACION DEL DOLAR</h2>
            <div class="div_dolar">
            <p>Oficial: $${oficial}</p> 
            <p>Solidario: $${solidario}</p> 
            <p>Blue: $${blue}</p>
            </div>
        `
    })
//Establecer el intervalos de actializacion
setInterval(() => {
    fetch("https://criptoya.com/api/dolar")
        .then(respuesta => respuesta.json())
        .then(({ oficial, solidario, blue }) => {
            cotizacion_dolar.innerHTML = `
            <h2>COTIZACION DEL DOLAR</h2>
            <div class="div_dolar">
            <p>Oficial: $${oficial}</p> 
            <p>Solidario: $${solidario}</p> 
            <p>Blue: $${blue}</p> 
            </div>
        `
        })
}, 50000)