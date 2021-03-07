const urlBase = "https://gateway.marvel.com/v1/public/"
const apiKey = "05db1849d82fefc677c13a9900c87b4f"

const resultados = document.querySelector(".resultados")

const selectTipo = document.querySelector("#busqueda-tipo")
const selectOrden = document.querySelector("#busqueda-orden")
const selectOrdenComics = document.querySelector(".select-comics")
const selectOrdenPersonajes = document.querySelector(".select-personajes")

const inputBusqueda = document.querySelector(".input-busqueda")
const botonBuscar = document.querySelector(".boton-buscar")

const resultadosPorPagina = 20
let paginaActual = 0
let cantidadDeResultados = 0


mostrarTarjetasComics = (comic) => {
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

selectTipo.onchange = () => {
    if (selectTipo.value === "characters") {
        selectOrdenComics.classList.add("ocultar")
        selectOrdenPersonajes.classList.remove("ocultar")
    }
    if (selectTipo.value === "comics") {
        selectOrdenComics.classList.remove("ocultar")
        selectOrdenPersonajes.classList.add("ocultar")
    }
}

const mostrarResultados = (tipo = "comics", orden = "title", inputBusqueda = "") => {
    let valorInput = ""
    if (inputBusqueda !== "") {
        if (tipo == "comics") {
            valorInput = `&titleStartsWith=${inputBusqueda}`
        }
        if (tipo == "characters"){
            valorInput = `&nameStartsWith=${inputBusqueda}`
        }
    }
    fetch(`${urlBase}${tipo}?apikey=${apiKey}&orderBy=${orden}${valorInput}&offset=${paginaActual * resultadosPorPagina}`)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        cantidadDeResultados = data.data.total
        resultados.innerHTML = ""
        console.log(cantidadDeResultados)
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

botonBuscar.onclick = () => {

    paginaActual = 0

    if (inputBusqueda.value != "") {
        if (selectTipo.value === "characters") {
            mostrarResultados(selectTipo.value, selectOrdenPersonajes.value, inputBusqueda.value)
        }
        else {
            mostrarResultados(selectTipo.value, selectOrdenComics.value, inputBusqueda.value)
        }
    }
    else {
        if (selectTipo.value === "characters") {
            mostrarResultados(selectTipo.value, selectOrdenPersonajes.value)
        }
        else {
            mostrarResultados(selectTipo.value, selectOrdenComics.value)
        }
    }
}

///// PAGINADO ////////////////////////////////////////////////////////

const primeraPagina = document.querySelector(".primera-pagina")
const paginaPrevia = document.querySelector(".pagina-previa")
const siguientePagina = document.querySelector(".siguiente-pagina")
const ultimaPagina = document.querySelector(".ultima-pagina")



primeraPagina.onclick = () => {
    resultados.innerHTML = ""
    paginaActual = 0
    mostrarResultados(selectTipo.value, selectOrdenComics.value, inputBusqueda.value)
}

paginaPrevia.onclick = () => {
    resultados.innerHTML = ""
    paginaActual--
    mostrarResultados(selectTipo.value, selectOrdenComics.value, inputBusqueda.value)
}

siguientePagina.onclick = () => {
    resultados.innerHTML = ""
    paginaActual++
    mostrarResultados(selectTipo.value, selectOrdenComics.value, inputBusqueda.value)
}

ultimaPagina.onclick = () => {
    restoDeResultados = cantidadDeResultados % resultadosPorPagina
    if (restoDeResultados > 0 ) {
        paginaActual = (cantidadDeResultados - (restoDeResultados)) / resultadosPorPagina
    }    
    else {
        paginaActual = (cantidadDeResultados / resultadosPorPagina) - 1
    }
    mostrarResultados(selectTipo.value, selectOrdenComics.value, inputBusqueda.value)
}
