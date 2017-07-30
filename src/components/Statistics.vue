<template>
    <div class="task-list-page statistics-page">

        <div class="iframe">
            <iframe :src="iframeSrc"></iframe>
        </div>
    </div>
</template>

<script>
    import { XHeader, Icon, Flexbox, FlexboxItem, PopupPicker, Group, TransferDomDirective as TransferDom, Loading } from 'vux'

    export default {
        components: {
            XHeader,
            Icon,
            Flexbox,
            FlexboxItem,
            PopupPicker,
            Group,
            Loading
        },

        directives: {
            TransferDom
        },

        data () {
            return {
                statisticsType: 'month' // month | percent
            }
        },

        computed: {
            taskLabel () {
                return this.getLabel(this.taskType, this.taskTypes)
            },

            progressLabel () {
                return this.getLabel(this.progressType, this.progressTypes)
            },

            evaluateLabel () {
                return this.getLabel(this.evaluateType, this.evaluateTypes)
            },

            chargerLabel () {
                return this.getLabel(this.chargerType, this.chargerTypes)
            },

            iframeSrc () {
                var srcs = {
                    // month: 'http://brokers.itgreal.com:7000/mobile/rpt/schRpt.html',
                    // percent: 'http://27.154.54.186:7000/mobile/rpt/projectAchievementRpt.html'
                    month: '../schrpt/reportsForMonth_curMonth.html',
                    percent: '../schrpt/reportsForMonth_curMonth.html'
                }
                return srcs[this.statisticsType]
            }
        },

        methods: {

            switchTo (type) {
                this.statisticsType = type
            }
        },

        created () {
            this.projectId = this.$route.query.projectId
        },

        mounted () {

        }
    }
</script>

<style>

    .task-list-page.statistics-page {
        position: relative;
        height: 100%;
        top: 0;
    }


    .statistics-page .iframe {
        padding: 0 0px;
        position: relative;
        box-sizing: border-box;
        border-left: 1px solid #CCC;
        list-style: none;
        height: 100%;
        width: 100%;
        border: none;
    }

    .statistics-page .iframe iframe {
        border: none;
        height: 100%;
        width: 100%;
    }


</style>
