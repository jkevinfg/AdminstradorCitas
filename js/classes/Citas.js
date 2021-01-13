
class Citas {
    constructor(){
        this.citas= []
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

export default Citas;

