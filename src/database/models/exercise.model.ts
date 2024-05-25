import db from "./../config/index";
import { DataTypes, Model, Optional } from "sequelize";

export interface IExercise {
  pk_exercise: number;
  name: string;
  weight: number;
  repetitions: number;
  img_url: string;
  fk_user: number;
  status: boolean;
}

interface IExerciseCreationAttributes extends Optional<IExercise, "pk_exercise" | "weight" | "repetitions" | "img_url" | "status"> {};

class Exercise extends Model<IExercise, IExerciseCreationAttributes> implements IExercise {
  public pk_exercise!: number;
  public name!: string;
  public weight!: number;
  public repetitions!: number;
  public img_url!: string;
  public fk_user!: number;
  public status!: boolean;
}

Exercise.init(
  {
    pk_exercise: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    weight: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    repetitions: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    img_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    fk_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    sequelize: db,
    tableName: "exercises",
  }
);

export default Exercise;
