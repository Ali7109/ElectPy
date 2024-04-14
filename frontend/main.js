// main.js
const { app, BrowserWindow, ipcMain } = require("electron");
const electronReload = require("electron-reload");

electronReload(__dirname);

function createWindow() {
	const win = new BrowserWindow({
		// width and height of screen
		webPreferences: {
			nodeIntegration: true,
		},
		show: false,
	});

	win.loadFile("index.html");
	win.maximize();
	win.show();
	// win.webContents.openDevTools({ mode: "detach" });
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit();
	}
});

app.on("activate", () => {
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
});

// Listen for fetch errors from renderer process
ipcMain.on("fetch-error", (event, errorMessage) => {
	console.error("Fetch Error:", errorMessage);
});
