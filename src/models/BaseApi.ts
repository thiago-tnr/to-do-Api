import { Model, DataTypes } from "sequelize";
import { connection } from "../instances/mysql";

export interface ToDoApi extends Model{
    id: number;
    title:string;
    done:boolean;
}

export const ToDo = connection.define<ToDoApi>('todo',{
    id:{
        primaryKey: true,
        autoIncrement:true,
        type: DataTypes.INTEGER
    },
    title:{
        type: DataTypes.STRING
    },
    done:{
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
},{
    tableName:"todo",
    timestamps: false
})

