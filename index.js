const express = require('express');
const { createServer } = require('http');
const { join } = require('path');
const { Server } = require('socket.io');
const mqtt = require("mqtt");


const app = express();
const server = createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'index.html'));
});

server.listen(3000, () => {
    console.log('server running at http://localhost:3000');
});


const client = mqtt.connect("mqtt://broker.hivemq.com")
client.on("connect", () => {
    console.log("Connected to MQTT")
    client.subscribe("SIEMS")
})

client.on("message", (topic, message) => {
    io.emit("distance", message.toString())
})