"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("module-alias/register");
const Config_1 = require("@src/Config");
const routesLib_1 = require("./routesLib");
const signup_1 = __importDefault(require("@src/services/auth/signup"));
const authRouter = (app) => {
    const route = routesLib_1.runRouteHandler(Config_1.config);
    app.get('/', route(routesLib_1.ahandler));
    app.post('/signup', route(signup_1.default));
};
exports.default = authRouter;
//# sourceMappingURL=auth.js.map