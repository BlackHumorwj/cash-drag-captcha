import CashDragCaptcha from './index.vue'

// 支持 Vue.use() 插件注册
CashDragCaptcha.install = function (Vue) {
  Vue.component(CashDragCaptcha.name, CashDragCaptcha)
}

export default CashDragCaptcha
