<template>
    <div>
        <group class="project-list">
            <cell v-for="item in projectList" :key="item.projectId" :title="item.projectName" :link="'/taskList?projectId=' + encodeURIComponent(item.projectId)"></cell>
        </group>
    </div>

</template>

<script>
    import { XHeader, Group, Cell } from 'vux'

    export default {
        components: {
            XHeader,
            Group,
            Cell
        },
        data () {
            return {
                loading: false,

                projectList: []
            }
        },

        mounted () {
            let self = this

            this.$http(window.API.projectList).then(result => {
                let data = result.data
                self.projectList = data.data
            })

            // 微信配置
            this.$http(window.API.WXSign, {
                params: {
                    url: location.href.split('#')[0]
                }
            }).then(result => {
                let data = result.data.data

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
        }
    }
</script>

<style>
.project-list .weui-cells{
    margin-top: 0;
}
</style>
