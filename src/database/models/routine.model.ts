import db from "./../config/index";
import {DataTypes, Model, Optional} from "sequelize";

export interface IRoutine {
    pk_routine: number;
    name: string;
    fk_user: number;
    fk_day: number;
    status: boolean
}

interface IRoutineCreationAttributes extends Optional<IRoutine, "pk_routine" | "status">{};

class Routine extends Model<IRoutine, IRoutineCreationAttributes> implements IRoutine {
    public pk_routine!: number;
    public name!: string;
    public fk_user!: number;
    public fk_day!: number;
    public status!: boolean;
}

Routine.init({
    pk_routine: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fk_user: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    fk_day: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
},{
    sequelize: db,
    tableName: "routines"
})

export default Routine;