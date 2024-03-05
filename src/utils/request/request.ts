import httpAction from './server'

/**
 * get请求
 * @param url 请求地址
 * @param params 请求参数
 * @returns 
 */
export function getAction(url: string, params: object = {}) {
  const resPromise: Promise<ResReturn> = new Promise((resolve, reject) => {
    httpAction({
      url: url,
      method: 'get',
      params: params,
      headers: {
        'Access-Control-Allow-Origin': '*',
        //'Content-Type':'application/x-www-form-urlencoded',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Methods': '*',
        'Access-Control-Allow-Headers': '*'
      }
    }).then((response:any) => {
      resolve(response);
    }).catch((error: any) => {
      reject(error);
    });
  });
  return resPromise
}

/**
 * put请求
 * @param url 请求地址
 * @param params 请求参数
 * @returns 
 */
export function putAction(url: string, params: object) {
  const resPromise: Promise<ResReturn> = new Promise((resolve, reject) => {
    httpAction({
      url: url,
      method: 'put',
      data: params,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json;charset=utf-8',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Methods': '*',
        'Access-Control-Allow-Headers': '*'
      }
    }).then((response:any) => {
      resolve(response);
    }).catch((error: any) => {
      reject(error);
    });
  });
  return resPromise
}

/**
 * post请求
 * @param url 请求地址
 * @param params 请求参数
 * @returns 
 */
export function postAction(url: string, params?: object | {} | null) {
  const resPromise: Promise<ResReturn> = new Promise((resolve, reject) => {
    httpAction({
      url: url,
      method: 'post',
      data: params,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json;charset=utf-8',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Methods': '*',
        'Access-Control-Allow-Headers': '*'
      }
    }).then((response:any) => {
      resolve(response);
    }).catch((error: any) => {
      reject(error);
    });
  });
  return resPromise
}

/**
 * delete请求
 * @param url 请求地址 
 * @param params 请求路径
 * @returns 
 */
export function deleteAction(url: string, params: object = {}) {
  const resPromise: Promise<ResReturn> = new Promise((resolve, reject) => {
	  httpAction({
		url: url,
		method: 'delete',
		data: params,
		headers: {
		  'Access-Control-Allow-Origin': '*',
		  'Content-Type': 'application/json;charset=utf-8',
		  'Access-Control-Allow-Credentials': 'true',
		  'Access-Control-Allow-Methods': '*',
		  'Access-Control-Allow-Headers': '*'
		}
	  }).then((response:any) => {
		resolve(response);
	  }).catch((error: any) => {
		reject(error);
	  });
	});
  return resPromise
  }

/**
 * 文件上传 -- form-data
 * @param url 请求地址
 * @param params 请求参数
 * @returns 
 */
export function fileUploadAction(url: string, params?: object | {} | null) {
  const resPromise: Promise<ResReturn> = new Promise((resolve, reject) => {
    httpAction({
      url: url,
      method: 'post',
      data: params,
      headers: { 'Content-Type': 'multipart/form-data' }
    }).then((response:any) => {
      resolve(response);
    }).catch((error: any) => {
      reject(error);
    });
  });
  return resPromise
}

/**
 * 文件下载
 * @param url 请求地址
 * @param params 请求参数
 * @returns 
 */
export function fileDownLoadAction(url: string, params: object) {
  const resPromise: Promise<ResReturn> = new Promise((resolve, reject) => {
    httpAction({
      url: url,
      method: 'post',
      data: params,
      responseType: "blob", //表明返回服务器返回的数据类型
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json;charset=utf-8',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Methods': '*',
        'Access-Control-Allow-Headers': '*'
      }
    }).then((response:any) => {
      resolve(response);
    }).catch((error: any) => {
      reject(error);
    });
  });
  return resPromise
}

