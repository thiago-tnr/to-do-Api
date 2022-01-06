"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const router_1 = require("./router/router");
dotenv_1.default.config();
const server = (0, express_1.default)();
server.use(express_1.default.json());
server.use(router_1.router);
server.use("/ping", (req, res) => {
    res.status(200).json({ message: "pong" });
});
server.use((req, res) => {
    res.status(404).json({ message: "Endpoint not found" });
});
server.listen(process.env.PORT || 4000);
