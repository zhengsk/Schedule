<template>
    <div class="task-details">
        <div class="task-details-summary">
            <h1>主体工程</h1>

            <group>
                <cell title="责任人：" :value="charger"></cell>
                <cell title="评价人：" :value="planEvaluateName"></cell>
                <cell title="计划时间：" :value="expectTimeStart + ' - ' + expectTimeEnd"></cell>
                <cell title="实际时间：" :value="expectTimeStart + ' - ' + expectTimeEnd"></cell>
            </group>

            <div class="tab-swiper vux-center" id="reportWrapper">
                <ul class="report-list">
                    <li v-for='item in reportList'>
                        <div class="report-time">
                            <span>时间：</span><span v-text='item.date'></span>
                            <span class="report-reportor">{{item.reportor}}</span>
                        </div>
                        <div class="report-info">
                            <span class="report-progress">
                                进度<br/>
                                <span>{{item.progress}}%</span>
                            </span>
                            <span class="report-comment">
                                {{item.comment}}
                            </span>
                        </div>
                    </li>
                </ul>
            </div>

            <group :title="'评价'">
                <popup-picker title="评价类型"
                    :data="evaluateTypeData"
                    :show-name="true"
                    v-model="evaluateId"
                    placeholder="请选择"
                    @on-change="getEvaluateResult"
                ></popup-picker>

                <popup-picker title="进度评价" :data="evaluateResultData" :show-name="true" v-model="evaluateResult" placeholder="请选择"></popup-picker>
    </group>
                <x-textarea title="评价说明：" v-model="comment" placeholder="评价内容"></x-textarea>
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
                swiperHeight: '500px',

                evaluateTypeData: [],
                evaluateId: [],

                evaluateResultData: [],
                evaluateResult: []
            }
        },

        computed: {
        },

        methods: {
            // 评价类型下拉
            getEvaluateType () {
                return this.$http(window.API.evaluateType, {
                    params: {
                        taskId: this.taskId
                    }
                }).then(result => {
                    let data = result.data.data

                    data = data.map(item => {
                        return {
                            name: item.projectName,
                            value: item.evaluateId
                        }
                    })

                    this.evaluateTypeData = [data]
                })
            },

            // 评价结果下拉列表
            getEvaluateResult () {
                return this.$http(window.API.evaluateResult, {
                    params: {
                        evaluateId: this.evaluateId[0]
                    }
                }).then(result => {
                    let data = result.data.data

                    data = data.map(item => {
                        return {
                            name: item.resultName,
                            value: item.resultId
                        }
                    })

                    this.evaluateResultData = [data]
                })
            },

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

            this.getEvaluateType()
        },

        mounted () {
        }
    }
</script>

<style lang="less">
    .report-list {
        padding-bottom: 0;
    }
</style>
