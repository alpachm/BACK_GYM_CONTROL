import db from "./../config/index";
import {DataTypes} from "sequelize";

const Exercise = db.define("exercises", {
    pk_exercise: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    wieght: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    repetitions: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    img_url: {
        type: DataTypes.STRING,
        allowNull: true
    },
    fk_user: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
});

export default Exercise;