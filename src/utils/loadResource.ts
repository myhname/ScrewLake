/**
 * 加载 js 资源文件
 * @param src
 */
export const loadResource = (src: string) => {
    return new Promise<void>((resolve, reject) => {
        let script = document.createElement('script');
        script.type = "text/javascript";
        script.src = src;
        script.id = "sakura_script"
        document.body.appendChild(script);

        script.onload = () => {
            resolve();
        }
        script.onerror = () => {
            reject();
        }
    })
}

export const getBgUrlStyle = (src: string) => {
    return `background-image: url('${src}')`
}
