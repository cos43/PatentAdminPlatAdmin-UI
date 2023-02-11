import request from '@/utils/request'

// 用户查看所有团队
export function getDeptList() {
  return request({
    url: '/dept',
    method: 'get'
  })
}

export function addDept(data) {
  return request({
    url: '/dept',
    method: 'post',
    data
  })
}

export function updateDept(deptId, data) {
  return request({
    url: '/dept/' + deptId,
    method: 'put',
    data
  })
}

export function deleteDept(deptId) {
  return request({
    url: `/dept/${deptId}`,
    method: 'delete'
  })
}

export function getDeptByDeptId(deptId) {
  return request({
    url: `/dept/${deptId}`,
    method: 'get'
  })
}
