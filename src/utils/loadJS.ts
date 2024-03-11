function loadJs(src: string) {
  return new Promise<void>((resolve,reject)=>{
    let script = document.createElement('script');
    script.type = "text/javascript";
    script.src= src;
    script.id = "sakura_script"
    document.body.appendChild(script);
      
    script.onload = ()=>{
      resolve();
    }
    script.onerror = ()=>{
      reject();
    }
  })
}
 
export default loadJs