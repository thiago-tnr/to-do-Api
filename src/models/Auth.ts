import { Model, DataTypes } from "sequelize";
import {connection} from "../instances/mysql";

export interface Userinterface extends Model{
    id: number;
    email: string;
    password: string;
}

export const User = connection.define<Userinterface>('auth',{
    id:{
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    email: {
        type: DataTypes.STRING,
        unique: true
    },
    password:{
        type: DataTypes.STRING
    }
},{
    tableName: "auth",
    timestamps: false
})