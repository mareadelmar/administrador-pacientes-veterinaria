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

export default Citas;