/**
 * Clase que crea un Nodo.
 * 
 * @author Jorge Manzano Anchelergues
 */

class Nodo {

    /**
     * Construye un Nodo
     * 
     * @param {*} ciudad la ciudad que guardara el nodo 
     */
    constructor(ciudad) {
        this._ciudad = ciudad;  // Usamos un prefijo _ para la propiedad interna
        this._aristas = [];      // Lo mismo aquí
    }

    // Getter para aristas
    get aristas() {
        return this._aristas;
    }

    // Getter para ciudad
    get ciudad() {
        return this._ciudad;
    }

    // Método para obtener una arista en una posición determinada
    getArista(posicion) {
        return this._aristas[posicion];
    }

    // Método para añadir una arista
    anadirArista(arista) {
        this._aristas.push(arista);
    }
}

export default Nodo;