<template>
  <teleport to="body">
    <div class="player-container">
      <audio ref="audioEl" :src="song.audioUrl" />
      <div class="track-preview" @click="togglePlaying">
        <div class="track-preview-progress">
          <div class="track-preview-progress-track">
            <div
              class="track-preview-progress-current"
              :style="{ width: percentPlayed + '%' }"
            ></div>
          </div>
        </div>
        <div class="track-preview-wrapper">
          <div class="image-thumbnail">
            <img :src="song.imageUrl" class="song-image" />
          </div>
          <div class="track-info">
            <span class="title">{{ song.title }}</span>
            <span class="artist">{{ song.artist }}</span>
          </div>
          <div class="track-controls">
            <span class="icon-inner">
              <svg
                v-if="isPlaying"
                class="icon"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  d="M208 432h-48a16 16 0 01-16-16V96a16 16 0 0116-16h48a16 16 0 0116 16v320a16 16 0 01-16 16zM352 432h-48a16 16 0 01-16-16V96a16 16 0 0116-16h48a16 16 0 0116 16v320a16 16 0 01-16 16z"
                />
              </svg>
              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                class="icon"
                viewBox="0 0 512 512"
              >
                <path
                  d="M133 440a35.37 35.37 0 01-17.5-4.67c-12-6.8-19.46-20-19.46-34.33V111c0-14.37 7.46-27.53 19.46-34.33a35.13 35.13 0 0135.77.45l247.85 148.36a36 36 0 010 61l-247.89 148.4A35.5 35.5 0 01133 440z"
                />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from "vue";
import { useStore } from "@/store";
import { ActionTypes } from "@/store/action-types";
import useAudioControls from "@/hooks/useAudioControls";

export default defineComponent({
  name: "AudioPlayer",
  setup() {
    const store = useStore();
    const audioEl = ref<HTMLAudioElement | null>(null);
    const playerOpen = computed(function() {
      return store.state.ui.playerOpen;
    });
    const song = computed(function() {
      return store.getters.currentTrack;
    });
    const audioUrl = computed(function() {
      return song.value.audioUrl;
    });

    const { state, controls } = useAudioControls({
      audioEl,
      src: audioUrl
    });

    watch(song, () => {
      if (audioEl.value) {
        audioEl.value.src = audioUrl.value;
      }
      store.dispatch(ActionTypes.PLAY_ACTION);
      controls.play();
      state.paused.value = false;
    });

    const isPlaying = computed(function() {
      return store.state.playing.isPlaying;
    });

    const percentPlayed = computed(function() {
      return store.state.playing.percentPlayed;
    });

    watch(state.percentPlayed, newValue => {
      store.dispatch(ActionTypes.PERCENT_PLAYED_ACTION, newValue);
    });

    function togglePlaying() {
      if (isPlaying.value) {
        store.dispatch(ActionTypes.PAUSE_ACTION);
        controls.pause();
      } else {
        store.dispatch(ActionTypes.PLAY_ACTION);
        controls.play();
      }
    }

    return {
      playerOpen,
      song,
      isPlaying,
      percentPlayed,
      togglePlaying,
      audioEl
    };
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.player-container {
  position: fixed;
  bottom: 57px;
  // bottom: 0px;
  width: 100%;
  z-index: 1000;
}

.track-preview {
  width: 100%;
  height: 50px;
  background-color: #222;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  --ion-grid-padding: 0;
  --ion-grid-column-padding: 0;
}

.track-preview-progress {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
}

.track-preview-progress-track {
  position: relative;
  height: 2px;
  background-color: #aaa;
}

.track-preview-progress-current {
  position: absolute;
  z-index: 1;
  width: 60%;
  height: 2px;
  background-color: #fff;
}
.track-preview-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.image-thumbnail {
  border-radius: 0;
  display: block;
  width: 48px;
  height: 48px;
}
.song-image {
  margin-top: 2px;
  width: 48px;
  height: 48px;
  max-width: 100%;
  border: 0;
  min-width: 100%;
}

.track-info {
  flex: 1 1;
  height: 50px;
  color: #fff;
  display: flex;
  align-items: center;
  padding: 0 8px;
}

.title {
  color: #fff;
  font-size: 14px;
  margin-right: 3px;
}

.artist {
  color: #999;
  font-size: 14px;
  margin-left: 2px;
}

.track-controls {
  color: #fff;
  display: flex;
  align-items: center;
  flex-direction: row;
  font-size: 36px;
}

.icon {
  flex: 1 1;
  cursor: pointer;
  color: var(--brand-color, #fa4d4d);
  width: 50px;
  fill: var(--brand-color, #fa4d4d);
}

.icon-inner,
.ionicon,
svg {
  display: block;
  height: 100%;
  width: 100%;
}
</style>
