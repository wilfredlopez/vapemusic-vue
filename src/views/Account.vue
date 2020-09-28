<template>
  <div class="account">
    <base-list>
      <template v-slot:header> Favorite Tracks </template>
      <list-item
        button
        v-for="song in favorites"
        :key="song.id"
        @click="() => playSong(song)"
      >
        <div class="container">
          <img :src="song.imageUrl" :title="song.title" />
          <div class="header">
            <h2>
              {{ song.title }}
            </h2>
            <h3>
              {{ song.artist }}
            </h3>
          </div>
          <div class="actions">
            <base-button
              small
              transparent
              @click.stop="() => removeFavorite(song)"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon s-ion-icon"
                viewBox="0 0 512 512"
              >
                <path
                  d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z"
                  stroke-miterlimit="10"
                  class="ionicon-fill-none ionicon-stroke-width"
                ></path>
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M336 256H176"
                  class="icon icon-fill-none icon-stroke-width"
                ></path>
              </svg>
            </base-button>
          </div>
        </div>
      </list-item>
    </base-list>
    <base-list>
      <template v-slot:header> Recent Tracks </template>
      <list-item
        button
        v-for="song in recentTracks"
        :key="song.id"
        @click="() => playSong(song)"
      >
        <div class="container">
          <img :src="song.imageUrl" :title="song.title" />
          <div class="header">
            <h2>
              {{ song.title }}
            </h2>
            <h3>
              {{ song.artist }}
            </h3>
          </div>
        </div>
      </list-item>
    </base-list>

    <br />
    <br />
    <br />
    <br />
  </div>
</template>


<script lang="ts">
import { Song } from "@/models/Song.model";
import { ActionTypes } from "@/store/action-types";
import { defineComponent } from "vue";

export default defineComponent({
  methods: {
    playSong(song: Song) {
      this.$store.dispatch(ActionTypes.PLAY_ACTION, song);
    },
    removeFavorite(song: Song) {
      this.$store.dispatch(ActionTypes.FAV_ACTION, song);
    },
  },
  computed: {
    recentTracks() {
      return this.$store.getters.recentTracks;
    },
    favorites() {
      return this.$store.getters.favTracks;
    },
  },
});
</script>


<style lang="scss" scoped>
.icon {
  color: white;
  stroke: #9c9c9c;
  display: block;
  height: 100%;
  width: 60px;
  fill: none;
  transform-origin: 0px 0px;
  font-size: 24px;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 1rem;
  overflow: hidden;
}
.actions {
  justify-self: flex-end;
  flex: 1;
  justify-content: flex-end;
  align-items: flex-end;
  display: flex;
}
img {
  width: 100%;
  max-width: 150px;
}

.container {
  max-width: 100%;
  display: flex;
  flex-direction: row;

  width: 100%;
  align-items: center;
}
.header {
  padding: 0 20px;
  h2 {
    font-size: 16px;
    margin: 0;
  }
  h3 {
    font-size: 12px;
    margin: 0;
  }
}
</style>
