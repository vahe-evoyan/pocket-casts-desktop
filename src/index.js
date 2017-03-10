const Application = require('./scripts/application');
const {app} = require('electron');

let application = new Application(app);
application.init();
