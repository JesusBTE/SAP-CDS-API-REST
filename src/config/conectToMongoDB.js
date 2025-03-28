const mongoose = require("mongoose");
const dotenvX = require("./dotenvXConfig.js");

(async () => {
  try {
    const db = await mongoose.connect(dotenvX.CONNECTION_STRING, {
      //useNewUrlParser: true,
      //useUnifiedTopology: true,
      dbName: dotenvX.DATABASE,
    });
    console.log("Database is connected to: ", db.connection.name);
  } catch (error) {
    console.log("Error: ", error);
  }
})();
