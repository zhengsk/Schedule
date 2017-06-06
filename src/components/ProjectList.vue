<template>
    <div>
        <group class="project-list">
            <cell v-for="item in projectList" :key="item.projectId" :title="item.projectName" :link="'/taskList?projectId=' + encodeURIComponent(item.projectId)"></cell>
            <div class="date-info" v-if="!projectList.length">没有数据</div>
        </group>
    </div>

</template>

<script>
    import { XHeader, Group, Cell } from 'vux'

    export default {
        components: {
            XHeader,
            Group,
            Cell
        },
        data () {
            return {
                loading: false,

                projectList: []
            }
        },

        mounted () {
            let self = this

            this.$http(window.API.projectList).then(result => {
                let data = result.data
                self.projectList = data.data
            })
        }
    }
</script>

<style>
.project-list .weui-cells{
    margin-top: 0;
}

.project-list .date-info {
    text-align: center;
    padding:1em 0;
    color: #CCC;
}
</style>
