const resultado = document.querySelector("#resultado");
const marca = document.querySelector("#marca");
const year = document.querySelector("#year");
const minimo = document.querySelector("#minimo");
const maximo = document.querySelector("#maximo");
const puertas = document.querySelector("#puertas");
const transmision = document.querySelector("#transmision");
const color = document.querySelector("#color");
const btnReset = document.querySelector('#form button[type="text"]');

const actualYear = new Date().getFullYear(); // crea el año actual
const minYear = actualYear - 10;

//creamos un objeto donde iremos guardando los valores que seleccione el usuario
const datosSeleccionados = {
    marca: "",
    modelo: "",
    year: "",
    minimo: "",
    maximo: "",
    puertas: "",
    transmision: "",
    color: "",
};

document.addEventListener("DOMContentLoaded", () => {
    //muestra los automóviles al cargar y le paso todos los autos de la BBDD
    mostrarAutos(autos);

    //rellena el select de años
    llenarSelectYear();
});

//eventos para cada uno de los select

//creamos la plantilla para mostrar los autos en el HTML y como parámetro le pasamos el filtro que hemos hecho
function mostrarAutos(autosFiltrados) {
    //llamamos a la función limpiarHTML para eliminar el HTML previo antes de mostrar los resultados
    limpiarHTML();

    autosFiltrados.forEach((auto) => {
        const { marca, modelo, year, puertas, transmision, precio, color } =
            auto;
        const autoHTML = document.createElement("P");
        autoHTML.textContent = `${marca} ${modelo} - ${year} - ${puertas} Puertas - Transmisión: ${transmision} - Precio: ${precio} - Color:${color}`;

        resultado.appendChild(autoHTML); // no borra el contenido previo, lo tenemos que borrar
    });
}

//limpiar el HTML

function limpiarHTML() {
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
}

function llenarSelectYear() {
    //hacemos un loop FOR para que nos muestre los años desde el actual hasta lo 10 siguentes en ascenso, empezando en el 2023 hacia atrás, por tanto i tiene que ser negativo

    for (let i = actualYear; i >= minYear; i--) {
        const optionSelect = document.createElement("option");
        optionSelect.value = i;
        optionSelect.textContent = i;
        year.appendChild(optionSelect);
    }
}

//recoger la opción que seleccionemos, para los select el método es 'change'
marca.addEventListener("change", (e) => {
    datosSeleccionados.marca = e.target.value;

    filtrarAuto();
});
year.addEventListener("change", (e) => {
    datosSeleccionados.year = e.target.value;

    filtrarAuto();
});
minimo.addEventListener("change", (e) => {
    datosSeleccionados.minimo = e.target.value;

    filtrarAuto();
});
maximo.addEventListener("change", (e) => {
    datosSeleccionados.maximo = e.target.value;

    filtrarAuto();
});
puertas.addEventListener("change", (e) => {
    datosSeleccionados.puertas = e.target.value;

    filtrarAuto();
});
transmision.addEventListener("change", (e) => {
    datosSeleccionados.transmision = e.target.value;

    filtrarAuto();
});
color.addEventListener("change", (e) => {
    datosSeleccionados.color = e.target.value;

    filtrarAuto();
});

//para resetear el formulario
btnReset.addEventListener("click", (e) => {
    e.preventDefault(); //evitamos el comportamiento por default, es decir, que resetee el formulario

    //reseteamos el formulario
    resetearFormulario();
});

//función para filtrar un coche. Autos es el [] de la BBDD. Vamos a usar funciones de alto nivel (high order), es decir cuando el método FILTER, toma otra función como parámetro FILTRARXXX. Una vez has seleccionado la marca, para seguir filtando por el resto de select, podemos encadenar los filter (chaining), para así solo filtrar segun el primero, en este caso, el de marca
function filtrarAuto() {
    const resultado = autos
        .filter(filtrarMarca)
        .filter(filtrarYear)
        .filter(filtrarMinimo)
        .filter(filtrarMaximo)
        .filter(filtrarPuertas)
        .filter(filtrarTransmision)
        .filter(filtrarColor);

    //comprobamos si nos llega un [] porque no exista ese auto y queremos mostrar un mesanje al usuario
    if (resultado.length) {
        mostrarAutos(resultado); //llamamos a la función que pinta los autos en el HTMl y le pasamos el resultado después de hacer los filtros
    } else {
        alertaSeleccionInexistente(); //sacamos un mensaje al usuario si no hay coches con la búsqueda que haya hecho
    }
}

function alertaSeleccionInexistente() {
    //como uso appenChild, el mensaje le sale al final, por tanto hay que limpiar primero el HTML
    limpiarHTML();

    const resultadoFallido = document.createElement("div");
    resultadoFallido.classList.add("alerta", "error");
    resultadoFallido.textContent = "No hay resultado, inténtalo de nuevo";
    resultado.appendChild(resultadoFallido);
}

//primero nos aseguramos que marca esté rellena, ya que lo inicializamos en ''
function filtrarMarca(auto) {
    const { marca } = datosSeleccionados;
    //validamos lo que ha seleccionado el usuario (datosSeleccionados.marca con auto.marca, la option del select)
    if (marca) {
        return auto.marca === marca;
    }
    //y si no selecciona nada retorna el auto
    return auto;
}
function filtrarYear(auto) {
    const { year } = datosSeleccionados;
    //validamos lo que ha seleccionado el usuario (datosSeleccionados.year con auto.year, la option del select)
    if (year) {
        return auto.year === parseInt(year); // este year hay que parsearlo a número ya que auto.year es un núm y year de datosSeleccionados es un string, de esta forma conseguimos que haga la búsqueda exacta y muestre solo los autos con el año seleccionado
    }
    //y si no selecciona nada retorna el auto
    return auto;
}
function filtrarMinimo(auto) {
    const { minimo } = datosSeleccionados;
    //validamos lo que ha seleccionado el usuario (datosSeleccionados.minimo con auto.minimo, la option del select)
    if (minimo) {
        return auto.precio >= minimo; //en este caso comparo el auto.precio que sea mayor o = al precio que en este caso selecciona el usuario en el select y al no usar comparador estricto, no hace falta parsear minimo
    }
    //y si no selecciona nada retorna el auto
    return auto;
}
function filtrarMaximo(auto) {
    const { maximo } = datosSeleccionados;
    //validamos lo que ha seleccionado el usuario (datosSeleccionados.minimo con auto.maximo, la option del select)
    if (maximo) {
        return auto.precio <= maximo; //en este caso comparo el auto.precio que sea menor o = al precio que en este caso selecciona el usuario en el select y al no usar comparador estricto, no hace falta parsear maximo
    }
    //y si no selecciona nada retorna el auto
    return auto;
}
function filtrarPuertas(auto) {
    const { puertas } = datosSeleccionados;

    if (puertas) {
        return auto.puertas === parseInt(puertas);
    }

    return auto;
}
function filtrarTransmision(auto) {
    const { transmision } = datosSeleccionados;

    if (transmision) {
        return auto.transmision === transmision;
    }

    return auto;
}
function filtrarColor(auto) {
    const { color } = datosSeleccionados;

    if (color) {
        return auto.color === color;
    }

    return auto;
}

function resetearFormulario() {
    return (datosSeleccionados = {
        marca: "",
        modelo: "",
        year: "",
        minimo: "",
        maximo: "",
        puertas: "",
        transmision: "",
        color: "",
    });
}
