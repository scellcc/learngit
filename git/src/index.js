import Vue from 'vue'
import App from './vue/app'
import router from './router'

console.log(router)
new Vue({
    el: '#app',
    router,
    render: h => h(App)
})

