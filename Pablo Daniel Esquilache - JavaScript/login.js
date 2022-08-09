//LOGIN
//Creamos un objeto con un usuario y contraseña de prueba
const usuario_prueba = {
    usuario: "pablo",
    constraseña: "1234",
}
//Declaramos la variable relacionada al boton del formulario
const login = document.getElementById('login');
//Le creamos un evento a estea variable
login.addEventListener('click', (e) => {
    //creamos 2 variables que toman los datos que ingresamos en el formulario
    const usuario = document.getElementById('usuario').value.toLowerCase();
    const contraseña = document.getElementById('constraseña').value;

    e.preventDefault()
    //generamos una sentencia condicional para validar los datos ingresados y simular un accecso
    if (usuario === usuario_prueba.usuario && contraseña === usuario_prueba.constraseña) {
        Swal.fire({
            icon: 'success',
            title: `Bienvenido ${usuario_prueba.usuario}`,
        }).then((ok) => {
            if (ok.isConfirmed) { window.location.href = "./shop.html" }
        })
    } else {
        alert("ingrese codigo valido");
    }
    login.reset()
})