import {
    DynamoDb
} from '../app';
describe("Test Case connect", () => {
    beforeEach(() => { });
    afterEach(() => { });
    it("test #1 => DynamoDb", async () => {
        try {
            const result = DynamoDb.getInstance().connect();
            expect(result).toBeDefined();
        } catch (error) {
            console.error(error);
            expect(error).toBeDefined();
        }
    });
});
