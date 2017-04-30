<template>
    <div class="task-list-page">
        <flexbox class="task-filter">
          <flexbox-item><div class="task-filter-item">主项计划</div></flexbox-item>
          <flexbox-item><div class="task-filter-item">本月应完成</div></flexbox-item>
          <flexbox-item><div class="task-filter-item">待评价</div></flexbox-item>
          <flexbox-item><div class="task-filter-item">周中庆</div></flexbox-item>
        </flexbox>

        <ul class="task-list">
            <li v-for="i in 30" class="task-list-item">
                <p>主体工程</p>
                <span class="task-list-percent">50%</span>
                <div>
                    <span class="time">
                        2016/03/21 - 2016/04/21
                    </span>
                </div>
            </li>
            <li>
                bbb
            </li>
            <li>
                zzz
            </li>
        </ul>
    </div>
</template>

<script>
    import { XHeader, Icon, Flexbox, FlexboxItem, Divider } from 'vux'

    export default {
        components: {
            XHeader,
            Icon,
            Flexbox,
            FlexboxItem,
            Divider
        },
        data () {
            return {
                projectList: []
            }
        },

        mounted () {
            let self = this
            let projectId = this.$route.query.projectId

            this.$http(window.API.taskList, {
                params: {
                    projectId: projectId
                }
            }).then(result => {
                let data = result.data
                self.projectList = data.data
            })
        }
    }
</script>

<style>
    .task-page-list {
        position: relative;
    }

    .task-filter {
        box-sizing: border-box;
        padding: 8px 5px;
        position: fixed;
        top: 47px;
        z-index: 10;
        background-color: #FFF;
    }

    .task-filter-item {
        font-size: 0.8rem;
        line-height: 1.6rem;
        text-align: center;
        padding: 5px 0;
        background-color: #CCC;
        border-radius: 3px;
    }

    .task-list {
        padding: 0 15px;
        position: relative;
        box-sizing: border-box;
        margin-top: 50px;
        border-left: 1px solid #CCC;
        list-style: none;
        margin-left: 2rem;
    }

    .task-list-item {
        position: relative;
        padding: 10px 10px 10px 20px;
        border-bottom: 1px solid #d9d9d9;
    }

    .task-list-item::after {
        content: " ";
        display: inline-block;
        height: 6px;
        width: 6px;
        border-width: 2px 2px 0 0;
        border-color: #C8C8CD;
        border-style: solid;
        -webkit-transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
        transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
        position: relative;
        top: -2px;
        position: absolute;
        top: 50%;
        margin-top: -4px;
        right: 1rem;
    }

    .task-list-item::before {
        content: "\e62c";
        display: inline-block;
        position: absolute;
        text-align: center;
        width: 28px;
        height: 28px;
        line-height: 28px;
        border-radius: 50%;
        top: 50%;
        left: -28px;
        margin-top: -14px;
        color: #FFF;

        background-color: #F00;
        font-family:"iconfont" !important;
        font-size:16px;
        font-style:normal;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    .task-list-item:active {
        background-color: #ECECEC;
    }

    .task-list-item p {
        font-size: 1.2rem;
        padding-bottom: 5px
    }

    .task-list-percent {
        position: absolute;
        top: 10px; right: 3rem;
    }

    .task-list-item .time {
        color: #999;
    }

</style>
