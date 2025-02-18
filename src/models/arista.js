/**
 * Clase que crea una Arista
 * 
 * @author Jorge Manzano Anchelergues
 */
class Arista {
    
    /**
     * Construye una arista
     * 
     * @param {*} next el nodo destino
     * @param {*} peso el peso entre el nodo origen y el destino
     */
    constructor(next, peso) {
        this._next = next;  // Usamos _ para la propiedad interna
        this._peso = peso;  // Lo mismo aquí
    }

    // Getter para next (nodo de destino)
    get next() {
        return this._next;
    }

    // Getter para peso
    get peso() {
        return this._peso;
    }

    // Setter para peso
    set peso(peso) {
        this._peso = peso;
    }
}

export default Arista;