<template>
    <div class="task-details">
        <div class="task-details-summary">
            <h1>主体工程</h1>
            <!--
                "reportDate":"17-05-09",
                "actualTimeStart":"17-05-08",
                "actualTimeEnd":"17-05-18",
                "reportId":"2ajfNulLQcGaWiabuAveunX1RfM=",
                "reportor":"刘志鹏",
                "comment":"dsdsdsd",
                "progress":20,
                "medias":[
                   {
                       "media_id":"1UiYYLh1ceg3Dfr4P1ZV2LJycj9Q9LnWjpbJqj-D6tWBk9uRK9PfZnKM1CjlK_uaIKsEqnVL2eRTseB90sNrGhw",
                       "media_Name":"111111111"
                   }
                ]
             -->
            <group>
                <cell title="汇报人：" :value="reportor"></cell>
                <cell title="汇报时间：" :value="reportDate"></cell>

                <cell title="开始时间：" :value="actualTimeStart"></cell>
                <cell title="结束时间：" :value="actualTimeEnd"></cell>

                <cell :title="'进度：' + progress + '%'" primary="content">
                    <range v-model="progress" :disabled='true' :min="0" :max="100" :range-bar-height="5"></range>
                </cell>
                <x-textarea title="汇报描述：" v-model="comment" :readonly='true' placeholder="汇报内容"></x-textarea>

                <div class="weui-uploader" style="padding:15px;">
                      <div class="weui-uploader__hd">
                          <p class="weui-uploader__title">图片上传</p>
                      </div>
                      <div class="weui-uploader__bd">
                            <ul class="weui-uploader__files" id="uploaderFiles">
                                <li v-for="(item, index) in medias" class="weui-uploader__file previewer-img" :style="'background-image:url(' + item.src + ')'" @click="preview(index)"></li>
                            </ul>
                    </div>
                </div>

                <div v-transfer-dom>
                    <previewer :list="medias" ref="previewer" :options="options"></previewer>
                </div>

            </group>

        </div>

    </div>
</template>

<script>
    import { XHeader, Icon, Toast, Box, PopupPicker, Calendar, Range, XTextarea, Group, Cell, Card,
     Swiper, SwiperItem, XButton, TransferDomDirective as TransferDom, Loading, Previewer } from 'vux'

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
            Loading,
            Previewer
        },

        directives: {
            TransferDom
        },

        data () {
            return {
                loading: false,

                taskId: null,
                reportor: null,
                reportDate: null,

                actualTimeStart: null,
                actualTimeEnd: null,

                progress: null,
                comment: '按时完成了，很好。',

                charger: null,

                medias: [
                    {
                        src: 'https://ooo.0o0.ooo/2017/05/17/591c271ab71b1.jpg',
                        w: 800,
                        h: 400
                    },
                    {
                        src: 'https://ooo.0o0.ooo/2017/05/17/591c271acea7c.jpg',
                        w: 1200,
                        h: 900
                    }
                ],
                options: {
                    getThumbBoundsFn (index) {
                        // find thumbnail element
                        let thumbnail = document.querySelectorAll('.previewer-img')[index]
                        // get window scroll Y
                        let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
                        // optionally get horizontal scroll
                        // get position of element relative to viewport
                        let rect = thumbnail.getBoundingClientRect()
                        // w = width
                        return {x: rect.left, y: rect.top + pageYScroll, w: rect.width}
                        // Good guide on how to get element coordinates:
                        // http://javascript.info/tutorial/coordinates
                    }
                }
            }
        },

        computed: {
        },

        methods: {
            getTaskDetails () {
                this.loading = true

                return this.$http(window.API.reportDetails, {
                    params: {
                        taskId: this.taskId
                    }
                }).then(result => {
                    let data = result.data.data
                    this.loading = false

                    this.reportor = data.reportor
                    this.progress = data.progress
                    this.reportDate = data.reportDate
                    this.actualTimeStart = data.actualTimeStart
                    this.actualTimeEnd = data.actualTimeEnd
                    this.comment = data.comment
                    // this.medias = data.medias //@TODO
                })
            },

            // 预览图片
            preview (index) {
                this.$refs.previewer.show(index)
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
