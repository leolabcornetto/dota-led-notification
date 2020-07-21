const dotenv = require('dotenv');
const axios = require('axios');
const Blink1 = require('node-blink1');
const poll = require('./polling');

// Load environment config
dotenv.config();

const { STEAM_WEBAPI_KEY, STEAM_ID, POLL_MS } = process.env;
const DOTA_2_ID = '570';

// Running flag
let shouldRun = true;

/**
 * Checks the current status of the player.
 */
const checkStatus = async () => {
  // Build query parameters
  const params = new URLSearchParams({
    key: STEAM_WEBAPI_KEY,
    steamids: STEAM_ID,
  });

  const paramsStr = params.toString();

  try {
    const response = await axios.get(
      `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?${paramsStr}`
    );
    const { data } = response;
    shouldRun = decideColor(data.response.players[0]);
  } catch (error) {
    console.error(error);
    shouldRun = false;
  }
};

/**
 * Decides the color for the blink1 LED based on player data.
 * @param {*} player player data from Steam WEB API
 */
const decideColor = (player) => {
  try {
    const blink = new Blink1();
    // Game is Dota 2
    if (player.gameid === DOTA_2_ID) {
      blink.setRGB(255, 0, 0, () => {});
    } else {
      blink.setRGB(0, 255, 0, () => {});
    }
  } catch (error) {
    console.error(`Cannot find a connected Blink1.`);
    return false;
  }

  return true;
};

// Poll every 2 seconds
poll(
  checkStatus,
  () => shouldRun,
  Number(POLL_MS),
  async () => {
    console.log('Polling has ended.');
    process.exit(0);
  }
);

console.log('Polling has started.');
