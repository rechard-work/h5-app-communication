import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
const Index = resolve => require(['@/pages/index'], resolve)
const search = resolve => require(['@/pages/search'], resolve)

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/index',
      name: 'index',
      component: Index
    },
    {
      path: '/search',
      name: 'search',
      component: search
    },
    {
      path: '/',
      name: 'search',
      redirect: '/search'
    }
  ]
})
