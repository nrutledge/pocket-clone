"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./server"));
const port = parseInt(process.env.PORT || '5000', 10);
server_1.default(port);
//# sourceMappingURL=serverRun.js.map