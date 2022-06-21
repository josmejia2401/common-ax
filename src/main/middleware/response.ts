import { ResponseEvent } from "./models/response";
export class ResponseBuild {
    private callback: Function | undefined;
    private value: any;
    private statusCode: number | undefined;
    private headersValue: any;
    constructor(callback?: Function) {
        this.callback = callback;
    }
    send(value: any) {
        this.value = value;
        return this;
    }
    status(statusCode: number) {
        this.statusCode = statusCode;
        return this;
    }
    headers(headersValue: any) {
        this.headersValue = headersValue;
        return this;
    }
    header(headersValue: any) {
        this.headersValue = headersValue;
        return this;
    }
    end(callback?: any) {
        const response: ResponseEvent = {
            statusCode: this.statusCode!,
            headers: this.headersValue,
            body: this.value,
        };
        if (callback) {
            callback(response);
        } else if (this.callback) {
            this.callback(response);
        }
    }
}
