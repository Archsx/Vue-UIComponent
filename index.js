import Toast from './src/components/Toast/index.js'

console.log('this is toast!!!!!')
console.log(Toast)
console.log('this is toast!!!!!')
const components = [Toast]

const install = function(Vue,opts = {}){
  components.map(component => {
    Vue.component(component.name,component)
  })
}

if(typeof window !== 'undefined' && window.Vue){
  install(window.Vue)
}

export default {
  install,
  Toast
}