import { CustomError } from "../exceptions/custom-error";
import { GeneralValidation } from "../validations/general.validations";
export class ObjectValidation {

    static objectValidate(obj: any, ...fields: any[]) {
        if (GeneralValidation.isEmpty(obj) || GeneralValidation.isEmpty(fields)) {
            return;
        }
        const keys = Object.keys(obj);
        const error = new CustomError(``, "NOT_FOUND", 404);
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

    static objectValidateAsJson(obj: any, fields: any[] = []) {
        if (GeneralValidation.isEmpty(obj) || GeneralValidation.isEmpty(fields)) {
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

    static isObjectValidate(obj: any, ...fields: any[]) {
        if (GeneralValidation.isEmpty(obj) || GeneralValidation.isEmpty(fields)) {
            return true;
        }
        let isValid: boolean = true;
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
