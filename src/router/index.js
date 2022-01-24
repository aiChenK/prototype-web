import Vue from 'vue'
import Router from 'vue-router'
import IndexView from '@/views/Index'
import store from '@/store'

Vue.use(Router)

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
	return originalPush.call(this, location).catch((err) => err)
}

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: IndexView,
      redirect: "/list",
      children: [
        {path: 'list', name: "list", component: () =>import('@/views/List')},
        {path: 'upload', name: "upload", component: () =>import('@/views/Upload'), meta: {needLogin: true}},
        {path: 'history', name: "history", component: () =>import('@/views/History')},
      ]
    },
    {path: '*', name: '404', component: () => import('@/views/layout/404')},
    {path: '/noAuth', name: '403', component: () => import('@/views/layout/403')}
  ]
})

router.beforeEach((to, from, next) => {
  if (!to.meta.needLogin) {
		return next()
	}
  if (!store.state.isLogin) {
    return next({
      name: '403',
      // query: { redirect: to.fullPath }
    })
  }
  return next()
})

export default router