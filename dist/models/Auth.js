"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_1 = require("sequelize");
const mysql_1 = require("../instances/mysql");
exports.User = mysql_1.connection.define('auth', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: sequelize_1.DataTypes.INTEGER
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        unique: true
    },
    password: {
        type: sequelize_1.DataTypes.STRING
    }
}, {
    tableName: "auth",
    timestamps: false
});
