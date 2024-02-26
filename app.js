// Package
const path = require('path');
const fs = require('fs');

// Constants
const OUTPUT_DIR = path.resolve(__dirname, 'output');
const outputPath = path.join(OUTPUT_DIR, 'team.html');

// Functions
const render = require('./src/page-template.js');

// Classes
const AppEngine = require('./lib/engine/AppEngine');

// Create the output directory if the output path does not exist
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR);
}

// Create a new instance of the AppEngine
const appEngine = AppEngine.getInstance();

// Start the app
appEngine.start();
