class Comic {
    constructor(titulo, precio, genero, editorial) {
        this.titulo = titulo;
        this.precio = precio;
        this.genero = genero;
        this.editorial = editorial;
    }

    mostrarInformacion() {
        return `${this.titulo} - ${this.genero} - ${this.editorial} - $${this.precio.toFixed(2)}`;
    }
}

const comics = [
    new Comic("Batman: Año Uno", 29500, "Superhéroes", "DC Comics"),
    new Comic("Spider-Man: Blue", 28499, "Superhéroes", "Marvel Comics"),
    new Comic("Watchmen", 28000, "Ciencia ficción", "DC Comics"),
    new Comic("BATMAN & ROBIN: YEAR ONE NOIR EDITION #1", 30000, "Superhéroes", "DC Comics" ),
    new Comic("Wolverine: Old Man Logan", 27000, "Superhéroes", "Marvel Comics"),
    new Comic("Venom 5: Absolute Carnage", 25000, "Superhéroes", "Marvel Comics")
];

function mostrarComics() {
    const comicListContainer = document.getElementById("comicList");
    comics.forEach(comic => {
        const div = document.createElement("div");
        div.classList.add("comic");
        div.innerHTML = `
            <span>${comic.mostrarInformacion()}</span>
            <button onclick="agregarAlCarrito('${comic.titulo}')">Comprar</button>
        `;
        comicListContainer.appendChild(div);
    });
}

function agregarAlCarrito(titulo) {
    const comic = comics.find(c => c.titulo === titulo);
    if (!comic) {
        alert("Cómic no encontrado.");
        return;
    }

    const cliente = JSON.parse(localStorage.getItem("cliente"));
    if (!cliente) {
        alert("Debes iniciar sesión para comprar.");
        window.location.href = "iniciar.html";
        return;
    }

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.push(comic);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    alert(`Cómic "${comic.titulo}" agregado al carrito.`);
}

mostrarComics();