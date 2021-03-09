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

const primeraPagina = document.querySelector(".primera-pagina")
const paginaPrevia = document.querySelector(".pagina-previa")
const paginaSiguiente = document.querySelector(".siguiente-pagina")
const ultimaPagina = document.querySelector(".ultima-pagina")


///////////////////////////////////////////////////////////////////////////////


///// MOSTRAR TARJETAS ////////////////////////////////////////////////////////

mostrarTarjetasComics = (comic) => {
    return `
    <div class="tarjeta-comic">
        <div class="contenedor-imagen-comic">
            <img src="${comic.thumbnail.path}.jpg" class="imagen-comic" data-id="${comic.id}">
        </div>
        <h3 class="titulo-comic">${comic.title}</h3>
    </div>
    `
}

mostrarTarjetasPersonajes = (character) => {
    return `
        <div class="tarjeta-personaje" data-id="${character.id}">
            <div class="contenedor-imagen-personaje">
                <img src="${character.thumbnail.path}.jpg" class="imagen-personaje">
            </div>
            <div class="contenedor-nombre-personaje">
                <h3 class="nombre-personaje">${character.name}</h3>
            </div>
        </div>
    `
}


///// MOSTRAR RESULTADOS ////////////////////////////////////////////////////////


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
        let offset = data.data.offset
        deshabilitarOHabilitarBotones(offset, cantidadDeResultados)
        clickearTarjetaParaVerInfo()
    })
}

mostrarResultados()


///// BUSQUEDA DE RESULTADOS ////////////////////////////////////////////////////////


const buscarResultados = () => {
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

botonBuscar.onclick = () => {
    paginaActual = 0
    buscarResultados()
}


///// PAGINADO Y BOTONES ////////////////////////////////////////////////////////


primeraPagina.onclick = () => {
    resultados.innerHTML = ""
    paginaActual = 0
    buscarResultados()
}

paginaPrevia.onclick = () => {
    resultados.innerHTML = ""
    paginaActual--
    buscarResultados()
}

paginaSiguiente.onclick = () => {
    resultados.innerHTML = ""
    paginaActual++
    buscarResultados()
}

ultimaPagina.onclick = () => {
    restoDeResultados = cantidadDeResultados % resultadosPorPagina
    if (restoDeResultados > 0 ) {
        paginaActual = (cantidadDeResultados - (restoDeResultados)) / resultadosPorPagina
    }    
    else {
        paginaActual = (cantidadDeResultados / resultadosPorPagina) - 1
    }
    buscarResultados()
}

deshabilitarOHabilitarBotones = (offset = "0", cantidadDeResultados = "0") => {
    if (paginaActual == 0) {
        primeraPagina.disabled = true
        paginaPrevia.disabled = true
    }
    else {
        primeraPagina.disabled = false
        paginaPrevia.disabled = false
    }

    if (offset + 20 >= cantidadDeResultados) {
        paginaSiguiente
    .disabled = true
        ultimaPagina.disabled = true
    }
    else {
        paginaSiguiente
    .disabled = false
        ultimaPagina.disabled = false
    }
}


///// MOSTRAR INFO DE PERSONAJES O COMICS ////////////////////////////////////////////////////////

const mostrarInfoComic = (comicId) => {
    fetch(`${urlBase}/comics/${comicId}?apikey=${apiKey}`)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        data.data.results.map (data => {
            const informacionPersonaje = document.querySelector(".contenedor-info-comic")
            informacionPersonaje.classList.remove("ocultar")
            informacionPersonaje.innerHTML = 
            `
            <div class="contenedor-imagen-info-comic">
                <img class="imagen-info-comic" src="${data.thumbnail.path}.jpg">
            </div>
            <div class="info-comic">
                <h2 class="titulo-comic">${data.title}</h2>
                <h3 class="subtitulo-info">Publicado:</h3>
                <p class="detalle-info">(fecha)</p>
                <h3 class="subtitulo-info">Guionistas:</h3>
                <p class="detalle-info">${data.creators.items[0].name}</p>
                <h3 class="subtitulo-info">Descripcion:</h3>
                <p class="detalle-info">${data.description}</p>
            </div>
            `
        })
    })
}

const clickearTarjetaParaVerInfo = () => {
    const tarjetasComic = document.querySelectorAll(".tarjeta-comic")
    console.log(tarjetasComic)

    tarjetasComic.forEach(tarjeta => {
    console.log(tarjeta)
    tarjeta.onclick = (e) => {
        console.log("CLICK")
        comicId = e.target.dataset.id
        resultados.innerHTML = ""
        mostrarInfoComic(comicId)
        }
    })
}