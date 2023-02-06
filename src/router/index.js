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
    meta: { title: '知识产权转化手册', icon: 'dashboard', affix: true }
  }]
}, {
  path: '/login', component: () => import('@/views/users/login')
}, {
  path: '/search', component: Layout, children: [{
    path: 'index',
    component: () => import('@/views/users/index'),
    name: 'SearchIndex',
    meta: { title: '专利检索', icon: 'search' }
  }, {
    path: 'form',
    component: () => import('@/views/users/search/formSearch'),
    name: 'FormSearch',
    hidden: true,
    meta: { title: '表格检索', icon: 'search' }
  }, {
    path: 'advanced',
    component: () => import('@/views/users/search/advancedSearch'),
    name: 'AdvancedSearch',
    hidden: true,
    meta: { title: '高级检索', icon: 'search' }
  }, {
    path: 'results',
    component: () => import('@/views/users/search/results'),
    name: 'SearchResults',
    hidden: true,
    meta: { title: '检索结果', keepAlive: true }
  }, {
    path: 'detail/:id',
    component: () => import('@/views/users/search/detail'),
    name: 'SearchDetail',
    hidden: true,
    meta: { title: '专利详情' }
  }]
}, {
  path: '/patent', component: Layout, meta: { title: '我的专利', icon: 'patent' }, children: [{
    path: 'home',
    component: () => import('@/views/users/patent/dashboard/index'),
    name: 'Patent',
    meta: { title: '首页', icon: 'home' }
  }, {
    path: 'claim',
    component: () => import('@/views/users/patent/patentClaimList'),
    name: 'Patent',
    meta: { title: '专利管理', icon: 'patent' }
  }, {
    path: 'report',
    hidden: true,
    component: () => import('@/views/users/patent/report'),
    name: 'Report',
    meta: { title: '我的报告', icon: 'report' }
  }, {
    path: 'package',
    component: () => import('@/views/users/patent/package'),
    name: 'Pack',
    meta: { title: '工艺包', icon: 'pack' }
  }, {
    path: 'package/:id',
    component: () => import('@/views/users/patent/packageDetail'),
    name: 'Pack',
    hidden: true,
    meta: { title: '工艺包详情', icon: 'pack' }
  }, {
    path: 'analysis',
    name: 'analysis',
    meta: { title: '分析', icon: 'analysis' },
    component: () => import('@/views/users/patent/analysis/analysis'),
    children: [{
      path: 'associationGraph',
      component: () => import('@/views/users/patent/analysis/packageAssociationGraph'),
      name: 'associationGraph',
      meta: { title: '关系图谱', icon: 'related' }
    }, {
      path: 'technicalGraph',
      component: () => import('@/views/users/patent/analysis/technicalGraph'),
      name: 'technicalGraph',
      meta: { title: '技术图谱', icon: 'techGraph' }
    }]
  }]
}, {
  path: '/explore', component: Layout, meta: { title: '我的探索', icon: 'guide' }, children: [{
    path: 'follow',
    component: () => import('@/views/users/explore/patentFollowList.vue'),
    name: 'Follow',
    meta: { title: '我的关注', icon: 'focus' }
  }, {
    path: 'queries',
    component: () => import('@/views/users/explore/queriesList.vue'),
    name: 'Queries',
    meta: { title: '我的搜索', icon: 'search' }
  }, {
    path: 'analysis',
    name: 'Pack',
    meta: { title: '分析', icon: 'analysis' },
    component: () => import('@/views/users/explore/analysis/analysis'),
    children: [{
      path: 'associationGraph',
      component: () => import('@/views/users/explore/analysis/associationGraph'),
      name: 'associationGraph1',
      meta: { title: '关系图谱', icon: 'related' }
    }, {
      path: 'technicalGraph',
      component: () => import('@/views/users/explore/analysis/technicalGraph'),
      name: 'technicalGraph',
      meta: { title: '技术图谱', icon: 'techGraph' }
    }]
  }]
},
//   {
//   path: '/dept', component: Layout, meta: { title: '我的团队', icon: 'el-icon-s-help' }, children: [{
//     path: 'index',
//     component: () => import('@/views/users/explore/dept/index.vue'),
//     name: 'dept',
//     meta: { title: '团队一览', icon: 'el-icon-more' }
//   }, {
//     path: 'apply',
//     name: 'apply',
//     meta: { title: '我的申请', icon: 'el-icon-document-add' },
//     component: () => import('@/views/users/explore/dept/dept.vue')
//   }]
// },

{
  path: '/report', component: Layout, meta: { title: '我的报告', icon: 'report' }, children: [{
    path: 'list',
    component: () => import('@/views/users/report/reportList'),
    name: 'NoveltyReportGenerator',
    meta: { title: '报告管理', icon: 'list' }
  }, {
    path: 'generate',
    name: 'ReportGenerator',
    meta: { title: '报告生成', icon: 'reportGenerate' },
    component: () => import('@/views/users/report/ReportGenerator.vue'),
    children: [{
      path: 'novelty',
      component: () => import('@/views/users/report/NoveltyReportGenerator.vue'),
      name: 'noveltyReportGenerator',
      meta: { title: '查新报告', icon: 'new' }
    }, {
      path: 'infringement',
      component: () => import('@/views/users/report/InfringementReportGenerator.vue'),
      name: 'InfringementReportGenerator',
      meta: { title: '侵权报告', icon: 'infringement' }
    }, {
      path: 'valuation',
      component: () => import('@/views/users/report/ValuationReportGenerator.vue'),
      name: 'ValuationReportGenerator',
      meta: { title: '估值报告', icon: 'valuation' }
    }]
  }]
}, {
  path: '/trade', component: Layout, meta: { title: '我的交易', icon: 'trade' }, children: [{
    path: 'home',
    component: () => import('@/views/users/trade/dashboard/index'),
    name: 'tradingInformation',
    meta: { title: '首页', icon: 'home' }
  }, {
    path: 'information',
    component: () => import('@/views/users/trade/tradingInformation'),
    name: 'tradingInformation',
    meta: { title: '交易信息', icon: 'tradeInfo' }
  }, {
    path: 'estimate',
    component: () => import('@/views/users/trade/patentValuation'),
    name: 'patentValuation',
    meta: { title: '专利估价', icon: 'estimate' }
  }]
},
{
  path: '/ticket', component: Layout, meta: { title: '我的工单', icon: 'ticket' }, children: [
    {
      path: 'index',
      component: () => import('@/views/users/ticket/TicketList.vue'),
      name: 'ticketIndex',
      meta: { title: '我的工单', icon: 'ticket' }
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
}
//
//   {
//   path: '/history', component: Layout, children: [{
//     path: 'index',
//     component: () => import('@/views/users/history'),
//     name: 'History',
//     meta: { title: '操作历史', icon: 'history' }
//   }
//   ]
// }
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
