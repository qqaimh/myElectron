const { app, BrowserWindow, ipcMain } = require('electron')

const url = require("url")
const path = require("path")

let mainWindow

const winURL = `file://${__dirname}/index.html`
const devURL = `http://localhost:4200/`

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
            contextIsolation: false,
            preload: __dirname + '/preload.js'
        }
    })

    mainWindow.loadURL(winURL);
    // 开启渲染进程中的调试模式
    // mainWindow.webContents.openDevTools();
    mainWindow.on('closed', function () {
        mainWindow = null
    })
}
console.log(app);
app.on('ready', createWindow)

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
    if (mainWindow === null) createWindow()
})

ipcMain.on('clickMessage',(event, arg) => {
    console.log(778899)
    mainWindow.webContents.send('clickMessageBack', '来自于主线程' );
})

