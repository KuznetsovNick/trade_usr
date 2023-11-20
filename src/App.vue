<template>
  <div id="nav">
    <router-link to="/"></router-link>
    <router-link to="/menu"></router-link>
    <router-link to="/profile"></router-link>
    <router-link to="/trades"></router-link>
  </div>
  <router-view/>
</template>
<script>
export default {
  name: 'App',
  data() {
    return {msg: "Привет Vue"}
  }
}
</script>
<style scoped>
h3 { color: green; }
</style>
