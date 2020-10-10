// projects-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
	const mongooseClient = app.get("mongooseClient");

	const { Schema } = mongooseClient;
	const { Mixed, ObjectId } = mongooseClient.Schema.Types;

	const schema = new Schema(
		{
			title: { type: String, required: true, unique:true },
			description: { type: String },
			niche: { type: String, required: true },
			ownerID: { type: String, required: true },
			owner: { type: String, required: true },
			active: {
				type: Boolean,
				default: true
			},
			integrations: { Mixed },
			managers: [
				{
					type: ObjectId,
					ref: "users"
				}
			],
			members: [
				{
					type: ObjectId,
					ref: "users"
				}
			]
		},
		{
			timestamps: true
		}
	);

	// This is necessary to avoid model compilation errors in watch mode
	// see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
	if (mongooseClient.modelNames().includes("projects")) {
		mongooseClient.deleteModel("projects");
	}
	return mongooseClient.model("projects", schema);
};
