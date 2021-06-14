const tmi = require('tmi.js');
const express = require("express");
const dotenv = require("dotenv").config();

// This is where you can set the twitch channels' chats that the bot will listen to
const channelNames = ["Raretendoblox"];

const clientId = process.env.clientId;
const username = process.env.username;
const password = process.env.password;

// server config

const hostname = "HOST_NAME_HERE";
const port = 8000;

// setting up the server

const app = express();

// initialising requests array

let requests = [];

// get inputs

app.get("/twitch", (req, res) => {
   res.send(requests);
   res.end();
})

// clear inputs

app.delete("/twitch", (req, res) => {
    let START = req.query.start;
    let END = req.query.end;
    requests.splice(START, (END - START) + 1);
    res.end();
})

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
})

// Define configuration options

const opts = {
    identity: {
        username: username,
        password: password
    },
    channels: channelNames
};

const client = new tmi.client(opts);

client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);
client.connect();

function onConnectedHandler (addr, port) {
    console.log(`Connected to ${addr}:${port}`);
}

function onMessageHandler(target, context, msg, self) {
    if (self) { return; }
    
    const command = msg.trim();
    if (command === 'left' || command === 'right' || command === 'up' || command === 'down') {
        requests.push(command);
    }
}
