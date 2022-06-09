import { TokenModel } from "../security/security.models";
import { TokenUtil } from "./token.utils";
import { GeneralValidation } from "../validations/general.validations";
import { ObjectValidation } from "../validations/object.validations";
import { CustomError } from "../exceptions/custom-error";
export interface RequestEvent {
    url: string;
    method: string;
    body: any;
    headers: any;
    query: any;
    params: any;
    tokenInfo?: TokenModel;
    corsHeaders?: any;
    context?: {
        origin: string;
        host: string;
        remoteAddress: string;
    };
};
export interface ResponseEvent {
    statusCode: number;
    status: number;
    body: any | undefined;
    headers: any;
};
export type Callback = (event: RequestEvent) => ResponseEvent | never;
export function buildError(error: any, corsHeaders: any) {
    if (error.name === "CustomError" || error.name === "SecurityError") {
        error.headers = {
            'Content-Type': "application/json",
            ...corsHeaders
        };
    } else {
        error = new CustomError("Internal error", "INTERNAL_ERROR", 500, corsHeaders);
    }
    return error.build();
}
export async function instrumentHttp(event: RequestEvent, callback: Callback, options: {
    isOptions: boolean;
    method: string;
    isSecured: boolean;
    callbackValidation?: Callback;
}): Promise<ResponseEvent> {
    const corsHeaders = TokenUtil.corsHeader(event.headers, [options.method, "OPTIONS"]);
    try {
        if (options.isOptions) {
            return {
                statusCode: 200,
                status: 200,
                headers: {
                    'Content-Type': "application/json",
                    ...corsHeaders
                },
            } as ResponseEvent;
        }
        const origin: string = event.headers["origin"] || event.headers["Origin"];
        if (GeneralValidation.isEmpty(origin)) {
            ObjectValidation.objectValidate({}, "Origin");
        }
        const host: string = event.headers["host"] || event.headers["Host"];
        if (GeneralValidation.isEmpty(host)) {
            ObjectValidation.objectValidate({}, "host");
        }
        const remoteAddress: string = event.headers["X-Forwarded-For"] || event.headers["X-forwarded-for"] || event.headers["Remote-address"] || event.headers["Remote-Address"];
        event.corsHeaders = corsHeaders;
        event.context = {
            host: host,
            origin: origin,
            remoteAddress: remoteAddress,
        };
        //Secured
        if (options.isSecured === true) {
            const authorization: string = event.headers["authorization"] || event.headers["Authorization"];
            if (GeneralValidation.isEmpty(authorization)) {
                ObjectValidation.objectValidate({}, "authorization");
            }
            TokenUtil.isValidToken(authorization);
            event.tokenInfo = TokenUtil.getInfoToken(authorization);
        }
        //custom validations
        if (options.callbackValidation) {
            options.callbackValidation(event);
        }
        return callback(event);
    } catch (error) {
        return buildError(error, corsHeaders);
    }
}
