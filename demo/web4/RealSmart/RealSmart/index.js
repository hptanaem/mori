const electron = require('electron');
const app = electron.app;

const BrowserWindow = electron.BrowserWindow;

var mainWindow;
app.on('ready', function(){

	mainWindow = new BrowserWindow({
		width: 1024, 
		height: 768, 
		backgroundcColor: '#2e2c29', 
		frame: false,
		// titleBarStyle: ‘hidden’,
		fullscreen: true
		});
	mainWindow.loadURL('file://C:/Users/User/Desktop/graph/materialDesign/React/web4/RealSmart/RealSmart/web/index.html');

});