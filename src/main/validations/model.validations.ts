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
    validate(data: any) {
        const out: any = {};
        if (Array.isArray(data) === false) {
            const keys = Object.keys(data);
            const modelKeys = Object.keys(this.schema);
            const error = new CustomError(``, "NOT_FOUND", 404);
            for (let j = 0; j < modelKeys.length; j++) {
                const modelKey = modelKeys[j];
                const model: Attribute = this.schema[modelKey];
                if (model.requiered === true && keys.includes(modelKey) === false) {
                    error.addError(new Error(`The field ${modelKey} not found`));
                    continue;
                }
                const fieldValue = data[modelKey] || data[`${modelKey}`];
                if (model.requiered === true  && (fieldValue === undefined || fieldValue === null || fieldValue === "")) {
                    error.addError(new Error(`The field ${modelKey} not found`));
                    continue;
                }
                out[modelKey] = fieldValue;
            }
            if (error.errors.length > 0) {
                throw error;
            }
        } else {
            const modelKeys = Object.keys(this.schema);
            for (let i = 0; i < modelKeys.length; i++) {
                const keys = Object.keys(data);
                const error = new CustomError(``, "NOT_FOUND", 404);
                for (let j = 0; j < modelKeys.length; j++) {
                    const modelKey = modelKeys[j];
                    const model: Attribute = this.schema[modelKey];
                    if (model.requiered === true && keys.includes(modelKey) === false) {
                        error.addError(new Error(`The field ${modelKey} not found`));
                        continue;
                    }
                    const fieldValue = data[modelKey] || data[`${modelKey}`];
                    if (fieldValue === undefined || fieldValue === null || fieldValue === "") {
                        error.addError(new Error(`The field ${modelKey} not found`));
                        continue;
                    }
                    out[modelKey] = fieldValue;
                }
                if (error.errors.length > 0) {
                    throw error;
                }
            }
        }
        return out;
    }
}