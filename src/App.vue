<template>
    <div id="app">

        <div v-transfer-dom>
            <loading v-model="isLoading"></loading>
        </div>

        <view-box ref="viewBox" :body-padding-top="bodyPaddingTop" :body-padding-bottom="bodyPaddingBottom">
            <x-header
                class="page-title"
                slot="header"
                :left-options="leftOptions"
                :right-options="rightOptions"
                :title="title"
                :transition="headerTransition"
            ></x-header>


            <transition :name="'vux-pop-' + (direction === 'forward' ? 'in' : 'out')">
                <router-view class="router-view"></router-view>
            </transition>


            <tabbar class="page-tabbar" icon-class="vux-center" slot="bottom" v-if="showTabbar">
                <tabbar-item :link="{path:'/'}" :selected="route.path === '/'">
                    <span class="tabbar-item" slot="icon" style="position:relative;top: -2px;"><i class="iconfont icon-gongchengdangan"></i></span>
                    <span slot="label">项目</span>
                </tabbar-item>

                <tabbar-item :link="{path:'/project/donate'}" :selected="route.path === '/report'">
                    <span class="tabbar-item" slot="icon"><i class="iconfont icon-report"></i></span>
                    <span slot="label">报表</span>
                </tabbar-item>
            </tabbar>

        </view-box>

    </div>
</template>

<script>
    import {
        ViewBox,
        XHeader,
        Tabbar,
        TabbarItem,
        Loading,
        TransferDom
    } from 'vux'

    import {
        mapState
    } from 'vuex'

    export default {
        directives: {
            TransferDom
        },
        components: {
            ViewBox,
            XHeader,
            Tabbar,
            TabbarItem,
            Loading
        },
        mounted () {

        },
        beforeDestroy () {
        },
        watch: {
        },
        computed: {
            ...mapState({
                route: state => state.route,
                path: state => state.route.path,
                deviceready: state => state.app.deviceready,
                demoTop: state => state.vux.demoScrollTop,
                isLoading: state => state.vux.isLoading,
                direction: state => state.vux.direction
            }),

            leftOptions () {
                return {
                    showBack: this.route.path !== '/'
                }
            },

            rightOptions () {
                return {
                    showMore: false
                }
            },

            headerTransition () {
                return this.direction === 'forward' ? 'vux-header-fade-in-right' : 'vux-header-fade-in-left'
            },

            title () {
                if (this.route.path === '/') return '工程项目'
                if (this.route.path === '/taskList') return '任务列表'
                if (this.route.path === '/taskDetails') return '任务详情'
                if (this.route.path === '/addReport') return '汇报'
                if (this.route.path === '/addEvaluate') return '评价'
                return this.componentName ? `Demo/${this.componentName}` : 'Demo/~~'
            },

            bodyPaddingTop () {
                return '46px'
            },

            bodyPaddingBottom () {
                if (this.route.path === '/taskDetails') {
                    return '0'
                } else {
                    return '56px'
                }
            },

            showTabbar () {
                if (this.route.path === '/taskDetails') {
                    return false
                } else {
                    return true
                }
            }
        },
        data () {
            return {

            }
        }
    }
</script>

<style lang="less">
    @import '~vux/src/styles/reset.less';

    html,
    body {
        font-size: 14px;
        height: 100%;
        width: 100%;
        overflow: hidden;
    }

    #app {
        height: 100%;
    }

    .router-view {
        width: 100%;
        top: 46px;
    }

    .vux-header.page-title {
        border-bottom: 1px solid #d9d9d9;
        width:100%;
        position:absolute;
        left:0;
        top:0;
        z-index:100;
        background-color: #FFF;
    }

    .vux-header.page-title .vux-header-title, .vux-header h1 {
        font-size: 20px;
        color: #333;
    }

    .page-tabbar .weui-tabbar__label{
        font-size: .85rem;
    }

    .tabbar-item .iconfont{
        font-size: 24px;
    }

    .icon-gongchengdangan {
        position: relative;
        top: -4px;
    }

    .icon-report {
        position: relative;
        top: -7px;
    }
</style>
