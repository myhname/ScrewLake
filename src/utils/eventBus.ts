import mitt from "mitt"
//总线，无关系的组件间传值
export default mitt()

// 示例
/*
import emitter from '@/untils/eventBus'

emitter.emit('fileControlMsgToEditor', "newFile")
onMounted(() => {
    //接收页面改变信息
    emitter.on('changeCurrView', (value) => {
        currView.value = value
    })
    emitter.on('isOnlineReady', (value)=>{
        isOnline.value = value
        if(value === true){
            isEditorView.value = true
            isFileMenu.value = true
        }
    })
    //接收文件信息
    emitter.on('titleNameChangeToHeader',(value)=>{
        titleName.value = value
    })
    emitter.on('sendCooperatrionMSGToHeader', (value)=>{
        isCooperation.value = value
    })
})

onBeforeUnmount(() => {
    //注销监听事件
    emitter.off('changeCurrView')
    emitter.off('isOnlineReady')
    emitter.off('titleNameChangeToHeader')
})
*/
