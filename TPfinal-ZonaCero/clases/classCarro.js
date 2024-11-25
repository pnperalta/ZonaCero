class Carro {
    constructor() {
        this.comics = JSON.parse(localStorage.getItem("carrito")) || [];
        this.mostrarCarro();
    }

    quitarComic(index) {
        this.comics.splice(index, 1);
        localStorage.setItem("carrito", JSON.stringify(this.comics));
        this.mostrarCarro();
    }

    calcularTotal() {
        return this.comics.reduce((total, comic) => total + comic.precio, 0).toFixed(2);
    }

    mostrarCarro() {
        const cartContainer = document.getElementById("cart");
        const totalContainer = document.getElementById("total");
        const confirmButton = document.getElementById("confirmButton");

        cartContainer.innerHTML = '';
        this.comics.forEach((comic, index) => {
            const div = document.createElement("div");
            div.classList.add("cart-item");
            div.innerHTML = `
                <span>${comic.titulo} - $${comic.precio.toFixed(2)}</span>
                <button onclick="carro.quitarComic(${index})">Quitar</button>
            `;
            cartContainer.appendChild(div);
        });

        const total = this.calcularTotal();
        totalContainer.innerHTML = `<strong>Total: $${total}</strong>`;


        confirmButton.style.display = this.comics.length > 0 ? 'block' : 'none';
        confirmButton.onclick = this.confirmarCompra.bind(this);
    }

    confirmarCompra() {
        const cliente = JSON.parse(localStorage.getItem("cliente"));
        if (!cliente) {
            alert("Debes iniciar sesión para confirmar la compra.");
            window.location.href = "registro.html";
            return;
        }

        const { nombre, dni, direccion, correo } = cliente;

 
        const confirmationMessage = document.getElementById("confirmationMessage");
        confirmationMessage.innerHTML = `
            ¡Compra exitosa!<br>
            Gracias por tu compra, <strong>${nombre}</strong>.<br>
            Tu pedido será enviado a la dirección: <strong>${direccion}</strong>.<br>
            DNI: <strong>${dni}</strong><br>
            Hemos enviado una confirmación a tu correo: <strong>${correo}</strong>.<br>
            Recibirás tu pedido dentro de los proximos 5 días hábiles.
        `;
        confirmationMessage.style.display = "block";


        setTimeout(() => {
            alert(`Correo enviado a ${correo} confirmando la compra.`);
        }, 500);

        this.comics = [];
        localStorage.setItem("carrito", JSON.stringify(this.comics));
        this.mostrarCarro();
    }
}

const carro = new Carro();