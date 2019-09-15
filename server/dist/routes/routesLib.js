"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Either_1 = require("fp-ts/lib/Either");
const pipeable_1 = require("fp-ts/lib/pipeable");
const TaskEither_1 = require("fp-ts/lib/TaskEither");
const function_1 = require("fp-ts/lib/function");
// TODO: Remove later (leaving for reference purposes)
exports.ahandler = () => new Promise(resolve => {
    return resolve([200, {}]);
});
// TODO: Curry error code for auth middleware
const getHandlerResult = (handler, config, req, res) => TaskEither_1.tryCatch(() => handler(config, req, res), (err) => {
    return [500, { error: err.message }];
});
const eitherToResponseTuple = (either) => pipeable_1.pipe(either, Either_1.fold(function_1.identity, function_1.identity));
const sendTupleResponse = (res) => ([n, a]) => res.status(n).send(a);
exports.runRouteHandler = (config) => (handler) => (req, res) => {
    getHandlerResult(handler, config, req, res)()
        .then(eitherToResponseTuple)
        .then(sendTupleResponse(res));
};
//# sourceMappingURL=routesLib.js.map