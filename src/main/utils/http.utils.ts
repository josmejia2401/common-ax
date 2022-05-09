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
    queryStringParameters: any;
    pathParameters: any;
    tokenInfo?: TokenModel;
    corsHeaders?: any;
    context?: {
        origin: string;
        host: string;
        xForwardedFor: string;
        remoteAddress: string;
        isAWSLambda: boolean;
    };
};
export interface ResponseEvent {
    url: string;
    method: string;
    body: any;
    headers: any;
    queryStringParameters: any;
    pathParameters: any;
};
export type Callback = (event: RequestEvent) => any | never;
export function buildError(error: any, corsHeaders: any, isAWSLambda: boolean) {
    if (error.name === "CustomError" || error.name === "SecurityError") {
        error.headers = {
            'Content-Type': "application/json",
            ...corsHeaders
        };
    } else {
        error = new CustomError("Internal error", "INTERNAL_ERROR", 500, corsHeaders);
    }
    if (isAWSLambda) {
        return error.build();
    } else {
        return error.buildWithoutLambda();
    }
}
export async function instrumentHttpRequest(event: RequestEvent, callback: any, options: {
    isOptions: boolean,
    method: string,
    isSecured: boolean,
    isAWSLambda: boolean;
    callbackValidation?: Callback
}): Promise<any> {
    const corsHeaders = TokenUtil.corsHeader(event.headers, [options.method, "OPTIONS"]);
    try {
        if (options.isOptions) {
            return {
                statusCode: 200,
                headers: {
                    'Content-Type': "application/json",
                    ...corsHeaders
                },
            };
        }
        const origin: string = event.headers["origin"] || event.headers["Origin"];
        if (GeneralValidation.isEmpty(origin)) {
            ObjectValidation.objectValidate({}, "Origin");
        }
        const host: string = event.headers["host"] || event.headers["Host"];
        if (GeneralValidation.isEmpty(host)) {
            ObjectValidation.objectValidate({}, "host");
        }
        const xForwardedFor: string = event.headers["X-Forwarded-For"] || event.headers["X-forwarded-for"] || "0.0.0.0";
        const remoteAddress: string = event.headers["Remote-address"] || event.headers["Remote-Address"] || "0.0.0.0";
        event.corsHeaders = corsHeaders;
        event.context = {
            host: host,
            origin: origin,
            xForwardedFor: xForwardedFor,
            remoteAddress: remoteAddress,
            isAWSLambda: options.isAWSLambda,
        };
        //Secured
        if (options.isSecured === true) {
            const authorization: string = event.headers["authorization"] || event.headers["Authorization"];
            if (GeneralValidation.isEmpty(authorization)) {
                ObjectValidation.objectValidate({}, "authorization");
            }
            event.tokenInfo = TokenUtil.getInfoToken(authorization);
            TokenUtil.isValidToken(authorization);
        }
        //custom validations
        if (options.callbackValidation) {
            options.callbackValidation(event);
        }
        return callback(event);
    } catch (error) {
        console.log("instrumentHttpRequest", error);
        return buildError(error, corsHeaders, options.isAWSLambda);
    }
}