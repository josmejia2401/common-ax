import { GeneralUtil } from "../../utils/general.utils";
import { RequestEvent } from "../models/request";
import { RequestBase } from "./request.base";
export class RequestFromAWS implements RequestBase<RequestEvent> {
    private event: any;
    private context: any;
    constructor(event: any, context: any) {
        this.event = event;
        this.context = context;
    }
    private getPathFromEvent(event: any): string {
        if (event && event.rawPath) {
            return event.rawPath;
        }
        if (event && event.requestContext && event.requestContext.http && event.requestContext.http.path) {
            return String(event.requestContext.http.path).toLowerCase();
        }
        if (event && event.requestContext && event.requestContext.path) {
            return event.requestContext.path;
        }
        if (event && event.requestContext && event.requestContext.resourcePath) {
            return event.requestContext.resourcePath;
        }
        if (event.resource) {
            return event.resource;
        }
        if (event.requestPath) {
            return event.requestPath;
        }
        if (event.path) {
            return event.path;
        }
        return "";
    }
    private getMethodFromEvent(event: any): string {
        if (event && event.httpMethod) {
            return String(event.httpMethod).toLowerCase();
        }
        if (event && event.requestContext && event.requestContext.httpMethod) {
            return String(event.requestContext.httpMethod).toLowerCase();
        }
        if (event && event.requestContext && event.requestContext.http && event.requestContext.http.method) {
            return String(event.requestContext.http.method).toLowerCase();
        }
        if (event && event.method) {
            return String(event.method).toLowerCase();
        }
        return "";
    }
    /**
     * 
     * @returns express.Request
     */
    build(): RequestEvent {
        return {
            path: this.getPathFromEvent(this.event),
            method: this.getMethodFromEvent(this.event),
            headers: this.event.headers,
            body: GeneralUtil.anyToJson(this.event.body),
            query: GeneralUtil.anyToJson(this.event.queryStringParameters),
            params: GeneralUtil.anyToJson(this.event.pathParameters),
            context: GeneralUtil.anyToJson(this.context)
        }
    }
}