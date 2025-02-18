import Ciudad from "../models/ciudadModel.js";
import Grafo from "../models/grafo.js";
import Enlace from "../models/EnlaceModel.js";
import Ruta from "../models/ruta.js"
import Arista from "../models/arista.js";
import PriorityQueue from 'js-priority-queue';

/**
 * Controlador de la API.
 * 
 * @author Jorge Manzano Anchelergues
 */

/**
 * Metodo que devuelve al cliente todas
 * las ciudades
 * 
 * @param {*} req nada
 * @param {*} res las ciudades
 */
export const GetCiudades = async(req, res) => {
    try {
        const ciudades = await Ciudad.findAll({
            attributes:['id','nombre','poblacion', 'km2'],
            include: [
                {
                    model: Enlace,
                    as: 'enlacesDestino', // Alias para la relación de los enlaces de destino
                    foreignKey: 'idDestino',
                }
            ]
        });
        res.json(ciudades);
    } catch (error) {
        console.log(error);
    }
}

/**
 * Metodo que recibe dos ids, de la ciudad origen
 * y de la ciudad destino, y devuelve la ruta
 * más corta posible entre las dos ciudades.
 * 
 * @param {*} req los ids de las ciudades
 * @param {*} res la ruta más corta
 */
export const GetRuta = async(req, res) => {
    const { idOrigen, idDestino } = req.body;
    try {                                
        res.json(await calcularRuta(new Ruta(idOrigen, idDestino)));
    } catch (error) {
        console.log(error);
    }
}

/**
 * Funcion que calcula la ruta mas corta posible y devuelve
 * el camino.
 * 
 * @param {*} ruta la ruta con los ids de las ciudades
 * @returns el camino
 */
async function calcularRuta(ruta) {            
    let grafo = await crearGrafo();    
    const rutaID = [];            
    reconstruirRuta(ruta.destino-1, dijkstra(grafo, ruta.origen-1), rutaID);  
    for (const id of rutaID) {
        ruta.camino.push(await buscarCiudad(id));
    }  
    return ruta.camino;
}

/**
 * Funcion que crea el grafo que contendra las ciudades.
 * 
 * @returns el grafo con las ciudades.
 */
async function crearGrafo(){
    const ciudades = await Ciudad.findAll({
        attributes:['id','nombre','poblacion', 'km2'],
        include: [
            {
                model: Enlace,
                as: 'enlacesOrigen', // Alias para la relación de los enlaces de destino
                foreignKey: 'idOrigen',
            }
        ]
    }); 
    return new Grafo(ciudades);
}

/**
 * Funcion que busca una ciudad por su id
 * 
 * @param {*} id el id de la ciudad
 * @returns la ciudad
 */
async function buscarCiudad(id){
    return await Ciudad.findByPk(id);
}

/**
 * Metodo que con un grafo y la ciudad de origen,
 * calcula cual es la manera mas corta de llegar
 * a cualquier otro punto del grafo(otra ciudad)
 * 
 * @param {*} grafo el grafo a buscar
 * @param {*} nodoInicio la ciudad origen
 * @returns una lista con la ciudad adyacente
 * desde la cual se llega más rapido para cada ciudad
 */
function dijkstra(grafo, nodoInicio) {
    let V = grafo.ciudades.length;
    let distancias = Array(V).fill(Number.MAX_VALUE); // Inicializamos todas las distancias como infinito
    let camino = Array(V).fill(-1); // Inicializamos los caminos a -1    
    distancias[nodoInicio] = 0; // La distancia al nodo de inicio es 0

    const colaPrioridad = new PriorityQueue({comparator: (a, b) => a.distancia - b.distancia });// Compara por distancia mínima
    colaPrioridad.queue(nodoInicio);
    while (!colaPrioridad.length == 0) {
        let u = colaPrioridad.dequeue();                   
        for (let arista of grafo.ciudades[u].aristas) {            
            let v = arista.next.ciudad.id-1;
            let peso = arista.peso;
            if (distancias[u] + peso < distancias[v]) {
                distancias[v] = distancias[u] + peso;
                camino[v] = u;
                colaPrioridad.queue(v);
            }
        }          
    }    
    console.log(distancias)
    console.log(camino)
    return camino;
}

/**
 * Metodo que con un camino devuelto por dijkstra,
 * reconstruye la ruta que se ha de tomar, para 
 * llegar lo mas rapido posible.
 * 
 * @param {*} nodoFin la ciudad destino
 * @param {*} camino el camino a seguir
 * @param {*} ruta lista que guarda la ruta
 */
function reconstruirRuta(nodoFin, camino, ruta) {       
    if(camino[nodoFin] != -1) reconstruirRuta(camino[nodoFin], camino, ruta);
    ruta.push(nodoFin+1);
}