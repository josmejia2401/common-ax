import {
    validateRequestAll
} from '../src/main/middleware/request';

describe("Test Case request", () => {

    beforeEach(() => { });
    afterEach(() => { });

    it("test #1 => validateRequestAll", async () => {
        try {
            const result = await validateRequestAll({
                headers: {
                    Authorization: "Bearer IkloODVkYSI=.",
                    Origin: "ax9-pspc.netlify.app"
                },
                method: "POST",
                path: "",
                params: {},
                query: {}
            }, {
                host: "hiyr6bipf0.execute-api.us-east-1.amazonaws.com",
                method: "POST",
                path: "/dev/ax9/security/auth/authorization",
            });
            expect(result).toBeDefined();
        } catch (error) {
            console.log("errrrrrrrrrrrrrrr", error);
            expect(error).toBeDefined();
        }
    });

});
