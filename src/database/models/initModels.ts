import User from "./user.model";
import Routine from "./routine.model";
import Exercise from "./exercise.model";
import RoutineExercise from "./routine_exercise.model";
import Day from "./day.model";

const initModel = () => {
    User.hasMany(Routine, {foreignKey: "fk_user"});
    Routine.belongsTo(User, {foreignKey: "fk_user"});

    Day.hasMany(Routine, {foreignKey: "fk_day"});
    Routine.belongsTo(Day, {foreignKey: "fk_day"})

    User.hasMany(Exercise, {foreignKey: "fk_user"});
    Exercise.belongsTo(User, {foreignKey: "fk_user"});

    Routine.hasMany(RoutineExercise, {foreignKey: "fk_routine"});
    RoutineExercise.belongsTo(Routine, {foreignKey: "fk_routine"});

    Exercise.hasMany(RoutineExercise, {foreignKey: "fk_exercise"});
    RoutineExercise.belongsTo(Exercise, {foreignKey: "fk_exercise"});
};

export default initModel;