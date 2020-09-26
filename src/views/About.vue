<template>
  <div class="about">
    <h1>{{ title }}</h1>
    <p>Disclaimer: This app is only for demostration purpuses.</p>
    <p>
      <strong>Private Policy:</strong>
      All music files and web images are used in order to promote and sponsor
      This blog does not support piracy since everything is for promotional use.
      {{ title }} is not responsible for the publications of our editors.
    </p>
    <p>
      For More Information Contact me at
      <a href="mailto:cubamc@gmail.com" target="__blank">cubamc@gmail.com</a> or
      visit
      <a href="https://wilfredlopez.net" target="__blank">wilfredlopez.net</a>
    </p>
  </div>
</template>


<script lang="ts">
import { APP_NAME } from "@/config";
import { defineComponent } from "vue";
export default defineComponent({
  data() {
    return {
      title: APP_NAME,
    };
  },
});
</script>

<style scoped>
.about {
  max-width: 600px;
  margin: auto;
  padding: 12px;
}
</style>