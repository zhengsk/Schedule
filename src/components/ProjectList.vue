<template>
    <div>
        <group class="project-list">
            <cell v-for="item in projectList" :title="item.projectName" :link="'/StatusBar?projectId=' + item.projectId"></cell>
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
.project-list{
}

.logo {
  width: 100px;
  height: 100px
}
</style>
