"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeneralUtil = void 0;
class GeneralUtil {
    static stringToBase64(value) {
        return Buffer.from(value).toString('base64');
    }
    static anyToJson(value) {
        try {
            return JSON.parse(value);
        }
        catch (error) { }
        return value;
    }
    static decode(s) {
        return Buffer.from(s, 'base64').toString();
    }
    static encode(b) {
        return Buffer.from(b).toString('base64');
        ;
    }
}
exports.GeneralUtil = GeneralUtil;
//# sourceMappingURL=general.utils.js.map