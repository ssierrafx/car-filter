// variables
const max = new Date().getFullYear();
const min = max - 10;

const resultado = document.querySelector('#resultado')

const datosBusqueda = {
    marca: '',
    year: '',
    minimo: '',
    maximo: '',
    puertas: '',
    transmision: '',
    color: '',
}

const selects = [
    {color: '#color'},
    {transmision: '#transmision'},
    {puertas: '#puertas'},
    {maximo: '#maximo'},
    {minimo: '#minimo'},
    {marca: '#marca'},
    {year: '#year'},
]

// eventos
document.addEventListener('DOMContentLoaded', () => {
    // muestra la lista de coches al cargar
    mostrarAutos(autos);
    // llena las opciones de años
    llenarYears();
})

// event listener para los select de búsqueda
selects.forEach(campos => {
    const [propiedad, selector] = Object.entries(campos)[0];
    document.querySelector(selector).addEventListener('change', e => {
        datosBusqueda[propiedad] = propiedad === 'year' || propiedad === 'puertas' ? parseInt(e.target.value) : e.target.value;
        filtrarAuto();
    });
});

// funciones
function mostrarAutos(autos) {
    // eliminar html previo
    limpiarHTML()

    autos.forEach(auto => {
        const autoHTML = document.createElement('P');
        const {marca, modelo, year, precio, puertas, color, transmision}  = auto
        autoHTML.textContent = `
        ${marca} ${modelo} - ${year} - ${puertas} Puertas - Transmisión: ${transmision} - Precio: $${precio} - Color: ${color}
        `

        // insertar en el html
        resultado.appendChild(autoHTML);
    })
}

//limpiar html
function limpiarHTML(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }
}

// genera los años del select
function llenarYears(){
    for (let i = max; i >= min; i--){
        const date = document.createElement('option')
        date.value = i;
        date.textContent = i;

        year.appendChild(date);
    }
}

function filtrarAuto() {
    const listaAutos = autos
    .filter(filtrarSelect)
    .filter(filtrarYear)
    .filter(filtrarMinimo)
    .filter(filtrarMaximo)
    .filter(filtrarPuertas)
    .filter(filtrarTransmision)
    .filter(filtarColor)

    if (listaAutos.length){
        console.log(listaAutos);
        mostrarAutos(listaAutos);
    } else {
        console.log(listaAutos);
        noResultado();
    }
}

function noResultado(){

    limpiarHTML();

    const alerta = document.createElement('DIV');
    alerta.classList.add('alerta', 'error');
    alerta.textContent = 'No hay resultado.';

    resultado.appendChild(alerta);
}

function filtrarSelect(auto) {
    if (datosBusqueda.marca){
        return auto.marca === datosBusqueda.marca
    }
    return auto;
}

function filtrarYear(auto){
    if (datosBusqueda.year){
        return auto.year === datosBusqueda.year;
    }
    return auto;
}

function filtrarMinimo(auto){
    if (datosBusqueda.minimo){
        return auto.precio >= datosBusqueda.minimo;
    }
    return auto;
}

function filtrarMaximo(auto){
    if (datosBusqueda.maximo){
        return auto.precio <= datosBusqueda.maximo;
    }
    return auto;
}

function filtrarPuertas(auto){
    if (datosBusqueda.puertas){
        return auto.puertas === datosBusqueda.puertas;
    }
    return auto;
}

function filtrarTransmision(auto){
    if (datosBusqueda.transmision){
        return auto.transmision === datosBusqueda.transmision;
    }
    return auto;
}

function filtarColor(auto){
    if (datosBusqueda.color){
        return auto.color === datosBusqueda.color;
    }
    return auto;
}

