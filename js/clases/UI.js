import { eliminarCita, editarCita } from "../funciones.js"
import { citasLista } from "../selectores.js"

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

export default UI;