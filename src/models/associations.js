import Enlace from "./EnlaceModel.js";
import Ciudad from "./ciudadModel.js";

/**
 * Clase que declara las relaciones entre ciudad y enlace
 * 
 * @author Jorge Manzano Anchelergues
 */

Ciudad.hasMany(Enlace, { foreignKey: "idOrigen", as: 'enlacesOrigen' }); // Los enlaces de origen
Ciudad.hasMany(Enlace, { foreignKey: "idDestino", as: 'enlacesDestino' }); // Los enlaces de destino
Enlace.belongsTo(Ciudad, { foreignKey: 'idOrigen', as: 'ciudadOrigen' });  // La ciudad de origen
Enlace.belongsTo(Ciudad, { foreignKey: 'idDestino', as: 'ciudadDestino' });  // La ciudad de destino