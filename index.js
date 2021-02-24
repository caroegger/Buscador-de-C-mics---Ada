const urlBase = "https://gateway.marvel.com/v1/public/"
const apiKey = "05db1849d82fefc677c13a9900c87b4f"

const resultados = document.querySelector(".resultados")

// const mostrarComics = () => {
//     fetch(`${urlBase}characters?apikey=${apiKey}`)
//     .then(res => res.json())
//     .then(data => {
//         console.log(data)
//         characters = data.data.results
//         const resultados = document.querySelector(".resultados")
//         characters.map((character) => {
//         resultados.innerHTML += `
//             <div class="tarjeta-personaje">
//               <div class="contenedor-imagen-personaje">
//                  <img src="${character.thumbnail.path}.jpg" class="imagen-personaje">
//               </div>
//               <div class="contenedor-nombre-personaje">
//                  <h3 class="nombre-personaje">${character.name}</h3>
//               </div>
//              </div>
//         `
//         })
//     })
// }

// mostrarComics()

mostrarTarjetasComics = (comic) => {
    console.log(comic, "CONSOLE LOG DE COMIC")
    return `
    <div class="tarjeta-comic">
    <div class="contenedor-imagen-comic">
        <img src="${comic.thumbnail.path}.jpg"             class="imagen-comic">
    </div>
    <h3 class="titulo-comic">${comic.title}</h3>
    </div>
    `
}

mostrarTarjetasPersonajes = (character) => {
    return `
        <div class="tarjeta-personaje">
            <div class="contenedor-imagen-personaje">
                <img src="${character.thumbnail.path}.jpg" class="imagen-personaje">
            </div>
            <div class="contenedor-nombre-personaje">
                <h3 class="nombre-personaje">${character.name}</h3>
            </div>
        </div>
    `
}

const mostrarResultados = (tipo, orden) => {
    fetch(`${urlBase}${tipo}?apikey=${apiKey}&orderBy=${orden}`)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        // const resultados = document.querySelector(".resultados")
        resultados.innerHTML = ""
        data.data.results.map((seleccionTipo) => {
            if (tipo == "comics") {
                return resultados.innerHTML +=
                mostrarTarjetasComics(seleccionTipo)
            }
            if (tipo == "characters") {
                return resultados.innerHTML +=
                mostrarTarjetasPersonajes(seleccionTipo)
            }
        })
    })
}

const selectTipo = document.querySelector("#busqueda-tipo")
console.log(selectTipo.value)

const selectOrden = document.querySelector("#busqueda-orden")
console.log(selectOrden.value)

mostrarResultados(selectTipo.value, selectOrden.value)

const botonBuscar = document.querySelector(".boton-buscar")
console.log(botonBuscar)

botonBuscar.onclick = () => {
    mostrarResultados(selectTipo.value, selectOrden.value)
}



