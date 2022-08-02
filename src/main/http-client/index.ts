//const https = require('https');
import * as https from "https";
import { GeneralUtil } from "../utils/general.util";

export function requestApi(options: {
    host: string;
    path: string;
    method: string;
    headers: any,
}, body?: any) {
    return new Promise((resolve, reject) => {
        const request = https.request(options, (res) => {
            if (res.statusCode !== 200) {
                console.error(`Did not get an OK from the server. Code: ${res.statusCode} ${res.statusMessage}`);
                res.resume();
                return;
            }
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('close', () => {
                const dataParsed = GeneralUtil.anyToJson(data);
                console.log(dataParsed);
                resolve(dataParsed);
            });
        });
        if (body) {
            request.write(JSON.stringify(body));
        }
        request.end();
        request.on('error', (err) => {
            console.error(`Encountered an error trying to make a request: ${err.message}`);
            reject(err);
        });
    });
}
