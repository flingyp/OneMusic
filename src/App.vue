<template>
  <div id="app">
    <basic></basic>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <player></player>
  </div>
</template>

<script>
import Basic from 'components/basic/Basic'
import Player from 'components/player/player'
export default {
  name: 'App',
  components: {
    Basic,
    Player
  }
}
</script>

<style>
</style>