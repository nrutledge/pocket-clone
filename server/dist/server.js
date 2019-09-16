'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const routes_1 = __importDefault(require("./routes"));
const server = (port) => {
    const app = express_1.default();
    const corsOptions = {
        origin: '*',
        optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
    };
    app.use(cors_1.default(corsOptions));
    app.use(morgan_1.default('dev'));
    app.use(body_parser_1.default.json({ limit: '50mb' }));
    app.use(body_parser_1.default.urlencoded({ extended: false }));
    mongoose_1.default
        .connect(process.env.MONGO_URL, { useNewUrlParser: true })
        // eslint-disable-next-line no-console
        .then(() => console.log('MONGO CONNECTION ACHIEVED'))
        // eslint-disable-next-line no-console
        .catch(console.error);
    routes_1.default(app);
    app.listen(port, () => {
        // eslint-disable-next-line no-console
        console.log(`App is listening on port ${port}.`);
    });
};
exports.default = server;
//# sourceMappingURL=server.js.map