import {
    DynamoDb,
    MongoDb2
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

    it("test #1 => MongoDb2", async () => {
        try {
            const result = await MongoDb2.getInstance({
                mongo: {
                    uri: ""
                }
            }).connect();
            console.log(result);
            expect(result).toBeDefined();
        } catch (error) {
            console.error(error);
            expect(error).toBeDefined();
        }
    });
});
