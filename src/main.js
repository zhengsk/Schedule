// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import {sync} from 'vuex-router-sync'
import { AjaxPlugin } from 'vux'

import API from './api.js'
import App from './App'
import ProjectList from './components/ProjectList'
import TaskList from './components/TaskList'
import TaskDetails from './components/TaskDetails'

import AddReport from './components/AddReport'
import AddEvaluate from './components/AddEvaluate'
import EvaluateDetails from './components/EvaluateDetails'

import ReportDetails from './components/ReportDetails'

import Statistics from './components/Statistics'

Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(AjaxPlugin)

// Set API to global.
window.API = API

const routes = [{
    path: '/',
    component: ProjectList,
    meta: {
        keepAlive: true
    }
},
{
    path: '/index.html',
    component: ProjectList,
    meta: {
        keepAlive: true
    }
},
{
    path: '/taskList',
    component: TaskList,
    meta: {
        keepAlive: true
    }
},
{
    path: '/taskDetails',
    component: TaskDetails,
    meta: {
        keepAlive: true
    }
},
{
    path: '/addReport',
    component: AddReport,
    meta: {
        keepAlive: false
    }
},
{
    path: '/addEvaluate',
    component: AddEvaluate,
    meta: {
        keepAlive: false
    }
},
{
    path: '/reportDetails',
    component: ReportDetails,
    meta: {
        keepAlive: false
    }
},
{
    path: '/evaluateDetails',
    component: EvaluateDetails,
    meta: {
        keepAlive: false
    }
},
{
    path: '/statistics',
    component: Statistics,
    meta: {
        keepAlive: false
    }
}]

const router = new VueRouter({
    mode: 'history',
    base: '/mobile/sch/',
    routes,
    scrollBehavior (to, from, savedPosition) {
        let routerView = document.querySelector('#routerView')
        if (routerView) {
            routerView.parentNode.scrollTop = to.meta.scrollTop || 0
        }
    }
})

router.beforeEach((to, from, next) => {
    let routerView = document.querySelector('#routerView')
    if (routerView) {
        let top = routerView.parentNode.scrollTop
        from.meta.scrollTop = top
    }
    next()
})

router.afterEach((to, from) => {
    // alert(JSON.stringify(to))
})

let store = new Vuex.Store({
    modules: {
    }
})

store.registerModule('vux', {
    state: {
        demoScrollTop: 0,
        isLoading: false,
        direction: 'forward'
    },

    mutations: {
        updateDemoPosition (state, payload) {
            state.demoScrollTop = payload.top
        },
        updateLoadingStatus (state, payload) {
            state.isLoading = payload.isLoading
        },
        updateDirection (state, payload) {
            state.direction = payload.direction
        }
    },

    actions: {
        updateDemoPosition ({commit}, top) {
            commit({type: 'updateDemoPosition', top: top})
        }
    }
})

sync(store, router)

FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
let vm = new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app-box')

AjaxPlugin.$http.interceptors.request.use((req) => {
    vm.$store.commit('updateLoadingStatus', {isLoading: true})
    return req
})

AjaxPlugin.$http.interceptors.response.use((res) => {
    if (res.status !== 200 || res.data.success !== true) {
        alert(res.data.error)
        return Promise.reject(res)
    }
    vm.$store.commit('updateLoadingStatus', {isLoading: false})
    return res
}, (error) => {
    vm.$store.commit('updateLoadingStatus', {isLoading: false})
    return Promise.reject(error)
})
