export interface TokenModel {
    help: string;
    header: {
        alg: string;
        typ: string;
        [key: string]: any;
    };
    payload: {
        token_type: string;
        iat: number;
        exp: number;
        aud: string;
        id: string;
        sub: string;
        jti: string;
        name: string;
        admin: boolean,
        iss: string;
        sid: string;
        channel: string;
        [key: string]: any;
    };
    signature: string;
    [key: string]: any;
}