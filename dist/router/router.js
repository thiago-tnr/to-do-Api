"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const middleware_1 = require("../middlewares/middleware");
const ApiController = __importStar(require("../controllers/ApiController"));
const UserControlle = __importStar(require("../controllers/UserControllers"));
exports.router = (0, express_1.Router)();
const auth = middleware_1.middlewareAuth.private;
exports.router.post('/register', UserControlle.register);
exports.router.post('/login', UserControlle.login);
exports.router.get('/tasks', auth, ApiController.alltasks);
exports.router.get('/task/:id', auth, ApiController.getone);
exports.router.post('/newtask', auth, ApiController.newTask);
exports.router.put('/maketask/:id', auth, ApiController.maketask);
exports.router.delete('/delete/:id', auth, ApiController.deleteTask);
