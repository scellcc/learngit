// import Vue from 'vue'
// import vueRouter from 'vue-router'
//
// Vue.use(vueRouter)
//
//
// const helloWorld = {template:`<div>helloWorld</div>`}
// const hero = {template:`<div>hero</div>`}
//
// const router = new vueRouter({
//     mode:'history', //模式
//     base:__dirname,
//     routes:[  //路由
//         {
//             path : '/' ,
//             component:helloWorld
//         },
//         {
//             path : '/hero' ,
//             component:hero
//         }
//     ]
// })
import Vue from 'vue'
import router from 'vue-router'
import Index from './vue/views/index.vue'
Vue.use(router)

const helloWorld = {
        template:'<div>我可以等在你身后<router-link to="hero">下一句</router-link></div>'
    }
const hero = {template:'<div>像影子追着光梦游<router-link to="/">上一句</router-link></div>'}

const index = Index

const routers = new router ({
    mode:"history",
    base:__dirname,
    routes:[
        { path: '/', component: helloWorld },
        { path: '/hero', component: hero },
        { path: '/video', component: index }
    ]
})



export default routers


