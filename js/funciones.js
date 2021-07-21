import Citas from "./clases/Citas.js";
import UI from "./clases/UI.js";

import {
    mascotaInput, 
    propietarioInput, 
    telefonoInput, 
    horaInput, 
    fechaInput, 
    sintomasInput, 
    form
} from "./selectores.js"

const ui = new UI();
const administrarCitas = new Citas();

let modoEdicion;

const citaObj = {
    mascota: "",
    propietario: "",
    telefono: "",
    fecha: "",
    hora: "",
    sintomas: "",
};

export function datosCita(e) {
    // vamos a utilizar la propiedad name, que ya tenemos en el html, para aceder a las claves del obj.
    citaObj[e.target.name] = e.target.value;
}

// valida y agrega una nueva cita a la clase citas
export function nuevaCita(e) {
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

export function reiniciarObjeto() {
    citaObj.mascota = "";
    citaObj.propietario = "";
    citaObj.telefono = "";
    citaObj.fecha = "";
    citaObj.hora = "";
    citaObj.sintomas = "";
}

export function eliminarCita(id) {
    console.log(id);

    administrarCitas.borrarCita(id);
    ui.imprimirAlerta("La cita fue eliminada correctamente");
    ui.imprimirCitas(administrarCitas);
}

export function editarCita(cita) {
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