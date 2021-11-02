import Citas from "../js/clases/Citas";

// Probar los métodos de agregar, editar y eliminar citas

describe("clase Citas", () => {
	const citas = new Citas();

	const id = Date.now(); // lo dejamos acá para que sea global y poder usarlo para probar el método editar y eliminar.

	test("Agregar una nueva cita", () => {
		const citaObj = {
			id,
			mascota: "Pepe",
			propietario: "Juan",
			telefono: "123456",
			fecha: "10-12",
			hora: "11:00",
			sintomas: "Habla",
		};

		citas.agregarCita(citaObj);

		expect(citas).toMatchSnapshot();
	});

	test("Editar una cita", () => {
		// cambiamos algunos datos para verlo reflejado en el snapshot y saber que está bien implementado

		const citaActualizada = {
			id,
			mascota: "Pepe Loco",
			propietario: "Juan",
			telefono: "123456",
			fecha: "10-12",
			hora: "11:00",
			sintomas: "Habla sin parar",
		};

		citas.cargarEdicion(citaActualizada);

		expect(citas).toMatchSnapshot(); // la próxima ejecución requiere actualizar el snapshot con -- -u
	});

	test("Eliminar cita", () => {
		citas.borrarCita(id);

		expect(citas).toMatchSnapshot();
	});
});
