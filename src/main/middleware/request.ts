import { TokenUtil } from "../utils/token.util";
import { GeneralValidation } from "../validations/general.validation";
import { ObjectValidation } from "../validations/object.validation";
import { RequestEvent } from "./models/request";
import { requestApi } from "../http-client";
import { SecurityError } from "../exceptions/security-error";
export const validateRequest = (request: RequestEvent): RequestEvent => {
    const corsHeaders = TokenUtil.corsHeader(request.headers, [request.method, "OPTIONS"]);
    const origin: string = request.headers["origin"] || request.headers["Origin"];
    if (GeneralValidation.isEmpty(origin)) {
        ObjectValidation.objectValidate({}, "Origin");
    }
    const host: string = request.headers["host"] || request.headers["Host"];
    const remoteAddress: string = request.headers["X-Forwarded-For"] || request.headers["X-forwarded-for"] || request.headers["Remote-address"] || request.headers["Remote-Address"];
    request.other = {};
    request.other.corsHeaders = corsHeaders;
    request.other.source = {
        host: host,
        origin: origin,
        remoteAddress: remoteAddress,
    };
    const authorization: string = request.headers["authorization"] || request.headers["Authorization"];
    if (GeneralValidation.isEmpty(authorization)) {
        ObjectValidation.objectValidate({}, "authorization");
    }
    TokenUtil.isValidToken(authorization);
    request.other.tokenInfo = TokenUtil.getInfoToken(authorization);
    return request;
}

export const validateRequestAll = async (request: RequestEvent, options: {
    host: string;
    path: string;
    method: string;
    headers?: any,
    body?: any;
}): Promise<RequestEvent> => {
    const corsHeaders = TokenUtil.corsHeader(request.headers, [request.method, "OPTIONS"]);
    const origin: string = request.headers["origin"] || request.headers["Origin"];
    if (GeneralValidation.isEmpty(origin)) {
        ObjectValidation.objectValidate({}, "Origin");
    }
    const host: string = request.headers["host"] || request.headers["Host"];
    const remoteAddress: string = request.headers["X-Forwarded-For"] || request.headers["X-forwarded-for"] || request.headers["Remote-address"] || request.headers["Remote-Address"];
    request.other = {};
    request.other.corsHeaders = corsHeaders;
    request.other.source = {
        host: host,
        origin: origin,
        remoteAddress: remoteAddress,
    };
    const authorization: string = request.headers["authorization"] || request.headers["Authorization"];
    if (GeneralValidation.isEmpty(authorization)) {
        ObjectValidation.objectValidate({}, "authorization");
    }
    TokenUtil.isValidToken(authorization);
    request.other.tokenInfo = TokenUtil.getInfoToken(authorization);
    const response: any = await requestApi({
        headers: {
            Authorization: authorization,
            Origin: origin,
            ...options.headers,
        },
        host: options.host,
        method: options.method || "POST",
        path: options.path,
    }, options.body);
    if (response.isSuccessful) {
        return request;
    } else {
        throw new SecurityError("The token has expired or not exist", "UNAUTHORIZE", 401);
    }
}

