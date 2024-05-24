import { DataTypes, Model, Optional } from "sequelize";
import db from "./../config/index";

export interface IDay {
  pk_day: number;
  day: string;
  abbreviation: string;
}

class Day extends Model<IDay> implements IDay {
  public pk_day!: number;
  public day!: string;
  public abbreviation!: string;
}

Day.init(
  {
    pk_day: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
    },
    day: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    abbreviation: {
        type: DataTypes.STRING,
        allowNull: false
    }
  },
  {
    sequelize: db,
    tableName: "days",
  }
);

export default Day;
