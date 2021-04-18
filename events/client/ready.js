module.exports = client => {
  console.log(
    `${client.user.tag} est prêt ! ${client.guilds.cache.size} serveurs, ${client.users.cache.size} membres!`
  );
};
