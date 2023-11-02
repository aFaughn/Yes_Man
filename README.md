# Yes Man Documentation (v.0.57)

## Installation

### Pre-requisites

1. Node.js (v.20.4.1 or greater)
2. PostgreSQL
3. npm

### Installation Process

1. Clone this repo from it's github page at [GitHub](https://www.github.com/afaughn/Yes_man)
2. run `npm install` or `npm -i` to install all required packages
3. Setup your environmental variables (see .env.example) NOTE: MAKE SURE TO SET DB_SYNC TO TRUE ON FIRST LAUNCH **AND THEN DISABLE THEREAFTER**
4. execute the program by running `node index.js`

## TODO
- Implement Karma
- Implement Points
- Implement Inventory
- Purge test channel
- Post PLEX Server requests to specific channel with rich information
- More plex integrations (?) [Plex Docs](https://www.plexopedia.com/plex-media-server/api/library/movies/)