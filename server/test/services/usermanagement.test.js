const assert = require("assert");
const app = require("../../src/app");

describe("'usermanagement' service", () => {
	it("registered the service", () => {
		const service = app.service("usermanagement");

		assert.ok(service, "Registered the service");
	});
});
