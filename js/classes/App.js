
import { nuevaCita} from '../funciones.js'
import {formCita} from '../selectores.js';
class App {
    constructor() {
        this.initApp();
    }
    initApp(){
        formCita.addEventListener('submit',nuevaCita)
    }
}
export default App;