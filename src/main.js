// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import {sync} from 'vuex-router-sync'
import { AjaxPlugin } from 'vux'

import App from './App'
import ProjectList from './components/ProjectList'
import TaskList from './components/TaskList'

Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(AjaxPlugin)

window.API = {
    projectList: '/static/api/projectList.json',
    taskList: '/static/api/taskList.json'
}

const routes = [{
    path: '/',
    component: ProjectList
},
{
    path: '/taskList',
    component: TaskList
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
new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app-box')
