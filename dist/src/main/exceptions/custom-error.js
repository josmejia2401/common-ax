"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomError = void 0;
class CustomError extends Error {
    constructor(message, code, httpStatus, headers) {
        super(message);
        this.name = "CustomError";
        this.message = message;
        this.code = code;
        this.httpStatus = httpStatus;
        this.headers = headers || {};
        this.errors = [];
    }
    addError(error) {
        this.errors.push(error);
    }
    build() {
        const message = this.errors.length > 0 ? this.errors.map((error) => ({ message: error.message })) : this.message;
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
exports.CustomError = CustomError;
//# sourceMappingURL=custom-error.js.map