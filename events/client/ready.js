module.exports = client => {
  client.user.setPresence({activity: {name: "CoalStudio.js"}});
  console.log(
    `Le bot est ON !`
  );
};
