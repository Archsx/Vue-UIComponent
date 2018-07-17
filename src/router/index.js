import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Test from '@/components/Test'
import Foo from '../components/Foo.vue'
import TipExample from '../components/TipExample.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Test',
      component: TipExample
    }
  ]
})
