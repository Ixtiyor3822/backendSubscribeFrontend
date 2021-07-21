const mongoose = require("mongoose");
const ChannelSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  channelId: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("Channel", ChannelSchema);
