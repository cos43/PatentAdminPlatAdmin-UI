import Vue from 'vue'
import Router from 'vue-router'
/* Layout */
import Layout from '@/layout'

Vue.use(Router)

/* Router Modules */
// import componentsRouter from './modules/components'
// import chartsRouter from './modules/charts'
// import tableRouter from './modules/table'
// import nestedRouter from './modules/nested'

export const constantRoutes = [{
  path: '/redirect', component: Layout, hidden: true, children: [{
    path: '/redirect/:path(.*)', component: () => import('@/views/redirect/index')
  }]
}, {
  path: '/register', component: () => import('@/views/users/components/RegisterComponent'), hidden: true
}, {
  path: '/auth-redirect', component: () => import('@/views/login/auth-redirect'), hidden: true
}, {
  path: '/404', component: () => import('@/views/error-page/404'), hidden: true
}, {
  path: '/401', component: () => import('@/views/error-page/401'), hidden: true
}, {
  path: '/', component: Layout, redirect: '/dashboard', children: [{
    path: 'dashboard',
    component: () => import('@/views/users/dashboard/index'),
    name: 'Dashboard',
    meta: { title: '知识产权转化手册后台管理', icon: 'dashboard', affix: true }
  }]
}, {
  path: '/login', component: () => import('@/views/users/login')
},
{
  path: '/user', component: Layout, meta: { title: '用户管理', icon: 'user' },
  children: [{
    path: 'list',
    component: () => import('@/views/users/sysuser/SysUserList.vue'),
    name: 'UserList',
    meta: { title: '用户管理', icon: 'user' }
  }]
},

{
  path: '/dept', component: Layout, meta: { title: '团队管理', icon: 'el-icon-s-help' }, children: [{
    path: 'index',
    component: () => import('@/views/users/dept/index.vue'),
    name: 'deptList',
    meta: { title: '团队管理', icon: 'el-icon-more' }
  }]
},

{
  path: '/ticket', component: Layout, meta: { title: '工单管理', icon: 'ticket' }, children: [
    {
      path: 'index',
      component: () => import('@/views/users/ticket/TicketList.vue'),
      name: 'ticketIndex',
      meta: { title: '工单管理', icon: 'ticket' }
    }
    // {
    //   path: 'create',
    //   component: () => import('@/views/users/ticket/TicketCreate.vue'),
    //   name: 'ticketCreate',
    //   meta: { title: '创建工单', icon: 'ticket' }
    // }
  ]
},

{
  path: '/profile', component: Layout, children: [{
    path: 'index',
    component: () => import('@/views/users/profile/index'),
    name: 'Profile',
    meta: { title: '个人资料', icon: 'profile' }
  }]
},
{
  path: '/history', component: Layout, children: [{
    path: 'index',
    component: () => import('@/views/users/history'),
    name: 'History',
    meta: { title: '操作历史', icon: 'history' }
  }
  ]
}
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = []

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }), routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
