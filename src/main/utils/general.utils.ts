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
}
