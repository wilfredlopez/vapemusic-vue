<template>
  <div class="home">
    <SongsList />
    <br />
    <br />
    <br />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SongsList from "@/components/songs/SongsList.vue";
export default defineComponent({
  name: "Home",
  components: {
    SongsList,
  },
});
</script>
