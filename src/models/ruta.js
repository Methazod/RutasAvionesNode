/**
 * Clase que crea un ruta
 * 
 * @author Jorge Manzano Anchelergues
 */

class Ruta {

    /**
     * Construye una ruta
     * 
     * @param {*} origen id de la ciudad de origen
     * @param {*} destino id de la ciudad de destino
     */
    constructor(origen, destino) {
        this._origen = origen;
        this._destino = destino;
        this._camino = [];
    }

    // Getter de la ciudad origen
    get origen() { return this._origen; }

    // Setter de la ciudad origen
    set origen(origen) { this._origen = origen; }

    // Getter de la ciudad destino
    get destino() { return this._destino; }

    // Setter de la ciudad destino
    set destino(destino) { this._destino = destino; }
    
    // Getter del camino
    get camino() { return this._camino; }
}

export default Ruta;