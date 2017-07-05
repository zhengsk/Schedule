<template>
    <div class="task-list-page">
        <flexbox class="task-filter" :gutter="4">
            <flexbox-item style="flex: 0 0 26%;">
                <div class="task-filter-item" @click="showPopupPicker('task')">{{taskLabel}}</div>
            </flexbox-item>
            <flexbox-item style="flex: 0 0 30%;">
                <div class="task-filter-item" @click="showPopupPicker('progress')">{{progressLabel}}</div>
            </flexbox-item>
            <flexbox-item>
                <div class="task-filter-item" @click="showPopupPicker('charger')">{{chargerLabel}}</div>
            </flexbox-item>
            <flexbox-item style="flex: 0 0 20%;">
                <div class="task-filter-item" @click="showPopupPicker('evaluate')">{{evaluateLabel}}</div>
            </flexbox-item>
        </flexbox>

        <popup-picker :data="popupPickerDatas" v-model="popupPickerValue" :show="popupPickerIsShow" @on-hide="popupPickerHide" @on-change="popupPickerChange" style="display:none;"></popup-picker>

        <ul class="task-list">
            <li v-for="item in projectList" class="task-list-item" :class="taskStatusClass(item)"  @click="gotoTaskDetails(item.taskId)">
                <p v-text="item.taskName" :style="'color:' + (item.taskType === '里程碑任务' ? 'red' : 'inherit')"></p>
                <span class="task-list-percent" v-text="item.progress + '%'"></span>
                <div>
                    <span class="time">
                        {{item.expectTimeStart}} - {{item.expectTimeEnd}}
                    </span>
                </div>
            </li>
        </ul>

        <div class="date-info" v-if="!projectList.length">没有数据</div>

        <div v-transfer-dom>
            <loading v-model="loading" :text="'加载中...'"></loading>
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
                projectId: null,
                projectList: [],

                // 任务分类
                taskType: ['1'],
                taskTypes: [[{
                    name: '主项计划',
                    value: '1'
                }]],

                // 时间进度分类
                progressType: ['0'],
                progressTypes: [[{
                    name: '全部时间',
                    value: '0'
                }, {
                    name: '本月应完成',
                    value: '1'
                }, {
                    name: '下月将开始',
                    value: '2'
                }, {
                    name: '逾期任务',
                    value: '3'
                }]],

                // 评价类型分类
                evaluateType: ['1'],
                evaluateTypes: [[{
                    name: '评价',
                    value: '1'
                }, {
                    name: '待评价',
                    value: '2'
                }, {
                    name: '已评价',
                    value: '3'
                }]],

                // 责任人
                chargerType: ['##'],
                chargerTypes: [[{
                    name: '全部',
                    value: '##'
                }]],

                popupPickerValue: [],
                popupPickerDatas: [],
                popupPickerIsShow: false,

                loading: false
            }
        },

        computed: {
            taskLabel () {
                return this.getLabel(this.taskType, this.taskTypes).substring(0, 4)
            },

            progressLabel () {
                return this.getLabel(this.progressType, this.progressTypes)
            },

            evaluateLabel () {
                return this.getLabel(this.evaluateType, this.evaluateTypes)
            },

            chargerLabel () {
                return this.getLabel(this.chargerType, this.chargerTypes)
            }
        },

        methods: {
            getLabel (value, datas) {
                datas = datas[0]
                for (let i = 0, len = datas.length; i < len; i++) {
                    if (datas[i]['value'] === value[0]) {
                        return datas[i]['name']
                    }
                }
                return ''
            },

            popupPickerChange (value) {
                switch (this.popupPickerDatas) {

                case this.taskTypes:
                    this.taskType = value
                    break

                case this.progressTypes:
                    this.progressType = value
                    break

                case this.evaluateTypes:
                    this.evaluateType = value
                    break

                case this.chargerTypes:
                    this.chargerType = value
                    break
                }

                // 加载任务列表
                this.getTaskList()
            },

            popupPickerHide () {
                this.popupPickerIsShow = false
                this.popupPickerDatas = []
                this.popupPickerValue = []
            },

            showPopupPicker (type) {
                this.popupPickerIsShow = true
                this.popupPickerDatas = this[type + 'Types'] || []
                this.popupPickerValue = this[type + 'Type'] || []
            },

            loadList (loading = true) {
                this.loading = loading
            },

            // 主任务列表
            getTaskTypeList () {
                return this.$http(window.API.taskTypeList, {
                    params: {
                        projectId: this.projectId
                    }
                }).then(result => {
                    let data = result.data.data
                    let list = []
                    for (let i = 0, len = data.length; i < len; i++) {
                        let item = data[i]
                        list.push({
                            name: item.taskTypeName,
                            value: item.taskType
                        })
                        if (item.selected) {
                            this.taskType = [item.taskType]
                        }
                    }

                    this.taskTypes = [list]
                })
            },

            // 责任人列表
            getChargerList () {
                return this.$http(window.API.chargerList, {
                    params: {
                        projectId: this.projectId,
                        taskType: this.taskType[0]
                    }
                }).then(result => {
                    let data = result.data.data
                    let list = []
                    for (let i = 0, len = data.length; i < len; i++) {
                        let item = data[i]
                        list.push({
                            name: item.chargerName,
                            value: item.chargerId
                        })
                        if (item.selected) {
                            this.chargerType = [item.chargerId]
                        }
                    }

                    this.chargerTypes = [list]
                })
            },

            // 任务列表
            getTaskList () {
                this.loading = true

                var params = {
                    projectId: this.projectId,
                    taskType: this.taskType[0],
                    chargerId: this.chargerType[0],
                    progressType: this.progressType[0],
                    evaluateType: this.evaluateType[0]
                }

                // Set to search query, for page back.
                this.$router.replace({
                    path: 'taskList',
                    query: params
                })

                return this.$http(window.API.taskList, {
                    params: params
                }).then(result => {
                    let data = result.data
                    this.projectList = data.data
                    this.loading = false
                })
            },

            taskStatusClass (task) {
                return [
                    'status-0',
                    'status-1',
                    'status-2',
                    'status-3',
                    'status-4'
                ][task.status]
            },

            // 跳转任务详情页
            gotoTaskDetails (taskId) {
                this.$router.push({
                    path: 'taskDetails',
                    query: {
                        taskId: taskId
                    }
                })
            }
        },

        created () {
            var query = this.$route.query
            this.projectId = query.projectId

            // Get taskTypeList and chargerList
            this.$http.all([this.getTaskTypeList(), this.getChargerList()])
                .then(this.$http.spread(() => {
                    // Set data from query data.
                    if (query.taskType) {
                        this.taskType = [query.taskType]
                    }
                    if (query.progressType) {
                        this.progressType = [query.progressType]
                    }
                    if (query.evaluateType) {
                        this.evaluateType = [query.evaluateType]
                    }
                    if (query.chargerId) {
                        this.chargerType = [query.chargerId]
                    }

                    this.getTaskList()
                }))
        },

        mounted () {

        }
    }
