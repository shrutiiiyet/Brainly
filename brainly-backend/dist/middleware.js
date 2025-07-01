"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMiddleWare = void 0;
const config_1 = require("./config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UserMiddleWare = (req, res, next) => {
    const header = req.headers["authorization"];
    const decodedUser = jsonwebtoken_1.default.verify(header, config_1.JWT_SECRET);
    if (decodedUser) {
        if (typeof decodedUser === 'string') {
            res.status(403).json({
                message: "You're not logged in"
            });
            return;
        }
        req.userId = decodedUser.id;
        next();
    }
    else {
        res.status(403).json({
            message: "You're not logged in"
        });
    }
};
exports.UserMiddleWare = UserMiddleWare;
