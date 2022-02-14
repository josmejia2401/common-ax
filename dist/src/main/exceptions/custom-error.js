"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomError = void 0;
class CustomError extends Error {
    constructor(message, code, httpStatus) {
        super(message);
        this.errors = [];
        this.name = "CustomError";
        this.message = message;
        this.code = code;
        this.httpStatus = httpStatus;
    }
    addError(error) {
        this.errors.push(error);
    }
    build() {
        if (this.errors.length > 0) {
            const errors1 = [];
            this.errors.forEach((error) => errors1.push({ message: error.message }));
            return {
                statusCode: this.httpStatus,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    "code": this.code,
                    "message": errors1
                })
            };
        }
        return {
            statusCode: this.httpStatus,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                "code": this.code,
                "message": this.message
            })
        };
    }
    buildWithoutLambda() {
        if (this.errors.length > 0) {
            const errors1 = [];
            this.errors.forEach((error) => errors1.push({ message: error.message }));
            return {
                "code": this.code,
                "message": errors1
            };
        }
        return {
            "code": this.code,
            "message": this.message
        };
    }
}
exports.CustomError = CustomError;
//# sourceMappingURL=custom-error.js.map