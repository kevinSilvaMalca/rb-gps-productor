const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const log = require("./utils/logger");
const app = express();
const cors = require("cors");

const isProd = process.env.NODE_ENV === "production";
/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
dotenv.load({ path: `.env.${process.env.NODE_ENV}` });

/* CONTROLLERS */
const gpsController = require("./api/controllers/gps");

/**
 * Usamos body-parse para revisar el body cuando los request son post
 */
app.use(bodyParser.urlencoded({
  limit: '500mb',
  extended: true
}));
app.use(bodyParser.json({
  limit: '500mb'
}));


/** Cros */
if (!isProd) {
  app.use(cors());

  var allowCrossDomain = function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "example.com");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
  };
}

/**
 * Registro de puerto y servidor.
 */
app.disable("x-powered-by");
app.set("port", process.env.PORT);
app.set("host", process.env.NODEJS_IP);

/**
 *ENDPOINTS
 */
app.post("/rb/1.0/productorGps", gpsController.postGps );

app.get("/", (req, res) => {
  res.json({ ms: "gps" });
});

/**
 *FUNCIONES
 */

// consumerTkController.consumidorgpsTk();
// consumerTkposController.consumidorgpstkpos();
// consumerTkacrController.consumidorgpstkacr();



/**
 * Iniciando Servidor.
 */
app.listen(app.get("port"), app.get("host"), () => {
  log.info(`MS on http://${app.get("host")}:${app.get("port")}`);
});
