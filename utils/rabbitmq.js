const conexionRabbit = "amqp://admin:admin@rabbitmq/";

let open = require("amqplib").connect(`${conexionRabbit}`);

const productorRabbitMq = async (cola, mensaje) => {
    open
        .then(function (conn) {
            return conn.createChannel();
        })
        .then(function (ch) {
            ch.sendToQueue(cola, Buffer.from(mensaje));
            return ch.close();
        })
        .catch(console.warn);
};

const publishRabbitMq = async (exchange, mensaje) => {
    open
        .then(function (conn) {
            return conn.createChannel();
        })
        .then(function (ch) {
            // console.log(ch);
            ch.publish(exchange, "", Buffer.from(mensaje));
            return ch.close();
        })
        .catch(console.warn);
};

module.exports = {
    productorRabbitMq,
    publishRabbitMq
}
