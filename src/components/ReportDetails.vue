<template>
    <div class="task-details">
        <div class="task-details-summary">
            <h1>{{taskName}}</h1>
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
                                <li v-for="(src, index) in imageSrcs"
                                    class="weui-uploader__file previewer-img"
                                    @click='preview(index)'
                                >
                                    <img class="uploader__image" :src="src">
                                </li>
                            </ul>
                    </div>
                </div>

                <div v-transfer-dom>
                    <previewer :list="previewImages" ref="previewer" :options="options"></previewer>
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

                taskName: null,
                reportId: null,
                reportor: null,
                reportDate: null,

                actualTimeStart: null,
                actualTimeEnd: null,

                progress: null,
                comment: '按时完成了，很好。',

                charger: null,
                medias: [],
                imageSrcs: [],

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
            previewImages () {
                var images = []
                this.imageSrcs.forEach((src, index) => {
                    // Get image real size.
                    (function (src, index) {
                        var image = new Image()
                        image.src = src
                        image.onload = function () {
                            images[index].w = image.width
                            images[index].h = image.height
                        }
                    })(src, index)

                    images.push({
                        src: src,
                        w: 960,
                        h: 1280
                    })
                })
                return images
            }
        },

        methods: {
            getTaskDetails () {
                this.loading = true

                return this.$http(window.API.reportDetails, {
                    params: {
                        reportId: this.reportId
                    }
                }).then(result => {
                    let data = result.data.data
                    this.loading = false

                    this.taskName = data.taskName
                    this.reportor = data.reportor
                    this.progress = data.progress
                    this.reportDate = data.reportDate
                    this.actualTimeStart = data.actualTimeStart
                    this.actualTimeEnd = data.actualTimeEnd
                    this.comment = data.comment
                    this.medias = data.medias

                    this.showImages()
                })
            },

            // 预览图片
            preview (index) {
                this.$refs.previewer.show(index)
            },

            showImages () {
                var accessToken = window.access_token || window.sessionStorage.getItem('access_token')
                this.medias.forEach(media => {
                    this.imageSrcs.push([
                        'https://qyapi.weixin.qq.com/cgi-bin/media/get?access_token=',
                        accessToken,
                        '&media_id=',
                        media.media_id
                    ].join(''))
                })
            }
        },

        watch: {

        },

        created () {
            this.reportId = this.$route.query.reportId

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
