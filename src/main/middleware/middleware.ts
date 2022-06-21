import { GeneralUtil } from "../utils/general.utils";
import { getMethodFromEvent, getPathFromEvent, getRoutesFromApp } from "./helpers";
import { RequestFromAWS } from "./request/request-aws";
import { ResponseBuild } from "./response";

export function middleware(app: any) {
    return async (event: any, context: any) => {
        return new Promise((resolve, _reject) => {
            try {
                const newEvent = GeneralUtil.anyToJson(event);
                const newContext = GeneralUtil.anyToJson(context);
                const pathEvent = getPathFromEvent(newEvent);
                const methodEvent = getMethodFromEvent(newEvent);
                const routesApp = getRoutesFromApp(app);
                const route = routesApp.filter((p: any) => p.route.path === pathEvent)[0];
                if (route && typeof route.function === 'function' && route.route.methods[methodEvent]) {
                    const req = new RequestFromAWS(newEvent, newContext);
                    const response = new ResponseBuild((data: any) => resolve(data));
                    route.function.call(undefined, req.build(), response);
                } else {
                    throw new Error('Unsupported function');
                }
            } catch (error: any) {
                const response = new ResponseBuild((data: any) => resolve(data));
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