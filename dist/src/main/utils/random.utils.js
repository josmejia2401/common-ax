"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RandomUtil = void 0;
const uuid = require('uuid');
class RandomUtil {
    static makeId(length = 8) {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-/';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
    static generateUuidV4() {
        return uuid.v4();
    }
    ;
}
exports.RandomUtil = RandomUtil;
//# sourceMappingURL=random.utils.js.map