const mongoose = require("mongoose");
module.exports = async () => {
  try {
    await mongoose.connect("mongodb://localhost/youtube", {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Baza ishga tushdi");
  } catch (error) {
    console.log("Server error", error);
    process.exit(1);
  }
};
