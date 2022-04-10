import { CustomError } from "../exceptions/custom-error";

export class Attribute {
    requiered: boolean = false;
}
export interface Schema {
    [key: string]: Attribute;
}
export class ModelValidator {
    private schema: Schema;
    constructor(schema: Schema) {
        this.schema = schema;
    }
    validate(data: any, options?: { unknown: boolean }) {
        const out: any = {};
        if (Array.isArray(data) === false) {
            const keys = Object.keys(data);
            const schemaKeys = Object.keys(this.schema);
            const error = new CustomError(``, "NOT_FOUND", 404);
            if (options?.unknown) {
                const exists = keys.filter(p => schemaKeys.includes(p) === false);
                if (exists.length > 0) {
                    error.addError(new Error(`The field ${exists.join(",")} not found`));
                    throw error;
                }
            }
            for (let j = 0; j < schemaKeys.length; j++) {
                const schemaKey = schemaKeys[j];
                const model: Attribute = this.schema[schemaKey];
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
            const schemaKeys = Object.keys(this.schema);
            for (let i = 0; i < schemaKeys.length; i++) {
                const keys = Object.keys(data);
                const error = new CustomError(``, "NOT_FOUND", 404);
                if (options?.unknown) {
                    const exists = keys.filter(p => schemaKeys.includes(p) === false);
                    if (exists.length > 0) {
                        error.addError(new Error(`The field ${exists.join(",")} not found`));
                        throw error;
                    }
                }
                for (let j = 0; j < schemaKeys.length; j++) {
                    const schemaKey = schemaKeys[j];
                    const model: Attribute = this.schema[schemaKey];
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