const tmi = require('tmi.js');
const express = require("express");
const axios = require("axios");

// Twitch config

const channelNames = ["CHANNEL NAME HERE"]; // A list of strings of channel names that the twitch bot will listen to the chat(s) of. There are comma-separated if you intend to have multiple channels to listen to 
const clientId = "CLIENT ID HERE"; // Client ID of your application
const clientSecret = "CLIENT SECRET HERE"; // Client secret of your application
const username = "USERNAME HERE"; // Username of the channel to be used as a twitch bot (You can use your own main account if it is currently authenticated) 
const password = "PASSWORD HERE"; // OAuth token generated from TwitchApps

// Server config (Only if you host this yourself)

const hostname = "127.0.0.1";
const port = 8000;

const app = express();

let requests = [];

app.get("/twitch", (req, res) => {
   res.send(requests);
   res.end();
})

app.delete("/twitch", (req, res) => {
    let START = req.query.start;
    let END = req.query.end;
    requests.splice(START, (END - START) + 1);
    res.end();
})

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
})

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
