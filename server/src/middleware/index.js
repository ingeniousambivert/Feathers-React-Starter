// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
	// Add your custom middleware here. Remember that
	// in Express, the order matters.

	// Register an Express middleware
	app.use("/test", (req, res) => {
		res.json({
			message: "Testing from Express middleware",
		});
	});

	// Register a service
	// app.use("/users", {
	//   async get(id) {
	//     return { id };
	//   },
	// });
};
