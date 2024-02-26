// Classes
const AppEngine = require('./lib/engine/AppEngine');

// Create a new instance of the AppEngine
const appEngine = AppEngine.getInstance();

appEngine.prepareOutputDir();

// Start the app
appEngine.startTerminalApp();
