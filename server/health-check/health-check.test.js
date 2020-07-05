const request = require("supertest");
const httpStatus = require("http-status");
const chai = require("chai"); // eslint-disable-line import/newline-after-import
const expect = chai.expect;
const app = require("../../config/express");

chai.config.includeStack = true;

describe("## Heaalth check APIs", () => {
  it("should get string Service Up!", (done) => {
    request(app)
      .get("/pdf-delivery/v1/health-check")
      .expect(httpStatus.OK)
      .then((res) => {
        expect(res.body).to.be.an("object");
        expect(res.body).to.have.property("message").to.be.a("string");
        done();
      })
      .catch(done);
  });
});
