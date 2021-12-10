"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeneralValidation = void 0;
class GeneralValidation {
    static isEmpty(value) {
        if (value === undefined || value === null || value === "") {
            return true;
        }
        if (Array.isArray(value) === true) {
            return value.length === 0;
        }
        return false;
    }
}
exports.GeneralValidation = GeneralValidation;
//# sourceMappingURL=general.validations.js.map