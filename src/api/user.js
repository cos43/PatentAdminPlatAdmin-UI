import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: '/getinfo',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/logout',
    method: 'post'
  })
}

export function getCaptcha() {
  return request({
    url: '/captcha',
    method: 'get'
  })
}

export function register(data) {
  return request({
    url: '/register',
    method: 'post',
    data
  })
}

export function updateInfo(data) {
  return request({
    url: '/updateinfo',
    method: 'put',
    data
  })
}

// modify password
export function updatePassword(data) {
  return request({
    url: '/user/pwd/set',
    method: 'put',
    data
  })
}

// reset password
export function resetPassword(data) {
  return request({
    url: '/user/pwd/reset',
    method: 'put',
    data
  })
}

// get all users
export function getAllUsers() {
  return request({
    url: '/sys-user',
    method: 'get'
  })
}
