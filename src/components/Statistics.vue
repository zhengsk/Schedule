<template>
    <div class="task-list-page statistics-page">

        <div class="iframe">
            <iframe :src="iframeSrc"></iframe>
        </div>

       <flexbox class="task-filter" :gutter="0">
           <flexbox-item style="flex: 0 0 50%;">
               <div
                   class="task-filter-item"
                   :class="checkedMonth ? 'checked' : ''"
                   @click="switchTo('month')"
               >月 报</div>
           </flexbox-item>
           <flexbox-item style="flex: 0 0 50%;">
               <div
                   class="task-filter-item"
                   :class="checkedPercent ? 'checked' : ''"
                   @click="switchTo('percent')"
               >考核率</div>
           </flexbox-item>
       </flexbox>

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
                    // month: 'http://27.154.54.186:7000/mobile/rpt/projectMonthRpt.html',
                    // percent: 'http://27.154.54.186:7000/mobile/rpt/projectAchievementRpt.html'
                    month: '../rpt/projectMonthRpt.html',
                    percent: '../rpt/projectAchievementRpt.html'
                }
                return srcs[this.statisticsType]
            },

            // 月报按钮
            checkedMonth () {
                return this.statisticsType === 'month'
            },

            // 考核率按钮
            checkedPercent () {
                return this.statisticsType === 'percent'
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

    .statistics-page .task-page-list {
        position: relative;
    }

    .statistics-page .task-filter {
        box-sizing: border-box;
        padding: 5px 0;
        position: fixed;
        top: 100%;
        height: 50px;
        margin-top: -50px;
        z-index: 10;
        background-color: #FFF;

    }

    .statistics-page .task-filter-item {
        position: relative;
        box-sizing: border-box;
        background-color: #F5F5F5;
        border: 1px solid #DCDCDC;
        font-size: 0.8rem;
        line-height: 1.6rem;
        text-align: center;
        padding: 5px 0;
        border-radius: 3px;
        text-indent: -1rem;
        margin: 0 5px;
        border-radius: 5px;
    }

    .statistics-page .task-filter-item.checked {
        background-color: #0081c2;
        color: #FFF;
    }

    .statistics-page .task-filter-item::after {
        display: none;
    }

    .statistics-page .iframe {
        padding: 0 0px;
        position: relative;
        box-sizing: border-box;
        border-left: 1px solid #CCC;
        list-style: none;
        height: 100%;
        width: 100%;
        padding-bottom: 46px;
        border: none;
    }

    .statistics-page .iframe iframe {
        border: none;
        height: 100%;
        width: 100%;
    }

    .statistics-page .task-list-item {
        position: relative;
        padding: 10px 10px 10px 20px;
        border-bottom: 1px solid #d9d9d9;
    }




</style>
