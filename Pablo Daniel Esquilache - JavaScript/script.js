//Desafio Incorporar Librerias

//Creamos un clas para la generacion de objetos
class Articulo {
    constructor (producto, precio, stock) {
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
boton.addEventListener ('submit', (e) => {  
    
    e.preventDefault()      
//Declarar variables y relacionarlas con nodos del html
    let nombre_art = document.getElementById('nombre_producto').value.toLowerCase();
    let precio_art = parseFloat(document.getElementById('precio_producto').value);
    let stock_art = parseInt(document.getElementById('stock_producto').value);

    const producto1 = new Articulo (nombre_art, precio_art, stock_art);

    base_datos.push(producto1)

    localStorage.setItem('base_datos_articulos', JSON.stringify(base_datos))

    div_producto.innerHTML = " "

    formulario_carga.reset()
//Incorporar el producto en el DOM
    base_datos.forEach((producto,indice) => {
        div_producto.innerHTML +=   `<div class="div_articulo" id="producto${indice}">
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
        onClick: function(){} // Callback after click
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
                    if (result.isConfirmed){
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
btn_ordenar.addEventListener('click', () =>{
    
    let ordenar_productos = document.getElementById('ordenar_productos').value
    let menor = document.getElementById('menor').value
    let mayor = document.getElementById('mayor').value
//Genero una copia de la base de datos original
    base_datos_ordenada = [...base_datos]
//ordeno de menor a mayor segun el precio
if (ordenar_productos === menor) {
    base_datos_ordenada.sort((a,b) => {
        if (a.precio > b.precio){
            return 1;
        }
        if (a.precio < b.precio){
            return -1;
        }
        return 0;
    }
    )
} else if (ordenar_productos === mayor) {
    base_datos_ordenada.sort((b,a) => {
        if (a.precio > b.precio){
            return 1;
        }
        if (a.precio < b.precio){
            return -1;
        }
        return 0;
    }
    )
}
//Vacio el div del html
    div_producto.innerHTML = " "
//Iecorro el array y plasmo nuevamento los productos en el dom
    base_datos_ordenada.forEach((producto,indice) => {
        div_producto.innerHTML +=   `<div class="div_articulo" id="producto${indice}">
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
                if (result.isConfirmed){
                document.getElementById(`producto${indice}`).remove()
                base_datos_ordenada.splice(indice, 1)
                localStorage.setItem('base_datos_articulos', JSON.stringify(base_datos_ordenada))
//incorporacion del Sweet Alert                    
                Swal.fire({
                    icon: 'success',
                    title: `${producto.producto} eliminado`,                    
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
    .then(({oficial, solidario, blue}) => {
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
    .then(({oficial, solidario, blue}) => {
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
//-------------------------------------------------------------------------------------------------------------
//Tabla de multiplicar con ciclo FOR

/*let numero = parseInt(prompt("Ingrese un numero del 1 al 10 para generar su tabla de multiplicacion"))

for(let i = 1; i <= 10; i++){
    let multiplicacion = numero * i;
    document.write(numero + " x " + i + " = " + multiplicacion + "<br>")
}*/

// Ingreso de Palabra correcta con ciclo WHILE

/*let palabra = prompt("Ingrese la palabra correcta").toLowerCase()

while(palabra != "hola"){
    alert("Por favor ingrese la labra correcta");
    palabra = prompt("Vuelva a ingresar la plabra").toLowerCase()
}
alert("Perfector, has ingresado la palabra correcta")*/

//Calculador de cuotas de prestamos

/*let importe = parseInt(prompt("Ingrese el monto del credito a solicitar"));
let cuotas = parseInt(prompt("Ingrese el numero de cuotas que desea, podran ser en 6, 12, 18 y 24 cuotas"));

let resultado = (importe/cuotas);
    
if(cuotas === 6){
    document.write("La cuota de su prestamos es " + (resultado*1.3))
}
else if(cuotas === 12){
    document.write("La cuota de su prestamos es " + (resultado*1.3))
}
else if(cuotas === 18){
    document.write("La cuota de su prestamos es " + (resultado*1.3))
}
else if(cuotas === 24){
    document.write("La cuota de su prestamos es " + (resultado*1.3))
}
else {
    alert("Por favor ingrese un numero correcto")
    cuotas = parseInt(prompt("Ingrese el numero de cuotas que desea"))
    document.write("La cuota de su prestamos es " + (resultado*1.3));
}*/

//Primer desafio entregable
/*
alert("El siguiente algoritmo calculara el precio del prodcuto que desees, sumandole la ganancia establecida al precio indicado")

function saludo (){
    let mensaje = alert("Hola " +nombre + " calculemos el precio del producto que desees...")
}
let nombre = prompt("Dime tu nombre")

saludo(nombre)

//-----------------------------------------------------------------------------------------------------------------

function precioProducto (dato1,dato2){
    let resultado = (dato1*dato2)
    document.write("El precio del prodcuto " + nombreProducto + " es " + resultado)
}

const nombreProducto = prompt("Ingrese el nombre del produto");
let precioInicial;
let ganancia;

do {
    precioInicial = parseFloat(prompt("Ingrese el precio de su producto"))
    ganancia = parseFloat(prompt("Ingrese el porcentaje de ganancia que desea sumar a su producto (por ejemplo, si es %30, igresar 1.3)"))
} while(isNaN(precioInicial) || isNaN(ganancia))

precioProducto(precioInicial,ganancia)*/

//---------------------------------------------------------------------------------------------------------------
/*
let seccion_art = prompt("Elija en que seccion ingresara su articulo. Las opciones son limpieza, bazar, almacen y bebida")
let nombre_art = prompt("Ingrese el nombre del articulo")
let precio_art = parseFloat(prompt("Ingrese el precio del articulo"))
let stock_art = parseInt(prompt("Ingrese el stock del articulo"))
let cantidad_art = 3

class Articulo{
    constructor(seccion, nombre, precio, stock){
        this.seccion = seccion;
        this.nombre = nombre;
        this.precio = precio;
        this.stock = stock;
    }
    agregar(){
        base_de_datos.push(nuevo_articulo);
        console.log(base_de_datos);
    }
}

nuevo_articulo = new Articulo(seccion_art, nombre_art, precio_art, stock_art);
console.log(nuevo_articulo);

const base_de_datos = [];       
nuevo_articulo.agregar();
*/
//----------------------------------------------------------------------------------------------------------
//Primer entrega Proyecto Final
/*
                    //Declaracion de arrays y variables
const base_datos = [];
let cant_art = 3;
                    //Aplicacion de class para crear objetos
class Articulo {
    constructor (seccion, producto, precio, stock) {
        this.seccion = seccion;
        this.producto = producto;
        this.precio = precio;
        this.stock = stock;
    }
}
                    //Incorporar objetos al array
do {
    let nombre_pro = prompt("Nombre producto").toLocaleLowerCase();
    let seccion_pro = prompt("Ingrese la seccion a la que pertenece el producto").toLocaleLowerCase();
    let precio_pro = parseFloat(prompt("Precio producto"));
    let stock_pro = parseInt(prompt("Stock producto"));
    const prodcuto1 = new Articulo (seccion_pro, nombre_pro, precio_pro, stock_pro);
    base_datos.push(prodcuto1);
}
while (base_datos.length != cant_art);
                    //Mostrar array con objetos
console.log(base_datos);
                    //Aplicando el metodo sort (Ordenando alfabeticamente la seccion de lo productos)
// const stock_productos = base_datos.sort((a,b) => a.producto - b.producto);
// console.log(stock_productos);
base_datos.sort((a,b)=> {
    if (a.seccion > b.seccion){
        return 1;
    }
    if (a.seccion < b.seccion){
        return -1;
    }
    return 0;
}
)
                    //Aplicando el metodo find
let buscar_nombre = prompt("Ingrese el nombre del producto a buscar").toLocaleLowerCase();
const buscar = base_datos.find((articulo) => articulo.producto === buscar_nombre);
console.log(buscar);
*/
//-----------------------------------------------------------------------------------------------------------
//Segundo desafio complementario
/*
const base_datos = [];
let cant_art = 3;
                    
class Articulo {
    constructor (producto, precio, stock) {
        this.producto = producto;
        this.precio = precio;
        this.stock = stock;
    }
}

do {
    let nombre_pro = prompt("Nombre producto").toLocaleLowerCase();
    let precio_pro = parseFloat(prompt("Precio producto"));
    let stock_pro = parseInt(prompt("Stock producto"));
    const prodcuto1 = new Articulo (nombre_pro, precio_pro, stock_pro);
    base_datos.push(prodcuto1);
}
while (base_datos.length != cant_art);
               
console.log(base_datos);

for (const producto of base_datos) {
    let pantalla = document.createElement("div");
    pantalla.innerHTML =   `<h2>${producto.producto}</h2>
                            <p>${producto.precio}</p>
                            <p>${producto.stock}</p>`
    add .document.body.appendChild(pantalla);
}
*/
//-------------------------------------------------------------------------------------------------------------
//Desafio incorparar objetos al DOM
/*
const boton = document.getElementById('formulario_carga');

const div_producto = document.getElementById('productos')

const base_datos = [];

class Articulo {
    constructor (producto, precio, stock) {
        this.producto = producto;
        this.precio = precio;
        this.stock = stock;
    }
}

boton.addEventListener('submit', (e) => {  
    e.preventDefault()      

    let nombre_art = document.getElementById('nombre_producto').value;
    let precio_art = parseFloat(document.getElementById('precio_producto').value);
    let stock_art = parseInt(document.getElementById('stock_producto').value);

    const producto1 = new Articulo (nombre_art, precio_art, stock_art);

    base_datos.push(producto1)

    div_producto.innerHTML = " "

    for (const producto of base_datos) {
        let pantalla = document.createElement("div");
        pantalla.classList.add('div_articuulo')
        pantalla.innerHTML =   `<h2>${producto.producto}</h2>
                                <p>${producto.precio}</p>
                                <p>${producto.stock}</p>`
        div_producto.appendChild(pantalla);}
        
        formulario_carga.reset()
        })
        */
//------------------------------------------------------------------------------------------------------------
/*
<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css">

<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/toastify-js"></script>
*/