<template>
    <div class="task-details">
        <div class="task-details-summary">
            <h1>主体工程</h1>

            <group>
                <cell title="计划时间：" :value="expectTimeStart + '-' + expectTimeEnd"></cell>
                <cell title="责任人：" :value="charger"></cell>
                <cell title="评价人：" :value="planEvaluateName"></cell>
            </group>

            <sticky scroll-box="vux_view_box_body" :offset="46" :check-sticky-support="true">
                <tab :line-width="3">
                    <tab-item selected @on-item-click="changeListType('report')">汇报记录</tab-item>
                    <tab-item @on-item-click="changeListType('evaluate')">评价记录</tab-item>
                </tab>
            </sticky>

            <swiper v-model="showListType" :height='swiperHeight' :show-dots="false">
                <swiper-item>
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
                </swiper-item>
                <swiper-item>
                    <div class="tab-swiper vux-center" id="evaluateWrapper">
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
                </swiper-item>
            </swiper>
        </div>

        <div v-transfer-dom>
            <loading v-model="loading" :text="'加载中...'"></loading>
        </div>
    </div>
</template>

<script>
    import { XHeader, Icon, Flexbox, FlexboxItem, PopupPicker, Sticky, Tab, TabItem, Group, Cell, Card,
     Swiper, SwiperItem, TransferDomDirective as TransferDom, Loading } from 'vux'

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

                taskId: null,
                expectTimeStart: null,
                expectTimeEnd: null,
                charger: null,
                planEvaluateName: null,
                reportList: [],
                evaluateList: [],

                showListType: 0,
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
                })
            },

            // 切换记录：汇报记录、评价记录
            changeListType (val) {
                this.showListType = {
                    report: 0,
                    evaluate: 1
                }[val]
            }
        },

        watch: {
            'showListType' (val) {
                let id = val === 0 ? 'reportWrapper' : 'evaluateWrapper'
                this.swiperHeight = document.getElementById(id).offsetHeight + 'px'
                console.info(this.swiperHeight)
                document.getElementById(id).parentNode.parentNode.style.height = this.swiperHeight
            }
        },

        created () {
            this.taskId = this.$route.query.taskId

            this.getTaskDetails()
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

    .report-list li{
        font-size: 1rem;
        list-style: none;
        margin: 6px 10px;
        padding: 6px 15px 2px;
        border-bottom: 1px solid #EEE;
        overflow: hidden;
        background-color: #F5F5F5;

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
        display: table-cell;
        box-sizing: border-box;
        padding: 0 0 0 8px;
        width: 85%;
    }

</style>
