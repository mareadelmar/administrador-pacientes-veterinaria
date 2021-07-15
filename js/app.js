const mascotaInput = document.querySelector("#mascota");
const propietarioInput = document.querySelector("#propietario");
const telefonoInput = document.querySelector("#telefono");
const fechaInput = document.querySelector("#fecha");
const horaInput = document.querySelector("#hora");
const sintomasInput = document.querySelector("#sintomas");

const form = document.querySelector("#nueva-cita");
const citasLista = document.querySelector("#citas");

// para reutilizar la función nuevaCita
let modoEdicion;

// dos clases: una para UI y otra para administrar las citas
class UI {
    imprimirAlerta(mensaje, tipo) {
        const divMensaje = document.createElement("div");
        divMensaje.classList.add("text-center", "alert", "col-12", "d-block");

        if (tipo === "error") {
            divMensaje.classList.add("alert-danger");
        } else {
            divMensaje.classList.add("alert-success");
        }

        divMensaje.textContent = mensaje;

        // lo insertamos en el contenedor, antes del form
        document
            .querySelector("#contenido")
            .insertBefore(divMensaje, document.querySelector(".agregar-cita"));

        setTimeout(() => {
            divMensaje.remove();
        }, 5000);
    }

    imprimirCitas({ citas }) {
        console.log(citas);

        // herramienta para no duplicar con cada iteración
        this.limpiarHTML();

        citas.forEach((item) => {
            const {
                mascota,
                propietario,
                telefono,
                fecha,
                hora,
                sintomas,
                id,
            } = item;

            const divCita = document.createElement("div");
            divCita.classList.add("cita", "p-3");
            divCita.dataset.id = id;

            // scripting de los elementos de la cita
            const mascotaParrafo = document.createElement("h2");
            mascotaParrafo.classList.add("card-title", "font-weight-bolder");
            mascotaParrafo.textContent = mascota;

            const propietarioParrafo = document.createElement("p");
            propietarioParrafo.innerHTML = `
            <span class="font-weight-bolder">Propietario:</span>${propietario}
        `;

            const telefonoParrafo = document.createElement("p");
            telefonoParrafo.innerHTML = `
            <span class="font-weight-bolder">Telefono:</span>${telefono}
        `;

            const fechaParrafo = document.createElement("p");
            fechaParrafo.innerHTML = `
            <span class="font-weight-bolder">Fecha:</span>${fecha}
        `;

            const horaParrafo = document.createElement("p");
            horaParrafo.innerHTML = `
            <span class="font-weight-bolder">Hora:</span>${hora}
        `;

            const sintomasParrafo = document.createElement("p");
            sintomasParrafo.innerHTML = `
            <span class="font-weight-bolder">Síntomas:</span>${sintomas}
        `;

            const btnEliminar = document.createElement("button");
            btnEliminar.classList.add("btn", "btn-danger", "mr-2");
            btnEliminar.innerHTML = `Eliminar <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
            </svg>`;
            btnEliminar.onclick = () => eliminarCita(id);

            const btnEditar = document.createElement("button");
            btnEditar.classList.add("btn", "btn-info");
            btnEditar.innerHTML = `Editar <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>`;
            btnEditar.onclick = () => editarCita(item);

            divCita.appendChild(mascotaParrafo);
            divCita.appendChild(propietarioParrafo);
            divCita.appendChild(telefonoParrafo);
            divCita.appendChild(fechaParrafo);
            divCita.appendChild(horaParrafo);
            divCita.appendChild(sintomasParrafo);
            divCita.appendChild(btnEliminar);
            divCita.appendChild(btnEditar);

            citasLista.appendChild(divCita);
        });
    }

    limpiarHTML() {
        while (citasLista.firstChild) {
            citasLista.removeChild(citasLista.firstChild);
        }
    }
}

class Citas {
    constructor() {
        this.citas = [];
    }

    agregarCita(cita) {
        this.citas = [...this.citas, cita];
        console.log(this.citas);
    }

