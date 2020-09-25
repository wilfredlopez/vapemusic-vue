<template>
  <div class="container">
    <div class="songs-list">
      <h1>New Music</h1>
      <ul>
        <SongItem v-for="song in songs" :key="song.id" :song="song" />
      </ul>
      <base-button>Load More</base-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import SongItem from "@/components/songs/SongItem.vue";
import { useStore } from "@/store";
// import { useStore } from "vuex";
export default defineComponent({
  name: "SongsList",
  components: {
    SongItem,
  },
  setup() {
    const store = useStore();

    const songs = computed(function () {
      return store.state.music.tracks;
    });
    return {
      songs,
    };
  },
});
</script>

<style lang="scss" scoped>
ul {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 3rem 1rem;
  width: 100%;
  margin: 0;
  padding: 0;
}
h1 {
  font-size: 1rem;
  text-align: left;
}
</style>
