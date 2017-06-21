<template>
    <div class="task-details">
        <div class="task-details-summary">
            <h1>{{taskName}}</h1>

            <group>
                <cell title="计划时间：" :value="expectTimeStart + '-' + expectTimeEnd"></cell>
                <cell title="责任人：" :value="charger"></cell>
                <cell title="质量评价人：" :value="qualityEvaluateName"></cell>
                <cell title="进度评价人：" :value="planEvaluateName"></cell>
            </group>

            <sticky scroll-box="vux_view_box_body" :offset="46" :check-sticky-support="true">
                <tab :line-width="3" v-model="showListType">
                    <tab-item @on-item-click="changeListType('report')">汇报记录</tab-item>
                    <tab-item @on-item-click="changeListType('evaluate')">评价记录</tab-item>
                </tab>
            </sticky>

            <swiper v-model="showListType" :height='swiperHeight' :show-dots="false" :min-moving-distance='50'>
                <swiper-item>
                    <div class="tab-swiper vux-center" id="reportWrapper">
                        <ul class="report-list">
                            <li v-for='item in reportList' @click="reportDetails(item.reportId)">
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
                </swiper-item>
                <swiper-item>
                    <div class="tab-swiper vux-center" id="evaluateWrapper">
                        <ul class="report-list">
                            <li v-for='item in evaluateList'  @click="evaluateDetails(item.evaluateBillId)">
                                <div class="report-time">
                                    <span>时间：</span><span v-text='item.bookDate'></span>
                                    <span class="report-reportor">{{item.person}}</span>
                                </div>
                                <div class="report-info evaluate-info">
                                    <div>
                                        <span>{{item.type}}：</span>{{item.result}}
                                    </div>
                                    <div class="evaluate-comment">
                                        <span>评价内容：</span>{{item.comment}}
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </swiper-item>
            </swiper>

            <div class="button-wrapper">
                <flexbox>
                    <flexbox-item>
                        <x-button type="primary" @click.native="addReport">汇 报</x-button>
                    </flexbox-item>
                    <template v-if="isShowAddEvaluate">
                        <flexbox-item>
                            <x-button type="primary" @click.native="addEvaluate">评 价</x-button>
                        </flexbox-item>
                    </template>
                </flexbox>
            </div>
        </div>

    </div>
</template>

<script>
    import { XHeader, Icon, Flexbox, FlexboxItem, PopupPicker, Sticky, Tab, TabItem, Group, Cell, Card,
     Swiper, SwiperItem, XButton, TransferDomDirective as TransferDom } from 'vux'

    export default {
        components: {
            XHeader,
            Icon,
            Flexbox,
            FlexboxItem,
            PopupPicker,
            Sticky,
            Tab,
            TabItem,
            Card,
            Swiper,
            SwiperItem,
            XButton,
            Group,
            Cell
        },

        directives: {
            TransferDom
        },

        data () {
            return {
                taskId: null,
                taskName: null,
                expectTimeStart: null,
                expectTimeEnd: null,
                charger: null,
                planEvaluateName: '',
                qualityEvaluateName: '',
                reportList: [],
                evaluateList: [],

                showListType: null,
                swiperHeight: '500px',

                isShowAddEvaluate: false
            }
        },

        computed: {
        },

        methods: {
            getTaskDetails () {
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
                    this.qualityEvaluateName = data.qualityEvaluateName
                    this.reportList = data.reportList
                    this.evaluateList = data.evaluateList

                    if (data.progress === 100) {
                        this.getEvaluateType()
                    }
                })
            },

            // 评价类型下拉, 如果没有说明没有权限
            getEvaluateType () {
                return this.$http(window.API.evaluateType, {
                    params: {
                        taskId: this.taskId
                    }
                }).then(result => {
                    let data = result.data.data
                    this.isShowAddEvaluate = data.length
                })
            },

            // 进入汇报详情页面
            reportDetails (reportId) {
                this.$router.push({
                    path: 'reportDetails',
                    query: {
                        reportId: reportId
                    }
                })
            },

            // 进入评价详情页面
            evaluateDetails (evaluateBillId) {
                this.$router.push({
                    path: 'evaluateDetails',
                    query: {
                        evaluateBillId: evaluateBillId
                    }
                })
            },

            // 切换记录：汇报记录、评价记录
            changeListType (val) {
                this.showListType = {
                    report: 0,
                    evaluate: 1
                }[val]
            },

            // 汇报
            addReport () {
                this.$router.push({path: 'addReport', query: { taskId: this.taskId }})
            },

            addEvaluate () {
                this.$router.push({path: 'addEvaluate', query: { taskId: this.taskId }})
            }
        },

        watch: {
            'showListType' (val) {
                let id = val === 0 ? 'reportWrapper' : 'evaluateWrapper'
                this.swiperHeight = document.getElementById(id).offsetHeight + 'px'
                document.getElementById(id).parentNode.parentNode.style.height = this.swiperHeight
            }
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

<style>

    .task-details-summary h1{
        font-size: 1.4rem;
        text-align: center;
        color: #555;
        margin: 5px 0 -10px;

    }

    .report-list {
        padding-bottom: 70px;
    }

    .report-list li{
        position: relative;
        font-size: 1rem;
        list-style: none;
        margin: 6px 10px;
        padding: 6px 15px 2px;
        border-bottom: 1px solid #EEE;
        overflow: hidden;
        background-color: #F5F5F5;

    }

    .report-list li:active{
        background-color: #ECECEC;
    }



    .report-list .report-reportor{
        float: right;
    }

    .report-info {
        display: table;
        width: 100%;
        padding: 5px 0;
    }

    .report-list .report-time {
        border-bottom: 1px dashed #DDD;
        color: #555;
        margin-bottom: 5px;
        padding-bottom: 3px;
    }

    .report-list .report-progress{
        display: table-cell;
        vertical-align: middle;

        border-right: 1px solid #DDD;
        box-sizing: border-box;
        width: 15%;
    }

    .report-list .report-comment{
        position: relative;
        display: table-cell;
        box-sizing: border-box;
        padding: 0 1rem 0 8px;
        width: 85%;
    }

    .report-list .report-comment::after {
        content: " ";
        display: inline-block;
        height: 8px;
        width: 8px;
        border-width: 2px 2px 0 0;
        border-color: #C8C8CD;
        border-style: solid;
        -webkit-transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
        transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
        position: relative;
        top: -4px;
        position: absolute;
        top: 50%;
        margin-top: -6px;
        right: 0;
    }

    .evaluate-info {
        position: relative;
        padding-right: 10px;
        box-sizing: border-box;
    }

    .evaluate-comment {
        padding-top: 8px;
    }

    .evaluate-info span{
        color: #555;
    }

    .evaluate-info::after {
        content: " ";
        display: inline-block;
        height: 8px;
        width: 8px;
        border-width: 2px 2px 0 0;
        border-color: #C8C8CD;
        border-style: solid;
        -webkit-transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
        transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
        position: relative;
        top: -4px;
        position: absolute;
        top: 50%;
        margin-top: -6px;
        right: 0;
    }

    .button-wrapper {
        box-sizing: border-box;
        width: 100%;
        position: fixed;
        padding: 10px;
        bottom: 0;
        background-color: #FFF;
        border-top: 1px solid #DDD
    }

</style>
