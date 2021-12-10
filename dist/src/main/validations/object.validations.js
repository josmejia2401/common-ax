"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjectValidation = void 0;
const custom_error_1 = require("../exceptions/custom-error");
const general_validations_1 = require("../validations/general.validations");
class ObjectValidation {
    static objectValidate(obj, ...fields) {
        if (general_validations_1.GeneralValidation.isEmpty(obj) || general_validations_1.GeneralValidation.isEmpty(fields)) {
            return;
        }
        const keys = Object.keys(obj);
        const error = new custom_error_1.CustomError(``, "NOT_FOUND", 404);
        for (let i = 0; i < fields.length; i++) {
            const field = fields[i];
            if (keys.includes(field) === false) {
                error.addError(new Error(`The field ${field} not found`));
                continue;
            }
            const fieldValue = obj[field] || obj[`${field}`];
            if (fieldValue === undefined || fieldValue === null || fieldValue === "") {
                error.addError(new Error(`The field ${field} not found`));
                continue;
            }
        }
        if (error.errors.length > 0) {
            throw error;
        }
    }
    static objectValidateAsJson(obj, fields = []) {
        if (general_validations_1.GeneralValidation.isEmpty(obj) || general_validations_1.GeneralValidation.isEmpty(fields)) {
            return;
        }
        const currentAsJson = JSON.parse(JSON.stringify(obj));
        for (let i = 0; i < fields.length; i++) {
            const field = fields[i];
            const fieldValue = currentAsJson[field] || currentAsJson[`${field}`];
            if (fieldValue === undefined || fieldValue === null || fieldValue === "") {
                throw new Error(`The field ${field} not found`);
            }
        }
    }
    static isObjectValidate(obj, ...fields) {
        if (general_validations_1.GeneralValidation.isEmpty(obj) || general_validations_1.GeneralValidation.isEmpty(fields)) {
            return true;
        }
        let isValid = true;
        const keys = Object.keys(obj);
        for (let i = 0; i < fields.length; i++) {
            const field = fields[i];
            if (keys.includes(field) === false) {
                isValid = false;
                break;
            }
            const fieldValue = obj[field] || obj[`${field}`];
            if (fieldValue === undefined || fieldValue === null || fieldValue === "") {
                isValid = false;
                break;
            }
        }
        return isValid;
    }
}
exports.ObjectValidation = ObjectValidation;
//# sourceMappingURL=object.validations.js.map