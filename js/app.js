
const mascotaInput = document.querySelector('#mascota');
const propietarioInput = document.querySelector('#propietario');
const telefonoInput = document.querySelector('#telefono');
const fechaInput = document.querySelector('#fecha');
const horaInput = document.querySelector('#hora');
const sintomasInput = document.querySelector('#sintomas');
const formCita = document.querySelector('#nueva-cita');

const contenedorCitas = document.querySelector('#citas')


formCita.addEventListener('submit',nuevaCita)

let editando = false ;

class Citas {
    constructor(){
        this.citas= []
        print(this.citas)
    }
    agregarCita(cita){
        this.citas = [...this.citas , cita]
    }
    editarCita(citaeditada) {
        this.citas = this.citas.map( cita => {
            if(citaeditada.id === cita.id){
                return citaeditada
            }
            return cita
        })
    }

    eliminarCita(cita) {
        this.citas = this.citas.filter(el => el.id !== cita.id)
    }



}

class UI{
    imprimirAlerta(mensaje , tipo){
        const contenido = document.querySelector('#contenido')
        const formNuevaCita = document.querySelector('.agregar-cita')
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center','alert','d-block','col-12')
        if ( tipo === 'error'){
            divMensaje.classList.add('alert-danger')
        }else {
            divMensaje.classList.add('alert-success')
        }
        divMensaje.textContent = mensaje;
        contenido.insertBefore(divMensaje, formNuevaCita)
        setTimeout(() => {
            divMensaje.remove();
        },3000)
    }
    imprimirCitas({citas}){
        this.clearHTML(contenedorCitas)
        citas.forEach( cita => {
            const {mascota, propietario, telefono, fecha, hora, sintomas,id} = cita
            const divCita = document.createElement('div')
            divCita.dataset.id = id;

            const mascotaParrafo = document.createElement('h2');
            mascotaParrafo.classList.add('card-title', 'font-weight-bolder');
            mascotaParrafo.innerHTML = `${mascota}`;

            const propietarioParrafo = document.createElement('p');
            propietarioParrafo.innerHTML = `<span class="font-weight-bolder">Propietario: </span> ${propietario}`;


            const telefonoParrafo = document.createElement('p');
            telefonoParrafo.innerHTML = `<span class="font-weight-bolder">Teléfono: </span> ${telefono}`;

            const fechaParrafo = document.createElement('p');
            fechaParrafo.innerHTML = `<span class="font-weight-bolder">Fecha: </span> ${fecha}`;

            const horaParrafo = document.createElement('p');
            horaParrafo.innerHTML = `<span class="font-weight-bolder">Hora: </span> ${hora}`;

            const sintomasParrafo = document.createElement('p');
            sintomasParrafo.innerHTML = `<span class="font-weight-bolder">Síntomas: </span> ${sintomas}`;

            // Agregar un botón de eliminar...
            const btnEliminar = document.createElement('button');
            btnEliminar.onclick = () => eliminarCita(cita); // añade la opción de eliminar
            btnEliminar.classList.add('btn', 'btn-danger', 'mr-2');
            btnEliminar.innerHTML = 'Eliminar <svg fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>'

            // Añade un botón de editar...
            const btnEditar = document.createElement('button');

            btnEditar.onclick = () => cargarEdicion(cita);
            btnEditar.classList.add('btn', 'btn-info');
            btnEditar.innerHTML = 'Editar <svg fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>'


            divCita.appendChild(mascotaParrafo);
            divCita.appendChild(propietarioParrafo);
            divCita.appendChild(telefonoParrafo);
            divCita.appendChild(fechaParrafo);
            divCita.appendChild(horaParrafo);
            divCita.appendChild(sintomasParrafo);
            divCita.appendChild(btnEliminar)
            divCita.appendChild(btnEditar)

            contenedorCitas.appendChild(divCita);
        })

    }
    clearHTML(element){
        while(element.firstChild){
            element.removeChild(element.firstChild)
        }
    }
}

const citaObj = {

}

const administrarCitas = new Citas();
const ui = new UI();

function nuevaCita(e) {
    e.preventDefault();

    const mascota = mascotaInput.value;
    const propietario = propietarioInput.value;
    const telefono = telefonoInput.value;
    const fecha = fechaInput.value;
    const hora = horaInput.value;
    const sintomas = sintomasInput.value;

    citaObj.mascota = mascota;
    citaObj.propietario = propietario;
    citaObj.telefono = telefono;
    citaObj.fecha = fecha
    citaObj.hora = hora;
    citaObj.sintomas = sintomas;



    if( mascota === '' || propietario === '' || telefono === '' || fecha === ''  || hora === '' || sintomas === '' ) {
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


function eliminarCita(cita){
    administrarCitas.eliminarCita(cita)
    ui.imprimirCitas(administrarCitas)
}

function cargarEdicion(cita){
    const {mascota, propietario, telefono, fecha, hora, sintomas, id} = cita

    citaObj.id = id;
    // Llenar los Inputs
    mascotaInput.value = mascota;
    propietarioInput.value = propietario;
    telefonoInput.value = telefono;
    fechaInput.value = fecha;
    horaInput.value = hora;
    sintomasInput.value = sintomas;

    formCita.querySelector('button[type = "submit"]').textContent = 'Guardar Cambios'
    editando = true;
}