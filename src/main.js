// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { clearTimeout } from 'timers';

Vue.config.productionTip = false

let Tip = (options = {}) =>{
  let duration = options.duration || 2000
  let instance = getInstance()
  clearTimeout(instance.timer)//感觉这里已经像一个单例模式了，我乱说的
  instance.message = typeof options === 'string' ? options : options.message
  document.body.appendChild(instance.$el)//$el代表的是挂载的DOM元素?
  Vue.nextTick(function(){//这里尤其想不明白，nextTick是干啥的？怎么保证下一次DOM更新视图渲染？？
    instance.visible = true
    instance.timer = setTimeout(function(){
      instance.close()
    },duration)
  })







}
Tip.install = function(){
  Vue.prototype.$tip = Tip
}





/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
