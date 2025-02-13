# Yes Man Documentation (v.1.1)

## Installation

### Pre-requisites

1. Node.js (v.20.3.1 or greater)
2. PostgreSQL
3. npm
4. A bot registered on your discord developer portal

### Installation Process

1. Clone this repo from it's repository page on [GitHub](https://www.github.com/afaughn/Yes_man)
2. run `npm install` or `npm -i` to install all required packages
3. Setup your environmental variables (see .env.example)
4. run `npx sequelize-cli db:create` inside the main repo folder
5. run `npx sequelize-cli db:migrate` inside the main repo folder
9. execute the program by running `node index.js`. If you don't want to dedicate a terminal window to this application, I recommend using PM2


## Features
 - Daily NASA APOD
 - Gambling
 - Counters for bad jokes
 - Points Leaderboards
 - PostgreSQL \ Sequelize integration
 - Dynamic Command Loading
 - Plex Requests
 - Dynamic configurations
 - Configurable Dice Roll (Psuedo Random)
 - Dracula Flows (Not all are SFW!)
 - Configuration command
 - Automatically registers users to DB upon connecting to a new guild.
 

## TODO
- Implement Random.org's real random number API.
- Instead of creating users upon joining a server, wait until the user interacts with the bot first.