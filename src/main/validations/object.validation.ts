import { CustomError } from "../exceptions/custom-error";
import { GeneralValidation } from "./general.validation";

export class Attribute {
    requiered: boolean = false;
}
export interface Schema {
    [key: string]: Attribute;
}

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


    static objectValidateWithModel(obj: any, model: any): any {
        if (GeneralValidation.isEmpty(obj)) {
            return;
        }
        if (Array.isArray(obj)) {
            return ObjectValidation.objectValidateWithArray(obj, model);
        }
        const keys = Object.keys(obj);
        const fields = Object.keys(model);
        const out: any = {};
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
            out[field] = fieldValue;
        }
        if (error.errors.length > 0) {
            throw error;
        }
    }

    static objectValidateWithArray(objs: any[], model: any): any {
        if (GeneralValidation.isEmpty(objs)) {
            return;
        }
        const error = new CustomError(``, "NOT_FOUND", 404);
        for (let i = 0; i < objs.length; i++) {
            const obj = objs[i];
            const keys = Object.keys(obj);
            const fields = Object.keys(model);
            const out: any = {};
            for (let j = 0; j < fields.length; j++) {
                const field = fields[j];
                if (keys.includes(field) === false) {
                    error.addError(new Error(`The field ${field} not found`));
                    continue;
                }
                const fieldValue = obj[field] || obj[`${field}`];
                if (fieldValue === undefined || fieldValue === null || fieldValue === "") {
                    error.addError(new Error(`The field ${field} not found`));
                    continue;
                }
                out[field] = fieldValue;
            }
        }

        if (error.errors.length > 0) {
            throw error;
        }
    }

    static validateSchema(data: any, schema: Schema, options?: { unknown: boolean }) {
        const out: any = {};
        if (Array.isArray(data) === false) {
            const keys = Object.keys(data);
            const schemaKeys = Object.keys(schema);
            const error = new CustomError(``, "NOT_FOUND", 404);
            if (!options?.unknown) {
                const exists = keys.filter(p => schemaKeys.includes(p) === false);
                if (exists.length > 0) {
                    error.addError(new Error(`The field ${exists.join(",")} not found`));
                    throw error;
                }
            }
            for (let j = 0; j < schemaKeys.length; j++) {
                const schemaKey = schemaKeys[j];
                const model: Attribute = schema[schemaKey];
                if (model.requiered === true && keys.includes(schemaKey) === false) {
                    error.addError(new Error(`The field ${schemaKey} not found`));
                    continue;
                }
                const fieldValue = data[schemaKey] || data[`${schemaKey}`];
                if (model.requiered === true && (fieldValue === undefined || fieldValue === null || fieldValue === "")) {
                    error.addError(new Error(`The field ${schemaKey} not found`));
                    continue;
                }
                out[schemaKey] = fieldValue;
            }
            if (error.errors.length > 0) {
                throw error;
            }
        } else {
            const schemaKeys = Object.keys(schema);
            for (let i = 0; i < schemaKeys.length; i++) {
                const keys = Object.keys(data);
                const error = new CustomError(``, "NOT_FOUND", 404);
                if (!options?.unknown) {
                    const exists = keys.filter(p => schemaKeys.includes(p) === false);
                    if (exists.length > 0) {
                        error.addError(new Error(`The field ${exists.join(",")} not found`));
                        throw error;
                    }
                }
                for (let j = 0; j < schemaKeys.length; j++) {
                    const schemaKey = schemaKeys[j];
                    const model: Attribute = schema[schemaKey];
                    if (model.requiered === true && keys.includes(schemaKey) === false) {
                        error.addError(new Error(`The field ${schemaKey} not found`));
                        continue;
                    }
                    const fieldValue = data[schemaKey] || data[`${schemaKey}`];
                    if (fieldValue === undefined || fieldValue === null || fieldValue === "") {
                        error.addError(new Error(`The field ${schemaKey} not found`));
                        continue;
                    }
                    out[schemaKey] = fieldValue;
                }
                if (error.errors.length > 0) {
                    throw error;
                }
            }
        }
        return out;
    }
}
