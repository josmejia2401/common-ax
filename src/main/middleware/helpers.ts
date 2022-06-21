import { CustomError } from "../exceptions/custom-error";
import { RequestEvent } from "./models/request";
import { ResponseEvent } from "./models/response";
import { RequestFromAWS } from "./request/request-aws";

export function buildErrorForAWS(error: any): ResponseEvent {
    if (error.name === "CustomError" || error.name === "SecurityError") {
        error.headers = {
            'Content-Type': "application/json",
        };
    } else {
        error = new CustomError("Internal error", "INTERNAL_ERROR", 500);
    }
    return error.build();
}

export function buildRequestFromAws(event: any, context: any): RequestEvent {
    return new RequestFromAWS(event, context).build();
}

export function getPathFromEvent(event: any): string {
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

export function getMethodFromEvent(event: any): string {
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

export function getRoutesFromApp(app: any): { function: Function; route: any }[] {
    const routes: any = [];
    app._router.stack.forEach((middleware: any) => {
        if (middleware.route) {
            const r = {
                function: middleware.handle,
                route: middleware.route,
            };
            routes.push(r);
        } else if (middleware.name === 'router') {
            middleware.handle.stack.forEach((handler: any) => {
                if (handler.route) {
                    const r = {
                        function: handler.handle,
                        route: handler.route,
                    };
                    routes.push(r);
                }
            });
        }
    });
    return routes;
}