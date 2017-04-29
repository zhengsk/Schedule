<template>
    <div>
        <group class="project-list">
            <cell v-for="i in 20" title="Vux" value="Cool" link="/StatusBar">{{i}}</cell>
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
                msg: 'Hello World!'
            }
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
