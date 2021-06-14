# Twitch-Roblox-Integration

This was made just for fun; I got bored and decided to make this. Some people asked me to open-source this, so here you go.

This repository allows you to make a twitch chat move an in-game roblox character in realtime by simply communicating with a web server. Messages such as `up`, `down`, `left`, or `right` can be sent in a twitch chat and a roblox character is able to move in the respective direction

# How does it work?
An external server is set up (using node.js) which the roblox game will communicate with. The external server will listen for new messages in a twitch chat and is temporarily stored internally. A REST API endpoint is provided, `/twitch`, which allows the roblox game to grab inputs from the twitch chat to process. Information of the inputs is grabbed via long polling, where the game sends 8 requests/sec and grabs new inputs to be processed and then processes them

# Setting up the server
Usually, when making twitch bots, you can create another account that will be used as the bot, but it's fine using your main account. Make sure you're currently authenticated to your main accout or your desired bot/alt account

**Step 1**: [Register your application on the Twitch Developers Console](https://dev.twitch.tv/console) - If you're currently authenticated, head over to the "Applications" category on the page. The application name can be anything you want, it doesn't matter what it is. For a redirect url, you can set that to http://localhost. Category should be set to "Chat Bot"

**Step 2**: Download [Node.js](https://nodejs.org/en/). Once you've done that and it is setup, download the code of the repository locally and unzip the file. It can be stored anywhere on your computer. Open the folder in your file explorer and type "cmd" where the path of the file is
![image](https://user-images.githubusercontent.com/31361628/121913435-65b4b300-ccff-11eb-883b-2d2f2ecfb23e.png)

This will open Windows' command prompt. 

**Step 3**: Once the command prompt is open, type the following things one-by-one after each one is installed:

- `npm install express`
- `npm install dotenv`
- `npm install tmi.js`

**Step 4**: Once all of those packages are installed, open a code editor (I preferrably use [Visual Studio Code](https://code.visualstudio.com/)) and edit the file named `index.js`. Edit the `channelNames` constant which is a list of comma-separated strings representing the twitch channels that the bot will listen to messages in the chats. Examples of this are:

- `["Raretendoblox"]`
- `["Raretendoblox", "Summit1g"]`

**Step 5**: Create a file and name it `.env`. Open the `.env` file which describes the configurations of the twitch bot and paste the following in the file:
```
clientId=CLIENT_ID_HERE
username=USERNAME_HERE
password=OAUTH_PASSWORD_HERE
```
The parameters and values are as follows:
- `clientId`: On the "Applications" category of the Twitch Developer Console, click the "Manage" button on your application. The clientId is right under the "Client Id" heading of the fields if you scroll down on the page.
- `username`: This is the username of the twitch account that will be used as a bot. This can be your twitch channel username or perhaps an secondary account.
- `password`: This is the oauth token used to authenticate a twitch account. If you're currently authenticated to the account with the name specified in the `username` field, visit [this page](https://twitchapps.com/tmi/) to obtain your oauth token

**Step 6**: *If you do not have a domain, there is a section below that allows you to host it on Glitch instead*

To run the bot at your domain (if you have one), type `node index.js` in the command prompt and you should be greeted with a message(s) in the command prompt. At this point, you can head to your twitch channel and send messages such as `up`, `down`, `left` or `right` and then head to the website and you'll see the inputs listed there.

# Hosting on Glitch
*To be continued. For now, you can just look up tutorials on how to use Glitch and figure it out on your own if you wish*

# Setting up in the game
Copy the code in `Game.lua` and paste it into a script in ServerScriptService and enable HTTP requests to be made in your game. Once you press play solo, or head into the real game, the game is able to listen to inputs from the twitch chat and will be able to move in a direction when the respective direction has been sent in the twitch chat
