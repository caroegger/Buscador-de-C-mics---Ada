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
    // console.log(comic, "CONSOLE LOG DE COMIC")
    return `
    <div class="tarjeta-comic">
        <div class="contenedor-imagen-comic">
            <img src="${comic.thumbnail.path}.jpg" class="imagen-comic">
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

const selectTipo = document.querySelector("#busqueda-tipo")
console.log(selectTipo.value, "VALOR DEL SELECT")

const selectOrden = document.querySelector("#busqueda-orden")
console.log(selectOrden.value)

const selectOrdenComics = document.querySelector(".select-comics")
const selectOrdenPersonajes = document.querySelector(".select-personajes")
console.log(selectOrdenComics)
console.log(selectOrdenPersonajes)


selectTipo.onchange = () => {
    console.log("entre al onchange", selectTipo.value)
    if (selectOrden.value === "characters") {
        console.log("primer if")
        selectOrdenComics.classList.add("ocultar")
        selectOrdenPersonajes.classList.remove("ocultar")
    }
    if (selectOrden.value === "comics") {
        selectOrdenComics.classList.remove("ocultar")
        selectOrdenPersonajes.classList.add("ocultar")
    }
}

// const orden = "orderBy"

const mostrarResultados = (tipo = "comics", orden = "title") => {


    fetch(`${urlBase}${tipo}?apikey=${apiKey}&orderBy=${orden}`)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        resultados.innerHTML = ""
        data.data.results.map((seleccionTipo) => {
            // console.log(seleccionTipo, "CONSOLE.LOG SELECCION TIPO")
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

mostrarResultados()




const botonBuscar = document.querySelector(".boton-buscar")
console.log(botonBuscar)

botonBuscar.onclick = () => {
    // if (selectTipo.value === "characters") {
    //     mostrarResultados(selectTipo.value, "name")
    // }
    // else {
    //     mostrarResultados(selectTipo.value, selectOrden.value)
    // }
    mostrarResultados(selectTipo.value, selectOrden.value)
    console.log(selectOrden.value)
}

