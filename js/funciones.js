import Citas from './classes/Citas.js';
import UI from './classes/UI.js';
import {pacienteInput,fechaInput, formCita} from './selectores.js';


let editando = false ;
const citaObj = {}
const administrarCitas = new Citas();
const ui = new UI();


export function nuevaCita(e) {
    e.preventDefault();

    const paciente = pacienteInput.value;
    const fecha = fechaInput.value;

    citaObj.fecha = fecha
    citaObj.paciente = paciente

    if(  paciente === ''  || fecha === ''  ) {
        return ui.imprimirAlerta("Todos los campos son obligatorios", "error")
    }
    if(editando){
        //edicion de cita
        administrarCitas.editarCita({...citaObj});
        ui.imprimirAlerta("Guardado Correctamente");
        formCita.querySelector('button[type = "submit"]').textContent = 'Crear Cita'
        editando = false;
    }else {
        // nueva cita
        citaObj.id = Date.now();
        // agregar una referencia del objeto (copia) no el objeto global citaobj
        administrarCitas.agregarCita({...citaObj})
        ui.imprimirAlerta("Se agregó correctamente")
    }
    ui.imprimirCitas(administrarCitas)
    formCita.reset()

}



export function eliminarCita(cita){
    administrarCitas.eliminarCita(cita)
    ui.imprimirAlerta('La cita se eliminó correctamente')
    ui.imprimirCitas(administrarCitas)
}

export function cargarEdicion(cita){
    const {paciente,fecha,id} = cita
    citaObj.id = id;
    // Llenar los Inputs
    pacienteInput.value = paciente;
    fechaInput.value = fecha;

    formCita.querySelector('button[type = "submit"]').textContent = 'Guardar Cambios'
    editando = true;
}