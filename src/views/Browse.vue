<template>
  <div class="browse">
    <HotTracks />
    <SongsList />
    <br />
    <br />
    <br />
    <br />
    <br />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SongsList from "@/components/songs/SongsList.vue";
import HotTracks from "@/components/songs/HotTracks.vue";
export default defineComponent({
  name: "Browse",

  components: {
    SongsList,
    HotTracks,
  },
});
</script>
