<template>
  <div class="container">
    <div class="songs-list">
      <h1>New Music</h1>
      <div v-if="loading">Loading...</div>
      <ul class="song-grid">
        <SongItem v-for="song in songs" :key="song.id" :song="song" />
      </ul>
      <br />
      <base-button @click="loadMore">Load More</base-button>
      <br />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, inject } from "vue";
import SongItem from "@/components/songs/SongItem.vue";
import { useStore } from "@/store";
// import { useStore } from "vuex";
// import { useGetAllSongsQuery } from "@/hooks/useSongsQuery";
// import { ApolloClient } from "apollo-boost";
// import { ActionTypes } from "@/store/action-types";
// import { GetAllSongsDocument } from "../../hooks/useSongsQuery";

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

    const loadMore = inject("loadMore");
    const loading = inject("loading");
    return {
      songs,
      loading,
      // error,
      loadMore,
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
