<template>
  <div>
    <group>
      <cell is-link title="Simple" link="/component/tabbar-simple"></cell>
      <cell is-link title="Switch icons" link="/component/tabbar-icon"></cell>
    </group>
    <tabbar>
      <tabbar-item selected link="/component/demo">
        <img slot="icon" src="../assets/logo.png">
        <span slot="label">项目</span>
      </tabbar-item>
      <tabbar-item>
        <img slot="icon" src="../assets/logo.png">
        <span slot="label">报表</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>

<script>
import { Tabbar, TabbarItem, Group, Cell } from 'vux'

export default {
  components: {
    Tabbar,
    TabbarItem,
    Group,
    Cell
  }
}
</script>
