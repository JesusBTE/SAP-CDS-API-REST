const express = require("express");
const cds = require("@sap/cds");
const cors = require("cors");
const router = express.Router();
const connectToMongoDB = require("./src/config/conectToMongoDB");
const dotenvXconfig = require("./src/config/dotenvXConfig");
const mongoose = require("mongoose");

module.exports = async (o) => {
  try {
    let app = express();
    app.express = express;
    app.use(express.json({ limit: "500kb" }));

    //Middlewares
    app.use(cors());
    //Routes
    //app.use('/api/auth', auth.router);
    app.use(dotenvXconfig.API_URL, router);
    app.use("/api", router);

    // app.get('/', (req,res)=>{
    //     res.end(SAP CDS esta en ejecución.... ${req.url});
    // });
    o.app = app;
    o.app.httpServer = await cds.server(o);
    return o.app.httpServer;
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
