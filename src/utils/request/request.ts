import httpAction from './server'

/**
 * get请求
 * @param url 请求地址
 * @param params 请求参数
 * @returns 
 */
export function getAction(url: string, params: object = {}) {
  return new Promise((resolve, reject) => {
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
    }).then(response => {
      resolve(response);
    }).catch(error => {
      reject(error);
    });
  });
}

/**
 * put请求
 * @param url 请求地址
 * @param params 请求参数
 * @returns 
 */
export function putAction(url: string, params: object) {
  return new Promise((resolve, reject) => {
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
    }).then(response => {
      resolve(response);
    }).catch(error => {
      reject(error);
    });
  });
}

/**
 * post请求
 * @param url 请求地址
 * @param params 请求参数
 * @returns 
 */
export function postAction(url: string, params?: object | {} | null) {
  return new Promise((resolve, reject) => {
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
    }).then(response => {
      resolve(response);
    }).catch(error => {
      reject(error);
    });
  });
}

/**
 * delete请求
 * @param url 请求地址 
 * @param params 请求路径
 * @returns 
 */
export function deleteAction(url: string, params: object = {}) {
	return new Promise((resolve, reject) => {
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
	  }).then(response => {
		resolve(response);
	  }).catch(error => {
		reject(error);
	  });
	});
  }

/**
 * 文件上传 -- form-data
 * @param url 请求地址
 * @param params 请求参数
 * @returns 
 */
export function fileUploadAction(url: string, params?: object | {} | null) {
  return new Promise((resolve, reject) => {
    httpAction({
      url: url,
      method: 'post',
      data: params,
      headers: { 'Content-Type': 'multipart/form-data' }
    }).then(response => {
      resolve(response);
    }).catch(error => {
      reject(error);
    });
  });
}

/**
 * 文件下载
 * @param url 请求地址
 * @param params 请求参数
 * @returns 
 */
export function fileDownLoadAction(url: string, params: object) {
  return new Promise((resolve, reject) => {
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
    }).then(response => {
      resolve(response);
    }).catch(error => {
      reject(error);
    });
  });
}