    borrarCita(id) {
        this.citas = this.citas.filter((item) => item.id !== id);
    }

    cargarEdicion(citaEditada) {
        this.citas = this.citas.map((item) => {
            if (item.id === citaEditada.id) {
                return citaEditada;
            }
            return item;
        });
    }
}

const ui = new UI();
const administrarCitas = new Citas();

eventListeners();
function eventListeners() {
    // podría usar change tmb
    mascotaInput.addEventListener("input", datosCita);
    propietarioInput.addEventListener("input", datosCita);
    telefonoInput.addEventListener("input", datosCita);
    fechaInput.addEventListener("input", datosCita);
    horaInput.addEventListener("input", datosCita);
    sintomasInput.addEventListener("input", datosCita);

    form.addEventListener("submit", nuevaCita);
}

const citaObj = {
    mascota: "",
    propietario: "",
    telefono: "",
    fecha: "",
    hora: "",
    sintomas: "",
};

function datosCita(e) {
    // vamos a utilizar la propiedad name, que ya tenemos en el html, para aceder a las claves del obj.
    citaObj[e.target.name] = e.target.value;
}

// valida y agrega una nueva cita a la clase citas
function nuevaCita(e) {
    e.preventDefault();

    // extramos la info del citaObj que es el que se va a ir llenando
    const { mascota, propietario, telefono, fecha, hora, sintomas } = citaObj;
    if (
        mascota === "" ||
        propietario === "" ||
        telefono === "" ||
        fecha === "" ||
        hora === "" ||
        sintomas === ""
    ) {
        console.log("todos los campos son obligatorios");
        ui.imprimirAlerta("Todos los campos son obligatorios", "error");
        return;
    }

    // MODO EDICIÓN O MODO CREAR CITA: condicionamos solo lo que los diferencia
    if (modoEdicion) {
        console.log("modo edición");
        administrarCitas.cargarEdicion({ ...citaObj });

        ui.imprimirAlerta("La cita fue editada correctamente");
        form.querySelector("button[type='submit']").textContent = "Crear cita";
        modoEdicion = false;
    } else {
        console.log("modo nueva cita");
        // generar un id para editarla o eliminarla
        citaObj.id = Date.now();
        // le pasamos UNA COPIA DEL OBJETO xq es global: si no se sobreescribe cada vez.
        administrarCitas.agregarCita({ ...citaObj });
        ui.imprimirAlerta("La cita fue agregada correctamente");
    }

    // reseteamos el formulario pero tmb el objeto
    form.reset();
    reiniciarObjeto();

    // necesitamos pasarle la referencia administrarCitas que es el que contiene el arreglo.
    ui.imprimirCitas(administrarCitas);
}

function reiniciarObjeto() {
    citaObj.mascota = "";
    citaObj.propietario = "";
    citaObj.telefono = "";
    citaObj.fecha = "";
    citaObj.hora = "";
    citaObj.sintomas = "";
}

function eliminarCita(id) {
    console.log(id);

    administrarCitas.borrarCita(id);
    ui.imprimirAlerta("La cita fue eliminada correctamente");
    ui.imprimirCitas(administrarCitas);
}

function editarCita(cita) {
    console.log(cita);
    const { mascota, propietario, telefono, fecha, hora, sintomas, id } = cita;

    // llenar los inputs
    mascotaInput.value = mascota;
    propietarioInput.value = propietario;
    telefonoInput.value = telefono;
    fechaInput.value = fecha;
    horaInput.value = hora;
    sintomasInput.value = sintomas;

    // llenar tmb el citaObj
    citaObj.mascota = mascota;
    citaObj.propietario = propietario;
    citaObj.telefono = telefono;
    citaObj.fecha = fecha;
    citaObj.hora = hora;
    citaObj.sintomas = sintomas;
    citaObj.id = id;

    // cambiamos el botón a editar
    form.querySelector("button[type='submit']").textContent = "Guardar cambios";

    modoEdicion = true;
}
