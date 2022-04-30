export class GeneralUtil {

    static stringToBase64(value: string) {
        return Buffer.from(value).toString('base64');
    }

    static anyToJson(value: any) {
        try {
            return JSON.parse(value);
        } catch (error) { }
        return value;
    }

    static decode(s: string) {
        return Buffer.from(s, 'base64').toString();
    }
    static encode(b: string) {
        return Buffer.from(b).toString('base64');;
    }
}
