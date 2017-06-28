<template>
    <div id="app">

        <div v-transfer-dom>
            <loading v-model="isLoading"></loading>
        </div>

        <view-box ref="viewBox" :body-padding-top="bodyPaddingTop" :body-padding-bottom="bodyPaddingBottom">
            <!-- <x-header
                class="page-title"
                slot="header"
                :left-options="leftOptions"
                :right-options="rightOptions"
                :title="title"
                :transition="headerTransition"
            ></x-header> -->


            <transition :name="'vux-pop-' + (direction === 'forward' ? 'in' : 'out')">
                <router-view class="router-view"></router-view>
            </transition>


            <tabbar class="page-tabbar" icon-class="vux-center" slot="bottom" v-if="showTabbar">
                <tabbar-item :link="{path:'/'}" :selected="route.path !== '/statistics'">
                    <span class="tabbar-item" slot="icon" style="position:relative;top: -2px;"><i class="iconfont icon-gongchengdangan"></i></span>
                    <span slot="label">项目</span>
                </tabbar-item>

                <tabbar-item :link="{path:'/statistics'}" :selected="route.path === '/statistics'">
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
            // 微信配置
            this.$http(window.API.WXSign, {
                params: {
                    url: location.href.split('#')[0]
                }
            }).then(result => {
                let data = result.data.data

                window.access_token = data.access_token
                window.sessionStorage.setItem('access_token', data.access_token)

                window.wx.config({
                    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: data.appId, // 必填，企业号的唯一标识，此处填写企业号corpid
                    timestamp: data.timestamp, // 必填，生成签名的时间戳
                    nonceStr: data.nonceStr, // 必填，生成签名的随机串
                    signature: data.signature, // 必填，签名，见附录1
                    jsApiList: [
                        'chooseImage',
                        'previewImage',
                        'uploadImage',
                        'downloadImage',
                        'getNetworkType',
                        'hideOptionMenu',
                        'showOptionMenu',
                        'hideMenuItems',
                        'showMenuItems',
                        'hideAllNonBaseMenuItem',
                        'showAllNonBaseMenuItem',
                        'closeWindow'
                    ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                })

                window.wx.ready(function () {
                    console.info('wx ready')
                })

                window.wx.error(function (err) {
                    console.info('wx error:', err)
                })

                window.wx.checkJsApi({
                    jsApiList: ['chooseImage'],
                    success: function (res) {
                        console.info(res)
                    }
                })
            })
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
                    showBack: false
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
                if (this.route.path === '/reportDetails') return '汇报详情'

                if (this.route.path === '/addEvaluate') return '评价'
                if (this.route.path === '/evaluateDetails') return '评价详情'

                return this.componentName ? `Demo/${this.componentName}` : '报表'
            },

            bodyPaddingTop () {
                // return '46px'
                return 0
            },

            bodyPaddingBottom () {
                if (this.route.path === '/taskDetails' || this.route.path === '/statistics') {
                    return '0'
                } else {
                    return '56px'
                }
            },

            showTabbar () {
                if (this.route.path === '/taskDetails' || this.route.path === '/statistics') {
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

    #app .weui-tabbar.page-tabbar {
        background-color: #676a75;
    }

    #app .weui-tabbar__item{
        color: #FFF;
    }

    #app .weui-tabbar__label{
        color: #FFF;
    }

    // #app .weui-bar__item_on{
    //     background-color: #555;
    // }

    #app .weui-bar__item_on .weui-tabbar__icon{
        color: #FFF;
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
        background-color: #EEE;
    }

    .weui-tabbar.page-tabbar {
        background-color: #EEE;
    }

    .vux-header.page-title .vux-header-title, .vux-header h1 {
        font-size: 20px;
        color: #333;
    }

    .page-tabbar .weui-tabbar__label{
        font-size: 1rem;
    }

    .page-tabbar .weui-tabbar__icon {
        width: 25px;
        height: 25px;
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
