const assert = require("assert");
const app = require("../../src/app");

describe("'dashboard' service", () => {
	it("registered the service", () => {
		const service = app.service("dashboard");

		assert.ok(service, "Registered the service");
	});
});
