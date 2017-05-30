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

Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(AjaxPlugin)

// Set API to global.
window.API = API

const routes = [{
    path: '/',
    component: ProjectList
},
{
    path: '/taskList',
    component: TaskList
},
{
    path: '/taskDetails',
    component: TaskDetails
},
{
    path: '/addReport',
    component: AddReport
},
{
    path: '/addEvaluate',
    component: AddEvaluate
},
{
    path: '/reportDetails',
    component: ReportDetails
},
{
    path: '/evaluateDetails',
    component: EvaluateDetails
}]

const router = new VueRouter({
    routes
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
        return Promise.reject(res)
    }
    vm.$store.commit('updateLoadingStatus', {isLoading: false})
    return res
}, (error) => {
    vm.$store.commit('updateLoadingStatus', {isLoading: false})
    return Promise.reject(error)
})
