import Nodo from "./nodo.js";
import Arista from "./arista.js"

/**
 * Clase que crea un grafo
 * 
 * @author Jorge Manzano Anchelergues
 */

class Grafo {

    /**
     * Construye un grafo
     * 
     * @param {*} ciudades una lista con las ciudades
     * para crear los nodos
     */
    constructor(ciudades) {
        this._ciudades = this.construirGrafo(ciudades);
    }

    // Método para construir el grafo a partir de las ciudades
    construirGrafo(ciudades) {
        const nodos = this.crearNodos(ciudades);
        this.cargarAristas(nodos, ciudades);
        return nodos;
    }

    // Método para crear los nodos (ciudades)
    crearNodos(ciudades) {
        const nodos = [];        
        for (const ciudad of ciudades) {
            nodos.push(new Nodo(ciudad)); 
        }
        return nodos;
    }

    // Método para cargar las aristas de los nodos
    cargarAristas(nodos) {
        // Iteramos sobre cada nodo (ciudad)
        for (const nodo of nodos) {
            // Accedemos a los enlaces de la ciudad (usando la relación de "enlacesOrigen")
            for (const enlace of nodo.ciudad.enlacesOrigen) {
                // Buscamos el nodo al que se conecta (destino)
                for (const nodoAnadir of nodos) {
                    // Aseguramos que no estamos añadiendo una arista a sí mismo
                    if (nodoAnadir !== nodo && nodoAnadir.ciudad.id === enlace.idDestino) {
                        // Añadimos una nueva arista
                        nodo.anadirArista(new Arista(nodoAnadir, 
                            enlace.animales + enlace.saturacion + enlace.tiempo));
                    }
                }
            }
        }
    }

    // Getter para obtener las ciudades
    get ciudades() {
        return this._ciudades;
    }
}

export default Grafo;