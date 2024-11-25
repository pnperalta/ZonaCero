class Cliente {
    constructor(nombre, correo, dni, direccion) {
        this.nombre = nombre;
        this.correo = correo;
        this.dni = dni;
        this.direccion = direccion;
    }

    enviarCorreo() {
        alert(`Correo enviado a ${this.correo}. ¡Bienvenido, ${this.nombre}!`);
    }
}

function registrarCliente() {
    const nombre = document.getElementById("nombre").value;
    const correo = document.getElementById("correoRegistro").value;
    const dni = document.getElementById("dni").value;
    const direccion = document.getElementById("direccion").value;

    const cliente = new Cliente(nombre, correo, dni, direccion);
    cliente.enviarCorreo();

    localStorage.setItem("cliente", JSON.stringify(cliente));
    alert("Cliente registrado correctamente.");
}

function iniciarSesion() {
    const correo = document.getElementById("correo").value;
    const cliente = JSON.parse(localStorage.getItem("cliente"));

    if (cliente && cliente.correo === correo) {
        alert(`Bienvenido ${cliente.nombre}`);
        window.location.href = "index.html";
    } else {
        alert("Correo no registrado. Por favor, regístrate.");
    }
}