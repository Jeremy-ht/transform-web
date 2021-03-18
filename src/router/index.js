import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

//  #5a98de;
//  #c62b26;

import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: '首页',
      component: () => import('@/views/dashboard/index'),
      meta: {title: '首页', icon: 'el-icon-s-home'}
    }]
  },
  /**
   *   首页
   */
  // 用户首页
  {
    path: '/home',
    hidden: true,
    name: '智能交通',
    component: () => import('@/views/home/index'),
    meta: {title: '智能交通'}
  },

  {
    path: '/phone/shopping',
    hidden: true,
    name: '云购手机购物车',
    component: () => import('@/views/home/shopping'),
    meta: {title: '云购手机购物车'}
  },

  // 注册
  {
    path: '/phone/my',
    hidden: true,
    name: '云购手机个人中心',
    component: () => import('@/views/home/person'),
    meta: {title: '云购手机个人中心'}
  },

  // login
  {
    path: '/phone/login',
    hidden: true,
    name: '云购手机登录',
    component: () => import('@/views/home/userLogin'),
    meta: {title: '云购手机登录'}
  },
  // login
  {
    path: '/ShowNewsInfo/:id',
    hidden: true,
    name: '详情',
    component: () => import('@/views/home/ShowNewsInfo'),
    meta: {title: '详情'}
  },


  // 详情
  {
    path: '/phone/show/:id',
    hidden: true,
    name: '手机详情',
    component: () => import('@/views/home/sceneryInfo'),
    meta: {title: '手机详情'}
  },


  /**
   *   系统管理
   */
  // 个人中心
  {
    path: '/admin',
    redirect: '/info',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'info',
        name: '个人中心',
        component: () => import('@/views/admin/info'),
        meta: {title: '个人中心'}

      }
    ]
  },


  // {
  //   path: '/one',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'four',
  //       name: '首页管理',
  //       component: () => import('@/views/scenery/four'),
  //       meta: { title: '首页管理', icon: 'el-icon-s-claim' }
  //     }
  //   ]
  // },

  {
    path: '/admin',
    component: Layout,
    children: [
      {
        path: 'admin',
        name: '系统管理',
        component: () => import('@/views/admin/index'),
        meta: {title: '系统管理', icon: 'el-icon-s-claim'}
      }
    ]
  },

  {
    path: '/user',
    component: Layout,
    children: [
      {
        path: 'user',
        name: '用户列表',
        component: () => import('@/views/user/index'),
        meta: {title: '用户列表', icon: 'el-icon-s-claim'}
      }
    ]
  },

  // {
  //   path: '/system',
  //   component: Layout,
  //   redirect: '/admin',
  //   name: '系统管理',
  //   meta: { title: '系统管理', icon: 'el-icon-s-tools' },
  //   children: [
  //     {
  //       path: 'admin',
  //       name: '员工列表',
  //       component: () => import('@/views/admin/index'),
  //       meta: { title: '员工列表', icon: 'table' }
  //     },
  //     {
  //       path: 'user',
  //       name: '用户列表',
  //       component: () => import('@/views/user/index'),
  //       meta: { title: '用户列表', icon: 'table' }
  //     }
  //   ]
  // },

  {
    path: '/wz',
    component: Layout,
    redirect: '/list',
    name: '交通违章',
    meta: {title: '交通违章', icon: 'el-icon-s-cooperation'},
    children: [
      {
        path: 'detail',
        name: '违章信息',
        component: () => import('@/views/scenery/wz'),
        meta: {title: '违章信息', icon: 'table'}
      },
      {
        path: 'add',
        name: '违章记录',
        component: () => import('@/views/scenery/addwz'),
        meta: {title: '违章记录', icon: 'table'}
      }
    ]
  },


  {
    path: '/infos',
    component: Layout,
    redirect: '/infos/list',
    name: '交通咨询',
    meta: {title: '交通咨询', icon: 'el-icon-s-cooperation'},
    children: [
      {
        path: 'list',
        name: '咨询信息',
        component: () => import('@/views/scenery/list'),
        meta: {title: '咨询信息', icon: 'table'}
      },
      {
        path: 'pull',
        name: '发布咨询',
        component: () => import('@/views/scenery/category'),
        meta: {title: '发布咨询', icon: 'table'}
      },
      {
        path: 'add',
        name: '添加咨询',
        component: () => import('@/views/scenery/add'),
        meta: {title: '添加咨询', icon: 'table'}
      }
    ]
  },


  {
    path: '/today',
    component: Layout,
    redirect: '/list',
    name: '今日道路',
    meta: {title: '今日道路', icon: 'el-icon-s-tools'},
    children: [
      {
        path: 'todays',
        name: '今日详情',
        component: () => import('@/views/scenery/add2'),
        meta: {title: '今日详情', icon: 'table'}
      },
      {
        path: 'list',
        name: '道路列表',
        component: () => import('@/views/scenery/list2'),
        meta: {title: '道路列表', icon: 'table'}
      }
    ]
  },


  /**
   *  评论
   */
  // {
  //   path: '/comment',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'commentList',
  //       name: '评论列表',
  //       component: () => import('@/views/comment/commentList'),
  //       meta: { title: '评论列表', icon: 'el-icon-s-comment' }
  //     }
  //   ]
  // },
  /**
   *  评论
   */
  // {
  //   path: '/order',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'orderList',
  //       name: '订单列表',
  //       component: () => import('@/views/comment/orders'),
  //       meta: { title: '订单列表', icon: 'el-icon-s-comment' }
  //     }
  //   ]
  // },
  /**
   *  统计
   */
  {
    path: '/chart',
    component: Layout,
    redirect: '/chart/cate',
    name: '数据展示',
    meta: {title: '数据展示', icon: 'el-icon-s-marketing'},
    children: [
      {
        path: 'cate',
        name: '品牌统计',
        component: () => import('@/views/chart/user'),
        meta: {title: '品牌统计', icon: 'table'}
      }
      // , {
      //   path: 'order',
      //   name: '交易统计',
      //   component: () => import('@/views/chart/chart'),
      //   meta: { title: '交易统计', icon: 'table' }
      // }
    ]
  },
  /**
   * 日志管理
   */

  // {
  //   path: '/log',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'sysLog',
  //       name: '日志列表',
  //       component: () => import('@/views/log/sysLog'),
  //       meta: { title: '日志列表', icon: 'el-icon-s-claim' }
  //     }
  //   ]
  // },
  // {
  //   path: '/log',
  //   component: Layout,
  //   redirect: '/log/sysLog',
  //   name: '日志管理',
  //   meta: { title: '日志管理', icon: 'el-icon-s-claim' },
  //   children: [
  //     {
  //       path: 'sysLog',
  //       name: '系统日志',
  //       component: () => import('@/views/log/sysLog'),
  //       meta: { title: '系统日志', icon: 'table' }
  //     },
  //     {
  //       path: 'userLog',
  //       name: '用户日志',
  //       component: () => import('@/views/log/userLog'),
  //       meta: { title: '用户日志', icon: 'table' }
  //     }
  //   ]
  // },

  {path: '*', redirect: '/404', hidden: true}
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({y: 0}),
  mode: 'history',
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
