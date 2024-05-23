import db from "./../config/index";
import {DataTypes, Model, Optional} from "sequelize";

export interface IUser {
    pk_user: number;
    name: string;
    last_name: string;
    email: string;
    password: string;
    img_url: string;
    passwordChangeAt: Date
    status: boolean;
}

interface IUserCreationAttributes extends Optional<IUser, "pk_user" | "img_url" | "passwordChangeAt" | "status">{};

class User extends Model<IUser, IUserCreationAttributes> implements IUser{
    public pk_user!: number;
    public name!: string;
    public last_name!: string;
    public email!: string;
    public password!: string;
    public img_url!: string;
    public passwordChangeAt!: Date;
    public status!: boolean;
}



User.init({
    pk_user: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    img_url: {
        type: DataTypes.STRING,
        allowNull: true
    },
    passwordChangeAt: {
        type: DataTypes.DATE,
        allowNull: true
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    sequelize: db,
    tableName: "users"
})

export default User;