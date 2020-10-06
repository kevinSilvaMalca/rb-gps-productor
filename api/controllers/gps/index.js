const log = require("utils/logger.js");
const rabbitmq = require('utils/rabbitmq.js');
const moment = require('moment');

/**
 * GPS INDEX
 */
const postGps = async (req, res) => {
    const fechaInicio = moment().format("DD-MM-YYYY**HH:mm:ss");
    try {
        log.info(`INICIO : ${fechaInicio}`);
        arregloJson = req.body;
        await rabbitmq.publishRabbitMq("exchange_gps", JSON.stringify(bodyJsonQueue));
        res.json({ codRes: "00", message: "OK" })
    } catch (error) {
        res.json({
            codRes: "03",
            message: "Envio Incorrecto",
            errores: error.message
        })
    }
    // await rabbitmq.productorRabbitMq("queue_tk_error", JSON.stringify(bodyJson));
}

module.exports = {
    postGps
}


