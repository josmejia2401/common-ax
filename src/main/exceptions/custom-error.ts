export class CustomError extends Error {
    public code: string | undefined;
    public message: string;
    public httpStatus: number | undefined;
    public errors: any[] = [];
    public headers: any;

    constructor(message: string, code?: string, httpStatus?: number, headers?: any) {
        super(message);
        this.name = "CustomError";
        this.message = message;
        this.code = code;
        this.httpStatus = httpStatus;
        this.headers = headers || {};
    }

    addError(error: Error) {
        this.errors.push(error);
    }

    build() {
        if (this.errors.length > 0) {
            const errors1: any[] = [];
            this.errors.forEach((error: Error) => errors1.push({ message: error.message }));
            return {
                statusCode: this.httpStatus,
                headers: {
                    "Content-Type": "application/json",
                    ...this.headers
                },
                body: JSON.stringify({
                    "code": this.code,
                    "message": errors1
                })
            };
        }
        return {
            statusCode: this.httpStatus,
            headers: {
                "Content-Type": "application/json",
                ...this.headers
            },
            body: JSON.stringify({
                "code": this.code,
                "message": this.message
            })
        };
    }

    buildWithoutLambda() {
        if (this.errors.length > 0) {
            const errors1: any[] = [];
            this.errors.forEach((error: Error) => errors1.push({ message: error.message }));
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