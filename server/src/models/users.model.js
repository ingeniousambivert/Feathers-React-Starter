// users-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
	const mongooseClient = app.get("mongooseClient");

	const schema = new mongooseClient.Schema(
		{
			email: {
				type: String,
				unique: true,
				lowercase: true,
				index: true,
				required: true,
			},
			password: { type: String, required: true },
			firstname: { type: String, required: true },
			lastname: { type: String, required: true },
			isActive: { type: Boolean, default: true },
			permissions: { type: Array, default: ["user"] },
			passwordReset: { type: String },
			passwordResetToken: { type: String },
			lastLogIn: { type: Date },
			isVerified: { type: Boolean },
			verifyToken: { type: String },
			verifyShortToken: { type: String },
			verifyLongToken: { type: String },
			verifyExpires: { type: Date },
			verifyChanges: { type: Object },
			resetToken: { type: String },
			resetExpires: { type: Date },
		},
		{
			timestamps: true,
		}
	);

	// This is necessary to avoid model compilation errors in watch mode
	// see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
	if (mongooseClient.modelNames().includes("users")) {
		mongooseClient.deleteModel("users");
	}
	return mongooseClient.model("users", schema);
};
