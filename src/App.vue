<template>
  <AppHeader />
  <router-view />
  <AudioPlayer />
</template>


<script lang="ts">
import { defineComponent } from "vue";
import AppHeader from "@/components/AppHeader.vue"; // @ is an alias to /src
import AudioPlayer from "./components/songs/AudioPlayer.vue";

export default defineComponent({
  name: "App",
  components: {
    AppHeader,
    AudioPlayer,
  },
});
</script>


<style lang="scss">
body {
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.container {
  max-width: 850px;
  margin: 0 auto;
  padding: 0 12px;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
