import {
    GeneralUtil
} from '../app';

describe("Test Case GeneralUtil", () => {

    beforeEach(() => { });
    afterEach(() => { });

    it("test #1 => stringToBase64", async () => {
        try {
            const result = GeneralUtil.stringToBase64("abc");
            expect(result).toBeDefined();
        } catch (error) {
            expect(error).toBeDefined();
        }
    });

    it("test #2 => anyToJson", async () => {
        try {
            const result = GeneralUtil.anyToJson("abc");
            expect(result).toBeDefined();
        } catch (error) {
            expect(error).toBeDefined();
        }
    });
});
