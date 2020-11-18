<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  }
}
</script>

<style>
body,html{
  padding: 0;
  margin: 0;
  height: 100vh;
}
#app {
  user-select: none;
  height: 100%;
  font-family: Microsoft YaHei,serif;
}
</style>
