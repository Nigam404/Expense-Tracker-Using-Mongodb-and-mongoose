const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const fileSchema = new Schema({
  url: {
    type: String,
  },
  userId: {
    type: Schema.Types.ObjectId,
  },
});

module.exports = mongoose.model("Fileurl", fileSchema);
