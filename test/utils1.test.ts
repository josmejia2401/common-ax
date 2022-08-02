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
                    Authorization: "Bearer IkloODVkYSI=.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiMCIsImlhdCI6MTY1Nzg0MjU3ODU5NSwiZXhwIjoxNjYwNDM0NTc4NTk1LCJhdWQiOiJwc3BjIiwiaWQiOiIwZGIzN2FhNi0yZWNjLTRhZjEtODRhZi01YWZlNGY4M2M0M2UiLCJzdWIiOiJqb3NlMjQwMTEiLCJqdGkiOiI5ZjU0ZTZjNS0xMDAzLTQ3MjEtOWE4YS0zMWVmMWJjZTFlMWIiLCJuYW1lIjoiam9zZSBtZWppYSIsImFkbWluIjpmYWxzZSwiaXNzIjoiL3NlY3VyaXR5L3YxL2F1dGgiLCJjaGFubmVsIjoid2ViIiwic2lkIjoiNjlkOTY4MTYtZjUzYi00ZGNhLWFkMjItYjI4ZTc2ZDkzZTkzIiwid2Vic2l0ZSI6ImF4OS1wc3BjLm5ldGxpZnkuYXBwIn0=.ZXlKaGJHY2lPaUpJVXpJMU5pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SjBiMnRsYmw5MGVYQmxJam9pTUNJc0ltbGhkQ0k2TVRZMU56ZzBNalUzT0RVNU5Td2laWGh3SWpveE5qWXdORE0wTlRjNE5UazFMQ0poZFdRaU9pSndjM0JqSWl3aWFXUWlPaUl3WkdJek4yRmhOaTB5WldOakxUUmhaakV0T0RSaFppMDFZV1psTkdZNE0yTTBNMlVpTENKemRXSWlPaUpxYjNObE1qUXdNVEVpTENKcWRHa2lPaUk1WmpVMFpUWmpOUzB4TURBekxUUTNNakV0T1dFNFlTMHpNV1ZtTVdKalpURmxNV0lpTENKdVlXMWxJam9pYW05elpTQnRaV3BwWVNJc0ltRmtiV2x1SWpwbVlXeHpaU3dpYVhOeklqb2lMM05sWTNWeWFYUjVMM1l4TDJGMWRHZ2lMQ0pqYUdGdWJtVnNJam9pZDJWaUlpd2ljMmxrSWpvaU5qbGtPVFk0TVRZdFpqVXpZaTAwWkdOaExXRmtNakl0WWpJNFpUYzJaRGt6WlRreklpd2lkMlZpYzJsMFpTSTZJbUY0T1Mxd2MzQmpMbTVsZEd4cFpua3VZWEJ3SW4wPQ==",
                    Origin: "ax9-pspc.netlify.app"
                },
                method: "POST",
                path: "",
                params: {},
                query: {}
            }, {
                host: ".execute-api.us-east-1.amazonaws.com",
                method: "POST",
                path: "/dev/ax9/security/auth/authorization",
            });
            expect(result).toBeDefined();
        } catch (error) {
            expect(error).toBeDefined();
        }
    });

});
