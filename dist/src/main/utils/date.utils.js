"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateUtil = void 0;
class DateUtil {
    static addMinutes(date, minutes) {
        return new Date(date.getTime() + minutes * 60000);
    }
}
exports.DateUtil = DateUtil;
//# sourceMappingURL=date.utils.js.map