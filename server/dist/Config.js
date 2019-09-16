"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("module-alias/register");
const User_1 = __importDefault(require("./Model/User"));
const errorIfExists_1 = __importDefault(require("./util/errorIfExists"));
exports.config = {
    models: {
        User: User_1.default
    },
    util: {
        errorIfExists: errorIfExists_1.default
    },
    cryptoKey: process.env.CRYPTO_KEY || 'a2k3nr23iuhr32iub2jkbf23iu12io'
};
//# sourceMappingURL=Config.js.map