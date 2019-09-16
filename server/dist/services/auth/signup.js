"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("util");
const crypto_1 = require("crypto");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("module-alias/register");
const User_1 = __importDefault(require("../../Model/User"));
const validateBody_1 = __importDefault(require("../../util/validateBody"));
const pbkdf2Promise = util_1.promisify(crypto_1.pbkdf2);
// TODO: Consider removing response from the handler type as it should not be necessary
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const test = (config, req, ignored) => __awaiter(this, void 0, void 0, function* () {
    validateBody_1.default(['name', 'email', 'password'], req.body);
    const { name, email, password } = req.body;
    yield config.util.errorIfExists(User_1.default, { email: req.body.email });
    const salt = crypto_1.randomBytes(128).toString('base64');
    const iterations = 1000;
    const passwordBuffer = yield pbkdf2Promise(password, salt, iterations, 64, 'sha512');
    const hashedPass = passwordBuffer.toString('hex');
    yield new User_1.default({ name, email, password: hashedPass }).save();
    const token = yield jsonwebtoken_1.default.sign({ email }, config.cryptoKey, { expiresIn: '2 days' });
    return [200, { result: { token } }];
});
exports.default = test;
//# sourceMappingURL=signup.js.map