module.exports = (client, readdir) => {
  //Get command files
  readdir("/app/commands/", (err, files) => {
    //If their is an error, Return the error
    if (err) return client.logger.error(err);

    //For each file in the file array run this function
    files.forEach((file) => {
      //If the file extention (.py, .js, .md) is not js, Ignore it
      if (!file.endsWith(".js")) return;

      //Make the "props" variuble the file object
      let props = require(`/app/commands/${file}`);

      //Split the file name from the file extention
      let commandName = file.split(".")[0];

      //Log that the command is loading
      client.logger.log(`Loading command: ${commandName}`);

      //Set the command name the file objects
      client.commands.set(commandName, props);
      props.conf.aliases.forEach((al) => {
        //Set the aliases of the command the file objects
        client.aliases.set(al, client.commands.get(commandName));
      });
    });
    console.log();
  });
};