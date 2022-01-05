"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.maketask = exports.newTask = exports.getone = exports.alltasks = void 0;
const BaseApi_1 = require("../models/BaseApi");
const alltasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const list = yield BaseApi_1.ToDo.findAll();
    res.json({ list });
});
exports.alltasks = alltasks;
const getone = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let id = req.params.id;
    const oneTask = yield BaseApi_1.ToDo.findByPk(id);
    if (oneTask) {
        res.status(200).json(oneTask);
    }
    else {
        res.status(404).json("Task Not Found");
    }
});
exports.getone = getone;
const newTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body.title) {
        let task = yield BaseApi_1.ToDo.create({
            title: req.body.title,
            done: req.body.done ? true : false
        });
        res.status(201).json({ message: task });
    }
});
exports.newTask = newTask;
const maketask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let id = req.params.id;
    const findtask = yield BaseApi_1.ToDo.findByPk(id);
    if (findtask) {
        if (req.body.title) {
            findtask.title += ' ' + req.body.title;
        }
        if (req.body.done) {
            switch (req.body.done.toLowerCase()) {
                case 1:
                case "1":
                case true:
                case "true":
                    findtask.done = true;
                    break;
                case 0:
                case "0":
                case false:
                case "false":
                    findtask.done = false;
                    break;
            }
            yield findtask.save();
        }
        res.status(200).json(findtask);
    }
    res.status(404).json("Task not found, make a GET request and check existing tasks");
});
exports.maketask = maketask;
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let id = req.params.id;
    const remove = yield BaseApi_1.ToDo.destroy({ where: { id } });
});
exports.deleteTask = deleteTask;
