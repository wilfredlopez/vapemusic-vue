<template>
  <div class="container">
    <div class="hot-tracks">
      <h1>Hot Tracks</h1>
      <ul>
        <TrackItem v-for="song in songs" :key="song.id" :song="song" />
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import TrackItem from "@/components/songs/TrackItem.vue";
import { useStore } from "@/store";
// import { useStore } from "vuex";

export default defineComponent({
  name: "SongsList",
  components: {
    TrackItem
  },
  setup() {
    const store = useStore();

    const songs = computed(function() {
      return store.getters.hotTracks;
    });
    return {
      songs
    };
  }
});
</script>

<style lang="scss" scoped>
ul {
  width: 100%;
  margin: 0;
  padding: 0;
}
h1 {
  font-size: 1rem;
  text-align: left;
}
</style>
