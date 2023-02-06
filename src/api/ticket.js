import request from '@/utils/request'

// 获取工单列表
export function getTicketList(query) {
  return request({
    url: `/user-agent/tickets`,
    method: 'get',
    params: query
  })
}

// 撤销工单
export function closeTicket(ticketId) {
  return request({
    url: `/user-agent/tickets/${ticketId}/close`,
    method: 'put'
  })
}

export function updateTicket(ticketId, data) {
  return request({
    url: `/user-agent/tickets/${ticketId}`,
    method: 'put',
    data
  })
}
