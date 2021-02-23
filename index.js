const urlBase = "https://gateway.marvel.com/v1/public/"
const apiKey = "05db1849d82fefc677c13a9900c87b4f"

const primeraPagina = document.querySelector(".primera-pagina")
const paginaPrevia = document.querySelector(".pagina-previa")
const siguientePagina = document.querySelector(".siguiente-pagina")
const ultimaPagina = document.querySelector(".ultima-pagina")
console.log(primeraPagina, paginaPrevia, siguientePagina, ultimaPagina)

const comicsPorPagina = 20
let paginaActual = 0

const resultados = document.querySelector(".resultados")


const mostrarComics = () => {
    fetch(`${urlBase}comics?apikey=${apiKey}&orderBy=title&offset=${paginaActual * comicsPorPagina}`)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        comics = data.data.results

        comics.map((comic) => {
        resultados.innerHTML += `
            <div class="tarjeta-comic">
                <div class="contenedor-imagen-comic">
                    <img src="${comic.thumbnail.path}.jpg" class="imagen-comic">
                </div>
                <h3 class="titulo-comic">${comic.title}</h3>
            </div>
        `
        })
    })
}

mostrarComics()


primeraPagina.onclick = () => {
    resultados.innerHTML = ""
    paginaActual = 0
    mostrarComics()
}

paginaPrevia.onclick = () => {
    resultados.innerHTML = ""
    paginaActual--
    mostrarComics()
}

siguientePagina.onclick = () => {
    resultados.innerHTML = ""
    paginaActual++
    mostrarComics()
}

// ultimaPagina.onclick = () => {
// }