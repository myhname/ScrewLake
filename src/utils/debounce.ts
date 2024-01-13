const debounce = (fn:Function, delay: number) => {
	let time: number = delay || 200
	let timer: any = null
	return function( ...args:any ){
		if(timer){
			clearTimeout(timer)
		}
		timer = setTimeout(()=>{
			timer = null
			fn.apply(this,args)
		}, time)
	}
}

export default debounce