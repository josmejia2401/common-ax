import { GeneralUtil } from "../utils/general.utils";

//import express from "express";
class ExpressToLambdaUtil {
    /**
     * 
     * @param app: express.Express
     * @returns 
     */
    static getRoutesFromApp(app: any): { function: Function; route: any }[] {
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
    static getPathFromEvent(event: any): string {
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
    static getMethodFromEvent(event: any): string {
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
}
class RequestAWS {
    private event: any;
    private context: any;
    constructor(event: any, context: any) {
        this.event = event;
        this.context = context;
    }
    /**
     * 
     * @returns express.Request
     */
    build() {
        return {
            path: ExpressToLambdaUtil.getPathFromEvent(this.event),
            method: ExpressToLambdaUtil.getMethodFromEvent(this.event),
            headers: this.event.headers,
            body: GeneralUtil.anyToJson(this.event.body),
            query: GeneralUtil.anyToJson(this.event.queryStringParameters),
            params: GeneralUtil.anyToJson(this.event.pathParameters),
            contextAWS: GeneralUtil.anyToJson(this.context)
        };
    }
}
class ResponseForAws {
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
        const response: any = {
            statusCode: this.statusCode,
            headers: this.headersValue,
            body: JSON.stringify(this.value),
        };
        if (callback) {
            callback(response);
        } else if (this.callback) {
            this.callback(response);
        }
    }
}
/**
 * 
 * @param app: express.Express
 * @returns 
 */
export function middleware(app: any) {
    return async (event: any, context: any) => {
        return new Promise((resolve, _reject) => {
            try {
                const newEvent = GeneralUtil.anyToJson(event);
                const newContext = GeneralUtil.anyToJson(context);
                const pathEvent = ExpressToLambdaUtil.getPathFromEvent(newEvent);
                const methodEvent = ExpressToLambdaUtil.getMethodFromEvent(newEvent);
                const routesApp = ExpressToLambdaUtil.getRoutesFromApp(app);
                const route = routesApp.filter((p: any) => p.route.path === pathEvent)[0];
                if (route && typeof route.function === 'function' && route.route.methods[methodEvent]) {
                    const req = new RequestAWS(newEvent, newContext);
                    const response = new ResponseForAws((data: any) => resolve(data));
                    route.function.call(undefined, req.build(), response);
                } else {
                    throw new Error('Unsupported function');
                }
            } catch (error: any) {
                const response = new ResponseForAws((data: any) => resolve(data));
                response.send({ code: "NOT_IMPLEMENTED", message: error.message });
                response.status(501);
                response.header({
                    "Content-Type": "application/json"
                });
                response.end();
            }
        });
    }
}