</script>

<style>
    .task-page-list {
        position: relative;
    }

    .task-list-page .date-info {
        text-align: center;
        padding:1em 0;
        color: #CCC;
    }

    .task-filter {
        box-sizing: border-box;
        padding: 8px 5px;
        position: fixed;
        top: 0px;
        z-index: 10;
        background-color: #FFF;
    }

    .task-filter-item {
        position: relative;
        box-sizing: border-box;
        background-color: #F5F5F5;
        border: 1px solid #DCDCDC;
        font-size: 1rem;
        line-height: 1.6rem;
        text-align: center;
        padding: 5px 0;
        border-radius: 3px;
        text-indent: -1rem;
    }

    .task-filter-item:active {
        background-color: #DDD;
    }

    .task-filter-item::after {
        content: ' ';
        display: block;
        width: 0;
        height: 0;
        position: absolute;
        top: 50%;
        right: 7px;
        margin-top: -2px;
        border: 5px solid #F00;
        border-color: transparent;
        border-top: 5px solid #666;
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
        width: 24px;
        height: 24px;
        line-height: 24px;
        border-radius: 50%;
        top: 50%;
        left: -28px;
        margin-top: -14px;
        color: #FFF;

        background-color: #F00;
        font-family:"iconfont" !important;
        font-size:14px;
        font-style:normal;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    .task-list-item.status-0::before {
        content: "\e62c";
        background-color: green;
    }

    .task-list-item.status-1::before {
        content: "\e62c";
        background-color: red;
    }

    .task-list-item.status-2::before {
        content: ' ';
        background-color: #d9c209;
    }

    .task-list-item.status-3::before {
        content: ' ';
        background-color: red;
    }

    .task-list-item.status-4::before {
        content: ' ';
        background-color: green;
    }

    .task-list-item:active {
        background-color: #ECECEC;
    }

    .task-list-item p {
        font-size: 1.2rem;
        padding-bottom: 5px;
        padding-right: 4rem;
    }

    .task-list-percent {
        position: absolute;
        top: 10px; right: 3rem;
    }

    .task-list-item .time {
        color: #999;
    }

</style>
