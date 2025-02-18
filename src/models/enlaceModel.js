import { Sequelize } from "sequelize";
import db from "../config/database.js";

/**
 * Clase que crea un enlace.
 * 
 * @author Jorge Manzano Anchelergues
 */

const { DataTypes } = Sequelize;


const Enlace = db.define('Enlace',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    idOrigen:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "Ciudad",
            key: "id"
        }
    },
    idDestino:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "Ciudad",
            key: "id"
        }
    },
    saturacion:{
        type: DataTypes.INTEGER
    },
    tiempo:{
        type: DataTypes.INTEGER
    },
    animales:{
        type: DataTypes.INTEGER
    }
},{
    freezeTableName: true,
    timestamps: false,
});

(async () => {
    await db.sync();
})();

export default Enlace;