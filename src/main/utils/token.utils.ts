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
}