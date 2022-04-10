import {
    ModelValidator,
} from '../src/main/validations/model.validations';
describe("Test Case", () => {
    beforeEach(() => { });
    afterEach(() => { });
    it("test #1 => Model", async () => {
        try {
            const model = new ModelValidator({
                "name": {
                    requiered: false,
                }, 
                "val": {
                    requiered: true,
                }
            });
            model.validate({
                val: null
            });
        } catch (error) {
            console.error(error);
            expect(error).toBeDefined();
        }
    });
});
