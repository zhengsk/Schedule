<template>
    <div class="task-details">
        <div class="task-details-summary">
            <h1>主体工程</h1>

            <group>
                <cell title="责任人：" :value="charger"></cell>
                <cell title="评价人：" :value="planEvaluateName"></cell>
                <calendar v-model="actualTimeStart" :title="'开始时间'"></calendar>
                <calendar v-model="actualTimeEnd" :title="'结束时间'" :start-date="actualTimeStart"></calendar>
                <cell :title="'进度：' + progress" primary="content">
                    <range v-model="progress" :min="0" :max="100" :range-bar-height="5"></range>
                </cell>
                <x-textarea title="汇报描述：" v-model="comment" placeholder="汇报内容"></x-textarea>

                <div class="weui-uploader" style="padding:15px;">
                      <div class="weui-uploader__hd">
                          <p class="weui-uploader__title">图片上传</p>
                          <div class="weui-uploader__info">0/2</div>
                      </div>
                      <div class="weui-uploader__bd">
                            <ul class="weui-uploader__files" id="uploaderFiles">
                                <li class="weui-uploader__file" style="background-image:url(https://static.vux.li/uploader_bg.png)"></li>
                                <li class="weui-uploader__file" style="background-image:url(https://static.vux.li/uploader_bg.png)"></li>
                                <li class="weui-uploader__file" style="background-image:url(https://static.vux.li/uploader_bg.png)"></li>
                                <li class="weui-uploader__file weui-uploader__file_status" style="background-image:url(https://static.vux.li/uploader_bg.png)">
                                  <div class="weui-uploader__file-content">
                                      <i class="weui-icon-warn"></i>
                                  </div>
                                </li>
                                <li class="weui-uploader__file weui-uploader__file_status" style="background-image:url(https://static.vux.li/uploader_bg.png)">
                                  <div class="weui-uploader__file-content">50%</div>
                                </li>
                            </ul>
                            <div class="weui-uploader__input-box">
                                <input id="uploaderInput" class="weui-uploader__input" type="file" accept="image/*" multiple />
                            </div>
                    </div>
                </div>

                <box gap="10px 10px"><x-button type="primary" @click.native="submit">提交</x-button></box>
            </group>


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
                expectTimeStart: null,
                expectTimeEnd: null,

                actualTimeStart: null,
                actualTimeEnd: null,

                progress: null,
                comment: null,

                charger: null,
                planEvaluateName: null,
                reportList: [],
                evaluateList: [],

                showListType: null,
                swiperHeight: '500px'
            }
        },

        computed: {
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
                this.loading = true

                setTimeout(() => {
                    this.loading = false
                    this.commited = true
                    setTimeout(() => {
                        this.$router.go(-1)
                    }, 800)
                }, 500)
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
</style>
