// import Toast from './Toast.vue'
// console.log('this is toast!!!!!')
// console.log(Toast)
// console.log('this is toast!!!!!')

// Toast.install = Vue => Vue.component(Toast.name,Toast)

// export default Toast

import Vue from "vue";
import toast from "./Toast.vue";
import { clearTimeout, setTimeout } from "timers";
import default from "../../../../.cache/typescript/2.6/node_modules/@types/atob";

const ToastConstructor = Vue.extend(toast);
let toastPool = [];

ToastConstructor.prototype.close = function() {
  this.visible = false;
  toastPool.push(this);
};

createAnInstance = function() {
  if (toastPool.length) {
    let instance = toastPool[0];
    toastPool.splice(0, 1);
    return instance;
  }
  return new ToastConstructor({
    el: document.createElement("div")
  });
};

let Toast = (options = {}) => {
  let duration = options.duration || 2000;
  let instance = createAnInstance();
  clearTimeout(instance.timer);
  instance.message = typeof options === "string" ? options : options.message;
  document.body.appendChild(instance.$el);
  Vue.nextTick(function() {
    instance.visible = true;

    instance.timer = setTimeout(function() {
      instance.close();
    },duration);
  } );
  return instance
};
Toast.install = function(){
  Vue.prototype.$tip = Toast
}

export default Toast