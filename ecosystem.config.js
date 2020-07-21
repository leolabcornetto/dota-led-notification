module.exports = {
  apps: [
    {
      name: 'dota-led-notification',
      script: './index.js',
      watch: false,
      instances: 1,
      autorestart: false
    },
  ]
};
