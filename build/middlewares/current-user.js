"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.currentUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generate_jwt_key_1 = require("../util/generate-jwt-key");
const currentUser = (req, res, next) => {
    var _a;
    if (!((_a = req.session) === null || _a === void 0 ? void 0 : _a.token)) {
        return next();
    }
    try {
        const payload = jsonwebtoken_1.default.verify(req.session.token, (0, generate_jwt_key_1.getJwtKey)());
        req.currentUser = payload;
    }
    catch (err) { }
    next();
};
exports.currentUser = currentUser;
