"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenUtil = void 0;
const general_utils_1 = require("./general.utils");
const security_error_1 = require("../exceptions/security-error");
class TokenUtil {
    static getToken(authorization) {
        if (authorization && authorization.indexOf(" ") !== -1 && (authorization.includes("Bearer") || authorization.includes("bearer"))) {
            return authorization.split(" ")[1];
        }
        return authorization;
    }
    static decodeToken(authorization) {
        const token = TokenUtil.getToken(authorization);
        const userBase64 = token.split(".")[1];
        const s = new Buffer(userBase64, 'base64').toString();
        return JSON.parse(s);
    }
    static decodeTokenJwt(token) {
        const values = token.split(".");
        const encodedHelp = values[0];
        const encodedHeader = values[1];
        const encodedPayload = values[2];
        const signature = values[3];
        return {
            help: encodedHelp,
            header: JSON.parse(general_utils_1.GeneralUtil.decode(encodedHeader)),
            payload: JSON.parse(general_utils_1.GeneralUtil.decode(encodedPayload)),
            signature: signature
        };
    }
    static corsHeader(headers, methods = ["GET", "POST", "PUT", "DELETE", "OPTIONS"]) {
        let origin = "*";
        if (headers && headers["origin"]) {
            origin = headers["origin"];
        }
        if (headers && headers["Origin"]) {
            origin = headers["Origin"];
        }
        const headersResponse = {
            "Access-Control-Allow-Origin": origin,
            'Access-Control-Allow-Methods': methods.join(","),
            'Access-Control-Allow-Headers': '*',
        };
        return headersResponse;
    }
    static getMethodFromEvent(event) {
        if (event && event["httpMethod"]) {
            return String(event["httpMethod"]).toUpperCase();
        }
        if (event && event["requestContext"] && event["requestContext"]["httpMethod"]) {
            return String(event["requestContext"]["httpMethod"]).toUpperCase();
        }
        return "";
    }
    static getInfoToken(authorization) {
        const tokenBase = TokenUtil.getToken(authorization);
        return TokenUtil.decodeTokenJwt(tokenBase);
    }
    static isValidToken(authorization) {
        const tokenBase = TokenUtil.getToken(authorization);
        const infoToken = TokenUtil.decodeTokenJwt(tokenBase);
        if (new Date().getTime() > infoToken.payload.exp) {
            throw new security_error_1.SecurityError("The token has expired", "UNAUTHORIZE", 401);
        }
        return true;
    }
}
exports.TokenUtil = TokenUtil;
//# sourceMappingURL=token.utils.js.map