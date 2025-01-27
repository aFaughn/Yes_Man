const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("mcserverstatus")
    .setDescription("See current server status of the minecraft server."),

  async execute(interaction) {
    await fetch("https://api.mcsrvstat.us/3/216.230.233.193")
      .then(response => {
        if (response.status !== 200) {
          interaction.reply({
            content:
              "Something went wrong querying the API service. Try running this command again later.",
            ephemeral: true,
          });
          return {error: "Shoot! Something went wrong querying the API."}
        } else {
          return response.json();
        }
      })
      .then(data => {
        if (data.error) {
          let embed = new EmbedBuilder()
            .setColor("FF0000")
            .setTitle("Minecraft Server Status: [DOWN]")
            .setDescription(`${data.error}`)
            .setTimestamp();

          interaction.reply({ embeds: [embed] });
        } else {
          players = "";
          if (data.players.list) {
            for (let i = 1; i < data.players.list.length + 1; i++) {
              players += `${i}. ${data.players.list[i - 10]["name"]}`;
            }
          }
          let embed = new EmbedBuilder()
            .setColor("11ee11")
            .setTitle("Minecraft Server Status: [ONLINE]")
            .addFields(
              {
                name: "Connected",
                value: `${data.players.online} / ${data.players.max}`,
              },
              { name: "Version", value: `${data.protocol.name}` },
              { name: "MOTD", value: `${data.motd.clean}` },
              { name: "Players", value: `${players.length > 1? players : "None"}` }
            )
            .setTimestamp();

          interaction.reply({ embeds: [embed] });
        }
      });
  },
};
