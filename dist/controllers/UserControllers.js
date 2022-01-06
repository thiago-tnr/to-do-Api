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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Auth_1 = require("../models/Auth");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body.email && req.body.password) {
        let { email, password } = req.body;
        let hasUser = yield Auth_1.User.findOne({ where: { email } });
        if (!hasUser) {
            let newUser = yield Auth_1.User.create({ email, password });
            const token = jsonwebtoken_1.default.sign({ id: newUser.id, email: newUser.email }, process.env.JWT_SECRET_KEY, { expiresIn: 60 });
            res.status(201);
            res.json({ id: newUser.id, token });
        }
        else {
            res.json({ error: "Email already exists" });
        }
    }
    else {
        res.json({ error: "email and/or passowrd not send" });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body.email && req.body.password) {
        try {
            let email = req.body.email;
            let password = req.body.password;
            let findEmail = yield Auth_1.User.findOne({ where: { email } });
            let user = yield Auth_1.User.findOne({
                where: { email, password }
            });
            if (user) {
                const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET_KEY, { expiresIn: 60 });
                res.json({ status: true, token });
                return;
            }
            if (!findEmail) {
                res.status(404).json("User not found");
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    res.status(406).json("user or password incorrect");
});
exports.login = login;
