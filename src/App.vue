<template>
  <div id="app">
    <basic></basic>
    <router-view></router-view>
  </div>
</template>

<script>
import Basic from 'components/basic/Basic'
export default {
  name: 'App',
  components: {
    Basic
  }
}
</script>

<style>
</style>