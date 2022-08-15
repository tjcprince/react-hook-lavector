import instance from './request'
/**
 * POST 请求封装
 */
export function apiPost(url: string, data: object) {
  return instance.request({
    url: url,
    method: 'post',
    data,
  })
}

/**
 * GET 请求封装
 */
export function apiGet(url: string) {
  return instance.request({
    url: url,
    method: 'get',
  })
}

/**
 * PUT 请求封装
 */
export function apiPut(url: string, data: object) {
  return instance.request({
    url: url,
    method: 'put',
    data,
  })
}
