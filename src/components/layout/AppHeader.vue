<template>
  <header>
    <div class="header-content">
      <router-link to="/">
        <div class="logo">
          <vape-music-logo color="white"></vape-music-logo>
        </div>
      </router-link>
      <!-- <div class="separator"></div> -->
      <h1>{{ title }}</h1>
      <div class="separator"></div>
    </div>
  </header>
</template>


<script lang="ts">
import { defineComponent } from "vue";
import { APP_NAME } from "@/config";
export default defineComponent({
  data() {
    return {
      title: APP_NAME,
    };
  },
});
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.separator {
  flex: 1;
}
header {
  display: block;
  position: relative;
  -ms-flex-order: -1;
  order: -1;
  width: 100%;
  z-index: 10;
  background: var(--main-color, #fa4d4d);
  .header-content {
    display: flex;
    padding: 5px 15px;
    align-items: center;
  }
  h1 {
    margin: 0;
    font-size: 1.2rem;
    color: var(--app-background, #ffffff);
    flex: 4;
  }
}
header::after {
  left: 0;
  bottom: -5px;
  background-position: left 0 top -2px;
  position: absolute;
  width: 100%;
  height: 5px;
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAHBAMAAADzDtBxAAAAD1BMVEUAAAAAAAAAAAAAAAAAAABPDueNAAAABXRSTlMUCS0gBIh/TXEAAAAaSURBVAjXYxCEAgY4UIICBmMogMsgFLtAAQCNSwXZKOdPxgAAAABJRU5ErkJggg==);
  background-repeat: repeat-x;
  content: "";
}
</style>
