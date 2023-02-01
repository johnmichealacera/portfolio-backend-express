const userMongooseInstance = require("mongoose");

const UserSchema = new userMongooseInstance.Schema({
  username: {
    type: String,
  },
  password: {
    type: String,
  },
});

module.exports = userMongooseInstance.model("User", UserSchema);