import dotenv from 'dotenv';
import axios from 'axios';
import Blink1 from 'node-blink1';

import { poll } from './polling.js';

// Load environment config
dotenv.config();

const { STEAM_WEBAPI_KEY, STEAM_ID, POLL_MS } = process.env;
const DOTA_2_ID = 570;

const checkStatus = () => {
  console.log('Checking status...');

  // Build query parameters
  const params = new URLSearchParams({
    key: STEAM_WEBAPI_KEY,
    steamids: STEAM_ID,
  });

  const paramsStr = params.toString();

  axios
    .get(
      `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?${paramsStr}`
    )
    .then((response) => {
      const { data } = response;
      decideColor(data.response.players[0]);
    })
    .catch((error) => {
      console.error(error);
    });
};

const decideColor = (player) => {
  try {
    const blink = new Blink1();
    // Game is Dota 2
    if (player.gameid === DOTA_2_ID) {
      blink.setRGB(255, 0, 0, () => {
        console.log('LED set to RED');
      });
    } else {
      blink.setRGB(0, 255, 0);
      console.log('LED set to GREEN');
    }
  } catch (error) {
    console.error(`Cannot find a connected Blink1.`);
  }
};

// Poll every 2 seconds
poll(checkStatus, Number(POLL_MS));
