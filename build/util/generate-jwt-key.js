"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getJwtKey = void 0;
exports.getJwtKey = Buffer.from(process.env.JWT_KEY, 'base64').toString('utf-8');
