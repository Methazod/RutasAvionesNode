import { Sequelize } from "sequelize";
import db from "../config/database.js";

/**
 * Clase que crea una ciudad
 * 
 * @author Jorge Manzano Anchelergues
 */

const { DataTypes } = Sequelize;


const Ciudad = db.define('Ciudad',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre:{
        type: DataTypes.STRING
    },
    poblacion:{
        type: DataTypes.DOUBLE
    },
    km2:{
        type: DataTypes.FLOAT
    }
},{
    freezeTableName: true,
    timestamps: false,
});

(async () => {
    await db.sync();
})();

export default Ciudad;