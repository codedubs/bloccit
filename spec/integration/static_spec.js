const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/";


describe("routes : static", () => {

  describe("GET /", () => {

    it("should return status code 200 and have 'Welcome to Bloccit' in the body of the response", () => {
      request.get("/", (err, res, body) => {
        expect(res.statusCode).toBe(200);
        expect(body).toContain("Welcome to Bloccit");

      });
    });

    it("should have 'About Us' in the body of the response", () => {
      request.get("/about", (err, res, body) => {
        expect(body).toContain("About Us");
      });
    });

  });

});
