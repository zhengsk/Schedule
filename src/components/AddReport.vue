<template>
    <div class="task-details">
        <div class="task-details-summary">
            <h1>{{taskName}}</h1>

            <group>
                <cell title="责任人：" :value="charger"></cell>
                <cell title="评价人：" :value="planEvaluateName"></cell>

                <template v-if='!timeStartAble'>
                    <cell title="开始时间" :value="actualTimeStart"></cell>
                </template>

                <template v-if='timeStartAble'>
                    <calendar v-model="actualTimeStart" :title="'开始时间'"></calendar>
                </template>

                <template v-if='!timeEndAble'>
                    <cell title="结束时间" :value="actualTimeEnd"></cell>
                </template>

                <template v-if='timeEndAble'>
                    <calendar v-model="actualTimeEnd" :title="'结束时间'" :start-date="actualTimeStart"></calendar>
                </template>


                <cell primary="content">
                    <div slot="title" v-html="progressTitle"></div>
                    <range v-model="progress" :min="0" :max="100" :range-bar-height="5"></range>
                </cell>
                <x-textarea title="汇报描述：" v-model="comment" placeholder="汇报内容"></x-textarea>

                <div class="weui-uploader" style="padding:15px;">
                      <div class="weui-uploader__hd">
                          <p class="weui-uploader__title">图片上传</p>
                      </div>
                      <div class="weui-uploader__bd">
                            <ul class="weui-uploader__files" id="uploaderFiles">
                                <li v-for="src in media_srcs"
                                    class="weui-uploader__file"
                                >
                                    <img class="uploader__image" :src="src">
                                </li>

                            </ul>
                            <div class="weui-uploader__input-box" @click='chooseImage'>
                                <input id="uploaderInput" class="weui-uploader__input" type="button" />
                            </div>
                    </div>
                </div>

            </group>

            <box gap="10px 10px"><x-button type="primary" @click.native="submit">提交</x-button></box>

        </div>

        <div v-transfer-dom>
            <loading v-model="loading" :text="loadingText"></loading>
            <toast v-model="commited" text="提交成功"></toast>
        </div>
    </div>
</template>

<script>
    import { XHeader, Icon, Toast, Box, PopupPicker, Calendar, Range, XTextarea, Group, Cell, Card,
     Swiper, SwiperItem, XButton, TransferDomDirective as TransferDom, Loading } from 'vux'

    export default {
        components: {
            XHeader,
            Icon,
            Toast,
            Box,
            PopupPicker,
            Calendar,
            Range,
            XTextarea,

            Card,
            Swiper,
            SwiperItem,
            XButton,
            Group,
            Cell,
            Loading
        },

        directives: {
            TransferDom
        },

        data () {
            return {
                loading: false,
                loadingText: '正在提交',

                commited: false,

                taskId: null,
                taskName: null,
                expectTimeStart: null,
                expectTimeEnd: null,

                actualTimeStart: '',
                actualTimeEnd: '',

                progress: 0,
                comment: '',

                charger: null,
                planEvaluateName: null,
                reportList: [],
                evaluateList: [],

                showListType: null,
                swiperHeight: '500px',

                media_srcs: [],
                media_ids: [],
                media_Names: []
            }
        },

        computed: {
            timeStartAble () {
                if (this.actualTimeStart) {
                    return false
                } else {
                    var date = new Date()
                    var datas = [
                        date.getFullYear(),
                        ('0' + (date.getMonth() + 1)).substr(-2),
                        ('0' + date.getDate()).substr(-2)
                    ]
                    this.actualTimeStart = datas.join('-')
                    return true
                }
            },

            timeEndAble () {
                if (this.preTimeEnd === undefined) {
                    this.preTimeEnd = this.progress
                }

                if (this.progress === 100) {
                    var date = new Date()
                    var datas = [
                        date.getFullYear(),
                        ('0' + (date.getMonth() + 1)).substr(-2),
                        ('0' + date.getDate()).substr(-2)
                    ]
                    this.actualTimeEnd = datas.join('-')
                    return true
                } else {
                    this.actualTimeEnd = ''
                    return false
                }
            },
            progressTitle () {
                return '进度：' + this.progress + '%'
            }
        },

        methods: {
            getTaskDetails () {
                this.loading = true

                return this.$http(window.API.taskDetails, {
                    params: {
                        taskId: this.taskId
                    }
                }).then(result => {
                    let data = result.data.data
                    this.taskName = data.taskName
                    this.expectTimeStart = data.expectTimeStart
                    this.expectTimeEnd = data.expectTimeEnd
                    this.charger = data.charger
                    this.planEvaluateName = data.planEvaluateName
                    this.reportList = data.reportList
                    this.evaluateList = data.evaluateList
                    this.loading = false
                    this.progress = data.progress

                    this.actualTimeStart = data.actualTimeStart
                    this.actualTimeEnd = data.actualTimeEnd
                })
            },

            // 切换记录：汇报记录、评价记录
            changeListType (val) {
                this.showListType = {
                    report: 0,
                    evaluate: 1
                }[val]
            },

            // 提交汇报
            submit () {
                return this.$http.post(window.API.addReport, {
                    taskId: this.taskId,
                    progress: this.progress,
                    actualTimeStart: this.actualTimeStart,
                    actualTimeEnd: this.actualTimeEnd,
                    comment: this.comment,
                    media_ids: this.media_ids,
                    media_Names: this.media_Names
                }).then(result => {
                    if (result.data.success) {
                        this.loading = false
                        this.commited = true
                        this.$router.go(-1)
                    }
                })
            },

            chooseImage () {
                let self = this
                window.wx.chooseImage({
                    count: 9, // 默认9
                    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                    success: function (res) {
                        console.info(res)
                        var localIds = res.localIds // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                        // addElementImg(localIds[0])
                        self.upImage(localIds)
                    }
                })
            },

            upImage (localIds) {
                var self = this

                let uploadImage = function (localIds) {
                    var localId = localIds.shift()
                    self.media_srcs.push(localId)

                    window.wx.uploadImage({
                        localId: localId, // 需要上传的图片的本地ID，由chooseImage接口获得
                        isShowProgressTips: 1, // 默认为1，显示进度提示
                        success: function (res) {
                            self.media_ids.push(res.serverId) // 返回图片的服务器端ID
                            self.media_Names.push(new Date().getTime()) // 返回图片的服务器端ID
                            if (localIds.length) {
                                uploadImage(localIds)
                            }
                        }
                    })
                }
                uploadImage(localIds)
            }
        },

        watch: {

        },

        created () {
            this.taskId = this.$route.query.taskId

            this.getTaskDetails().then(result => {
                this.showListType = 0
            })
        },

        mounted () {

        }
    }
</script>

<style lang="less">
    @import '~vux/src/styles/weui/widget/weui-uploader/index.less';

    .weui-uploader__file {
        position: relative;
        border: 1px solid #D9D9D9;
        background-color: #ebebeb;
        padding: 2px;
        box-sizing: border-box;

        .uploader__image {
            max-width: 73px;
            max-height: 73px;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%)
        }
    }
</style>
