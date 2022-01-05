"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToDo = void 0;
const sequelize_1 = require("sequelize");
const mysql_1 = require("../instances/mysql");
exports.ToDo = mysql_1.connection.define('todo', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: sequelize_1.DataTypes.INTEGER
    },
    title: {
        type: sequelize_1.DataTypes.STRING
    },
    done: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    tableName: "todo",
    timestamps: false
});
