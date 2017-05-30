<template>
    <div>
        <group class="project-list">
            <cell v-for="item in projectList" :key="item.projectId" :title="item.projectName" :link="'/taskList?projectId=' + item.projectId"></cell>
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
</style>
