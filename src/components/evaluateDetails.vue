<template>
    <div class="task-details">
        <div class="task-details-summary">
            <h1>{{taskName}}</h1>
            <!--
            {
                "evalucationPerson":"查玉菡",
                "taskName":"质量检查点",
                "evaluateType":"进度评价",
                "result":"按时完成",
                "comment":"2222222",
                "bookedDate":"17-05-12"
            }
             -->
            <group>
                <cell title="评价人：" :value="evalucationPerson"></cell>
                <cell title="汇报时间：" :value="bookedDate"></cell>

                <cell title="评价类型：" :value="evaluateType"></cell>
                <cell title="评价结果：" :value="result"></cell>

                <x-textarea title="汇报描述：" v-model="comment" :readonly='true' placeholder="汇报内容"></x-textarea>

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
