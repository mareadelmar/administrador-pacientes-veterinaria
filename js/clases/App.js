import {nuevaCita, datosCita} from "../funciones.js"

import {
    mascotaInput, 
    propietarioInput, 
    telefonoInput, 
    horaInput, 
    fechaInput, 
    sintomasInput, 
    form
} from "../selectores.js"

export default class App{
    constructor(){
        this.initApp();
    }

    initApp(){
        mascotaInput.addEventListener("input", datosCita);
        propietarioInput.addEventListener("input", datosCita);
        telefonoInput.addEventListener("input", datosCita);
        fechaInput.addEventListener("input", datosCita);
        horaInput.addEventListener("input", datosCita);
        sintomasInput.addEventListener("input", datosCita);

        form.addEventListener("submit", nuevaCita);

        }
}