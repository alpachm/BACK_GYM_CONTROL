import { DataTypes, Model } from "sequelize";
import db from "./../config/index";

export interface IDayRoutine {
  pk_day_routine: number;
  fk_day: number;
  fk_routine: number;
}

interface IDayRoutineCreationAttributes {}

class DayRoutine
  extends Model<IDayRoutine, IDayRoutineCreationAttributes>
  implements IDayRoutine
{
  public pk_day_routine!: number;
  public fk_day!: number;
  public fk_routine!: number;
}

DayRoutine.init(
  {
    pk_day_routine: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    fk_day: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fk_routine: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    tableName: "day_routine",
  }
);

export default DayRoutine;