const { contextBridge, ipcRenderer} = require('electron')

// 暴露安全的 API 给渲染进程
contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: ipcRenderer
});

//操作窗口
contextBridge.exposeInMainWorld('$app', {
    min() {
        ipcRenderer.send('window-min')
        // console.log(1)
    },
    max() {
        ipcRenderer.send('window-max')
    },
    close() {
        ipcRenderer.send('window-close')
    },
    otherWin() {
        ipcRenderer.send('otherWin')
    }
})

//文件数据操作
contextBridge.exposeInMainWorld('$data', {
    getStartMD: ()=> ipcRenderer.invoke('get-start-md'),
    getTempPath: ()=> ipcRenderer.invoke('get-temp-path'),
    getOpenFile: ()=> ipcRenderer.invoke('get-open-file'),
    backFilePath(filePath){
        ipcRenderer.send('get-file-path',filePath)
    },
    getFileContext: ()=> ipcRenderer.invoke('open-file'),
    backSaveFile(filePath,context){
        ipcRenderer.send('save-old-file',filePath,context)
    },
    getSavePath: ()=> ipcRenderer.invoke('save-new-file'),
    backFileName: (fileName)=> ipcRenderer.send('get-default-name',fileName)
})

console.log(0)