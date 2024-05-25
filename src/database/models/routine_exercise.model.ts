import db from "./../config/index";
import {DataTypes, Model} from "sequelize";

export interface IRoutineExercise {
    pk_routine_exercise: number;
    fk_routine: number;
    fk_exercise: number;
};

class RoutineExercise extends Model<IRoutineExercise> implements IRoutineExercise {
    public pk_routine_exercise!: number;
    public fk_routine!: number;
    public fk_exercise!: number;
}

RoutineExercise.init({
    pk_routine_exercise: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: DataTypes.INTEGER
    },
    fk_routine: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    fk_exercise: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize: db,
    tableName: "routine_exercise"
})

export default RoutineExercise;