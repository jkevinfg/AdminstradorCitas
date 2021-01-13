import { eliminarCita, cargarEdicion} from '../funciones.js'
import {contenedorCitas} from '../selectores.js'
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
            const {paciente, fecha, id} = cita
            const divCita = document.createElement('div')
            divCita.dataset.id = id;

            const pacienteParrafo = document.createElement('h2');
            pacienteParrafo.classList.add('card-title', 'font-weight-bolder');
            pacienteParrafo.innerHTML = `${paciente}`;

            const fechaParrafo = document.createElement('p');
            fechaParrafo.innerHTML = `<span class="font-weight-bolder">Fecha: </span> ${fecha}`;

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


            divCita.appendChild(pacienteParrafo);
            divCita.appendChild(fechaParrafo);
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
export  default  UI;

