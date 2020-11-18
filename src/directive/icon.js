import Vue from 'vue'
// 注册一个全局自定义指令 `v-focus`
Vue.directive('icon', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el, { value, modifiers }) {
    // 聚焦元素
    el.classList.add('iconfont')
    el.classList.add(value)
    if (modifiers.left) {
      el.classList.add('iconfont--left')
    }
    if (modifiers.right) {
      el.classList.add('iconfont--right')
    }
  }
})
