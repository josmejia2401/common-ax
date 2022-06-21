import { TokenModel } from "../../security/security.models";
export interface RequestEvent {
    path: string;
    method: string;
    headers: any;
    query: any;
    params: any;
    body?: any;
    context?: any;
    other?: {
        tokenInfo?: TokenModel;
        corsHeaders?: any;
        source?: {
            origin: string;
            host: string;
            remoteAddress: string;
        };
    };
    [key: string]: any;
}