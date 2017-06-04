<template>
    <div class="task-details">
        <div class="task-details-summary">
            <h1>{{taskName}}</h1>
            <group>
                <cell title="评价人：" :value="evalucationPerson"></cell>
                <cell title="汇报时间：" :value="bookedDate"></cell>

                <cell title="评价类型：" :value="evaluateType"></cell>

                <div class="weui-cell">
                    <div class="vux-cell-bd vux-cell-primary" style="min-width:6em;">
                        <p>
                            <label class="vux-label">
                                <div><span style="width: 6em;">评价结果：</span></div>
                            </label>
                        </p>
                        <span class="vux-label-desc"></span>
                    </div>
                    <div class="weui-cell__ft">
                        {{result}}
                    </div>
                </div>

                <div class="weui-cell">
                    <div class="vux-cell-bd vux-cell-primary" style="min-width:6em;">
                        <p>
                            <label class="vux-label">
                                <div><span style="width: 6em;">汇报描述：</span></div>
                            </label>
                        </p>
                        <span class="vux-label-desc"></span>
                    </div>
                    <div class="weui-cell__ft">
                        {{comment}}
                    </div>
                </div>

            </group>

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
                evalucationPerson: null,
                taskName: null,
                evaluateType: null,
                result: null,
                comment: null,
                bookedDate: null,

                loading: false
            }
        },

        computed: {
        },

        methods: {
            getTaskDetails () {
                this.loading = true

                return this.$http(window.API.evaluateDetails, {
                    params: {
                        evaluateBillId: this.$route.query.evaluateBillId
                    }
                }).then(result => {
                    let data = result.data.data
                    this.loading = false

                    this.evalucationPerson = data.evalucationPerson
                    this.taskName = data.taskName
                    this.evaluateType = data.evaluateType
                    this.result = data.result
                    this.comment = data.comment
                    this.bookedDate = data.bookedDate
                })
            }
        },

        watch: {

        },

        created () {
            this.getTaskDetails().then(result => {
                this.showListType = 0
            })
        },

        mounted () {
        }
    }
</script>

<style lang="less">

</style>
