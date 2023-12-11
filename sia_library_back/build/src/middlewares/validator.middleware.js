"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSchema = void 0;
const validateSchema = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body);
        next();
    }
    catch (error) {
        return res
            .status(400)
            .json(error.errors.map((error) => error.message));
    }
};
exports.validateSchema = validateSchema;
