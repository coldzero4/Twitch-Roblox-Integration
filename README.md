# Twitch-Roblox-Integration
This repository allows you to make a twitch chat move an in-game roblox character in realtime

# How does it work?
An external server is set up (using node.js) which the roblox game will communicate with. The external server will listen for new messages in a twitch chat and is temporarily stored internally. A REST API endpoint is provided, `/twitch`, which allows the roblox game to grab inputs from the twitch chat to process. Information of the inputs is grabbed via long polling, where the game sends 8 requests/sec and grabs new inputs to be processed and then processes them

# Setting it up
Usually, when making twitch bots, you can create another account that will be used as the bot, but it's fine using your main account. Make sure you're currently authenticated to your main accout or your desired bot/alt account

Step 1: [Register your application on the Twitch Developers Console](https://dev.twitch.tv/console) -- If you're currently authenticated, head over to the "Applications" category on the page. The application name can be anything you want, it doesn't matter what it is. For a redirect url, you can set that to http://localhost. Category should be set to "Chat Bot"

Step 2: Clone this repository locally. 
