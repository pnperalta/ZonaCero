class Manga {
    constructor(titulo, tomo, precio, genero, editorial) {
        this.titulo = titulo;
        this.tomo = tomo;
        this.precio = precio;
        this.genero = genero;
        this.editorial = editorial;
    }

    mostrarInformacion() {
        return `${this.titulo} tomo: ${this.tomo} - ${this.genero} - ${this.editorial} - $${this.precio.toFixed(2)}`;
    }
}

const mangas = [
    new Manga("NARUTO", 1, 10000, "Shōnen", "Panini Manga"),
    new Manga("NARUTO", 5, 10000, "Shōnen", "Panini Manga"),
    new Manga("HAIKYU!!", 8, 9550, "Deportes", "Ivrea"),
    new Manga("GIVEN", 4, 8500, "Josei/Shōnen-ai", "Panini Manga"),
    new Manga("BANANA FISH BOX SET COLECCION COMPLETA", 10, 120000, "Shōjo", "Panini Manga"),
    new Manga("ASSASSINATION CLASSROOM", 11, 8500, "Shōnen", "Panini Manga")
];

function mostrarManga() {
    const mangaListContainer = document.getElementById("mangaList");
    mangas.forEach(manga => {
        const div = document.createElement("div");
        div.classList.add("manga");
        div.innerHTML = `
            <span>${manga.mostrarInformacion()}</span>
            <button onclick="agregarAlCarrito('${manga.titulo}')">Comprar</button>
        `;
        mangaListContainer.appendChild(div);
    });
}

function agregarAlCarrito(titulo) {
    const manga = mangas.find(m => m.titulo === titulo);
    if (!manga) {
        alert("Manga no encontrado.");
        return;
    }

    const cliente = JSON.parse(localStorage.getItem("cliente"));
    if (!cliente) {
        alert("Debes iniciar sesión para comprar.");
        window.location.href = "registro.html";
        return;
    }

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.push(manga);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    alert(`Manga "${manga.titulo}" agregado al carrito.`);
}

mostrarManga();