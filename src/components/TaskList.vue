<template>
    <div class="task-list-page">
        <flexbox class="task-filter" :gutter="4">
            <flexbox-item style="flex: 0 0 26%;">
                <div class="task-filter-item" @click="showPopupPicker('task')">{{taskLabel}}</div>
            </flexbox-item>
            <flexbox-item style="flex: 0 0 30%;">
                <div class="task-filter-item" @click="showPopupPicker('progress')">{{progressLabel}}</div>
            </flexbox-item>
            <flexbox-item style="flex: 0 0 20%;">
                <div class="task-filter-item" @click="showPopupPicker('evaluate')">{{evaluateLabel}}</div>
            </flexbox-item>
            <flexbox-item>
                <div class="task-filter-item" @click="showPopupPicker('charger')">{{chargerLabel}}</div>
            </flexbox-item>
        </flexbox>

        <popup-picker :data="popupPickerDatas" v-model="popupPickerValue" :show="popupPickerIsShow" @on-hide="popupPickerHide" @on-change="popupPickerChange" style="display:none;"></popup-picker>

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
                projectList: [],

                taskTypeValue: ['1'],
                taskTypes: [[{
                    name: '主项计划',
                    value: '1'
                }, {
                    name: '专项计划',
                    value: '2'
                }]],

                progressTypeValue: ['1'],
                progressTypes: [[{
                    name: '全部',
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

                evaluateTypeValue: ['1'],
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

                chargerTypeValue: ['abcd'],
                chargerTypes: [[{
                    name: '周中庆',
                    value: 'abcd'
                }, {
                    name: '周 庆',
                    value: 'mnopq'
                }, {
                    name: '某某人',
                    value: 'xyz'
                }]],

                popupPickerValue: [],
                popupPickerDatas: [],
                popupPickerIsShow: false,

                loading: false
            }
        },

        computed: {
            taskLabel () {
                return this.getLabel(this.taskTypeValue, this.taskTypes)
            },

            progressLabel () {
                return this.getLabel(this.progressTypeValue, this.progressTypes)
            },

            evaluateLabel () {
                return this.getLabel(this.evaluateTypeValue, this.evaluateTypes)
            },

            chargerLabel () {
                return this.getLabel(this.chargerTypeValue, this.chargerTypes)
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
                    this.taskTypeValue = value
                    break

                case this.progressTypes:
                    this.progressTypeValue = value
                    break

                case this.evaluateTypes:
                    this.evaluateTypeValue = value
                    break

                case this.chargerTypes:
                    this.chargerTypeValue = value
                    break
                }

                this.loadList()
            },

            popupPickerHide () {
                this.popupPickerIsShow = false
                this.popupPickerDatas = []
                this.popupPickerValue = []
            },

            showPopupPicker (type) {
                this.popupPickerIsShow = true
                this.popupPickerDatas = this[type + 'Types'] || []
                this.popupPickerValue = this[type + 'TypeValue'] || []
            },

            loadList () {
                this.loading = true
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
