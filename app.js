// Classes
const AppEngine = require('./lib/engine/AppEngine');

try {
  // Create a new instance of the AppEngine
  const appEngine = AppEngine.getInstance();

  // Prepare the output directory
  appEngine
    .prepareOutputDir()
    .then(() => {
      // Start the app
      appEngine.startTerminalApp();
    })
    .catch((err) => {
      console.log(err);
    });
} catch (err) {
  console.log(err);
}
