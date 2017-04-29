<template>
    <div id="app">

        <div v-transfer-dom>
            <loading v-model="isLoading"></loading>
        </div>

        <view-box ref="viewBox" body-padding-top="46px" body-padding-bottom="55px">
            <x-header
                slot="header"
                style="width:100%;position:absolute;left:0;top:0;z-index:100;"
                :left-options="leftOptions"
                :right-options="rightOptions"
                :title="title"
                :transition="headerTransition"
            ></x-header>


            <transition :name="'vux-pop-' + (direction === 'forward' ? 'in' : 'out')">
                <router-view class="router-view"></router-view>
            </transition>


            <tabbar class="vux-demo-tabbar" icon-class="vux-center" slot="bottom">
                <tabbar-item :link="{path:'/'}" :selected="route.path === '/'">
                    <span class="demo-icon-22 vux-demo-tabbar-icon-home" slot="icon" style="position:relative;top: -2px;">&#xe637;</span>
                    <span slot="label">Home</span>
                </tabbar-item>
                <tabbar-item :link="{path:'/demo'}" badge="9">
                    <span class="demo-icon-22" slot="icon">&#xe633;</span>
                    <span slot="label">Demos</span>
                </tabbar-item>
                <tabbar-item :link="{path:'/project/donate'}" :selected="route.path === '/project/donate'" show-dot>
                    <span class="demo-icon-22" slot="icon">&#xe630;</span>
                    <span slot="label">Donate</span>
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
                    showMore: true
                }
            },

            headerTransition () {
                return this.direction === 'forward' ? 'vux-header-fade-in-right' : 'vux-header-fade-in-left'
            },

            title () {
                if (this.route.path === '/') return 'Home'
                if (this.route.path === '/project/donate') return 'Donate'
                if (this.route.path === '/demo') return 'Demo list'
                return this.componentName ? `Demo/${this.componentName}` : 'Demo/~~'
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
        height: 100%;
        width: 100%;
        overflow-x: hidden;
    }

    #app {
        height: 100%;
    }

    .router-view {
        width: 100%;
        top: 46px;
    }
</style>
