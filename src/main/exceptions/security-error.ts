import { CustomError } from "./custom-error";
export class SecurityError extends CustomError {
    constructor(message: string, code?: string, httpStatus?: number, headers?: any) {
        super(message, code, httpStatus, headers);
        this.name = "SecurityError";
    }
}