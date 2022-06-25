import { TokenModel } from "../security/security.models";
import { GeneralUtil } from "./general.util";
import { SecurityError } from "../exceptions/security-error";

export class TokenUtil {

    static getToken(authorization: string) {
        if (authorization && authorization.indexOf(" ") !== -1 && (authorization.includes("Bearer") || authorization.includes("bearer"))) {
            return authorization.split(" ")[1];
        }
        return authorization;
    }

    static decodeToken(authorization: string) {
        const token = TokenUtil.getToken(authorization);
        const userBase64 = token.split(".")[1];
        const s = new Buffer(userBase64, 'base64').toString();
        return JSON.parse(s);
    }

    static decodeTokenJwt(token: string): TokenModel {
        const values = token.split(".");
        const encodedHelp = values[0] as string;
        const encodedHeader = values[1];
        const encodedPayload = values[2];
        const signature = values[3] as string;
        return {
            help: encodedHelp,
            header: JSON.parse(GeneralUtil.decode(encodedHeader)),
            payload: JSON.parse(GeneralUtil.decode(encodedPayload)),
            signature: signature
        };
    }

    static corsHeader(headers: any, methods: string[] = ["GET", "POST", "PUT", "DELETE", "OPTIONS"]) {
        let origin: string = "*";
        if (headers && headers["origin"]) {
            origin = headers["origin"];
        }
        if (headers && headers["Origin"]) {
            origin = headers["Origin"];
        }
        const headersResponse: any = {
            "Access-Control-Allow-Origin": origin,
            'Access-Control-Allow-Methods': methods.join(","),
            'Access-Control-Allow-Headers': '*',
        };
        return headersResponse;
    }

    static getMethodFromEvent(event: any) {
        if (event && event["httpMethod"]) {
            return String(event["httpMethod"]).toUpperCase();
        }
        if (event && event["requestContext"] && event["requestContext"]["httpMethod"]) {
            return String(event["requestContext"]["httpMethod"]).toUpperCase();
        }
        return "";
    }

    static getInfoToken(authorization: string): TokenModel {
        const tokenBase = TokenUtil.getToken(authorization);
        return TokenUtil.decodeTokenJwt(tokenBase);
    }

    static isValidToken(authorization: string): boolean | never {
        const tokenBase = TokenUtil.getToken(authorization);
        const infoToken = TokenUtil.decodeTokenJwt(tokenBase);
        if (new Date().getTime() > infoToken.payload.exp) {
            throw new SecurityError("The token has expired", "UNAUTHORIZE", 401);
        }
        return true;
    }
}