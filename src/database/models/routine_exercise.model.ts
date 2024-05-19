import db from "./../config/index";
import {DataTypes} from "sequelize";

const RoutineExercise = db.define("routine_exercise", {
    pk_routine_exercise: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    fk_routine: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    fk_exercise: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

export default RoutineExercise;