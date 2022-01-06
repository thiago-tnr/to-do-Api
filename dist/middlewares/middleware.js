"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.middlewareAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.middlewareAuth = {
    private: (req, res, next) => {
        let sucess = false;
        let email = req.body.email;
        if (req.headers.authorization) {
            const [authJwt, token] = req.headers.authorization.split(' ');
            try {
                if (authJwt === "Bearer") {
                    jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET_KEY);
                }
                sucess = true;
            }
            catch (error) {
                console.log(error);
            }
        }
        if (sucess) {
            next();
        }
        else {
            res.status(401).json("Unauthorized");
        }
    }
};
