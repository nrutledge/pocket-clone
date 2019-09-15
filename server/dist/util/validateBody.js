"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (fields, reqBody) => {
    fields.forEach((field) => {
        if (!reqBody[field]) {
            throw new Error(`${field} not provided`);
        }
    });
};
//# sourceMappingURL=validateBody.js.map