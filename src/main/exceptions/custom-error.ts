import { ResponseEvent } from "../middleware/models/response";

export class CustomError extends Error {
    public code: string | undefined;
    public message: string;
    public httpStatus: number | undefined;
    public errors: any[];
    public headers: any;
    constructor(message: string, code?: string, httpStatus?: number, headers?: any) {
        super(message);
        this.name = "CustomError";
        this.message = message;
        this.code = code;
        this.httpStatus = httpStatus;
        this.headers = headers || {};
        this.errors = [];
    }
    addError(error: Error) {
        this.errors.push(error);
    }
    build(): ResponseEvent {
        const message = this.errors.length > 0 ? this.errors.map((error: Error) => ({ message: error.message })) : this.message;
        return {
            statusCode: this.httpStatus || 500,
            status: this.httpStatus,
            headers: {
                "Content-Type": "application/json",
                ...this.headers
            },
            body: {
                "code": this.code,
                "message": message
            }
        };
    }
}