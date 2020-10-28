// users-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get("mongooseClient");

  const schema = new mongooseClient.Schema(
    {
      firstname: {
        type: String,
        required: true
      },
      lastname: {
        type: String,
        required: true
      },
      email: {
        index: true,
        type: String,
        unique: true,
        lowercase: true,
        required: true
      },
      password: {
        type: String,
        required: true
      },
      active: {
        type: Boolean,
        default: true
      },
			isVerified: { type: Boolean },
			verifyToken: { type: String },
			verifyExpires: { type: Date },
			verifyChanges: { type: Object },
			resetToken: { type: String },
			resetExpires: { type: Date },
		},
    {
      timestamps: true
    }
  );

  // This is necessary to avoid model compilation errors in watch mode
  // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
  if (mongooseClient.modelNames().includes("users")) {
    mongooseClient.deleteModel("users");
  }
  return mongooseClient.model("users", schema);
};
