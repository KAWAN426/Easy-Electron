const { app, BrowserWindow } = require("electron");
const path = require('path');
// 서버 실행 코드
require("./server/index");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1600,
    height: 900,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  // React를 사용할 경우 build 폴더를 연결하기 위해 './client/build/index.html'와 같이 바꿔주세요.
  mainWindow.loadFile(`${path.join(__dirname, './client/index.html')}`);

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") {
    app.quit();
  }
});


app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})