import Vue from 'vue'
import Router from 'vue-router'
import IndexView from '@/view/index-view/index-view'
import TestView from '@/view/test-view/test-view'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/index',
      component: IndexView
    },
    {
      path: '/test',
      component: TestView
    }
  ]
})
