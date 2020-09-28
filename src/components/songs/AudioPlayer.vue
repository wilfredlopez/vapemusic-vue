<template>
  <span>
    <audio ref="audioEl" :src="currentTrack.audioUrl" style="display: none" />
    <PlayerDialog
      :title="currentTrack.title"
      :show="playerOpen"
      :togglePlaying="togglePlaying"
      :audioTime="audioTime"
      :audioTimeLeft="audioTimeLeft"
      @close="handleClosePlayer"
    ></PlayerDialog>
    <teleport to="body">
      <div class="player-container">
        <div class="track-preview" @click="toggleOpenPlayer">
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
              <img :src="currentTrack.imageUrl" class="currentTrack-image" />
            </div>
            <div class="track-info">
              <span class="title">{{ currentTrack.title }}</span>
              <span class="artist">{{ currentTrack.artist }}</span>
            </div>
            <div class="track-controls">
              <button class="icon-inner" @click.stop="togglePlaying">
                <play-icon v-if="isPlaying"></play-icon>
                <pause-icon v-else></pause-icon>
              </button>
            </div>
          </div>
        </div>
      </div>
    </teleport>
  </span>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from "vue";
import { useStore } from "@/store";
import { ActionTypes } from "@/store/action-types";
import useAudioControls from "@/hooks/useAudioControls";
import PlayerDialog from "./PlayerDialog.vue";

export default defineComponent({
  name: "AudioPlayer",
  components: {
    PlayerDialog,
  },
  setup() {
    const store = useStore();
    const audioEl = ref<HTMLAudioElement | null>(null);
    const playerOpen = computed(function () {
      return store.state.ui.playerOpen;
    });
    const currentTrack = computed(function () {
      return store.getters.currentTrack;
    });
    const audioUrl = computed(function () {
      return currentTrack.value.audioUrl;
    });
    const isPlaying = computed(function () {
      return store.getters.playingState.isPlaying;
    });

    const { controls, state, audioTime, audioTimeLeft } = useAudioControls({
      audioEl,
      src: audioUrl,
      autoplay: false,
      loop: false,
    });

    watch(currentTrack, (newval, oldvalue) => {
      if (newval.audioUrl !== oldvalue.audioUrl) {
        store.dispatch(ActionTypes.PLAY_ACTION, currentTrack.value);
      }
    });

    const percentPlayed = computed(function () {
      return store.getters.playingState.percentPlayed;
    });

    watch(state.percentPlayed, (newValue) => {
      store.dispatch(ActionTypes.PERCENT_PLAYED_ACTION, newValue);
    });

    function togglePlaying() {
      if (isPlaying.value === true) {
        store.dispatch(ActionTypes.PAUSE_ACTION);
      } else {
        store.dispatch(ActionTypes.PAUSE_ACTION, true);
      }
    }

    watch(isPlaying, (is) => {
      if (is) {
        controls.play();
      } else {
        controls.pause();
      }
    });

    function handleClosePlayer() {
      store.dispatch(ActionTypes.SET_PLAYER_OPEN_ACTION, false);
    }
    function toggleOpenPlayer() {
      if (isPlaying.value) {
        store.dispatch(ActionTypes.SET_PLAYER_OPEN_ACTION, true);
      } else {
        handleClosePlayer();
      }
    }

    return {
      playerOpen,
      currentTrack,
      isPlaying,
      percentPlayed,
      togglePlaying,
      audioEl,
      handleClosePlayer,
      audioTime,
      audioTimeLeft,
      toggleOpenPlayer,
    };
  },
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
.currentTrack-image {
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

.icon-inner {
  outline: none;
  background: inherit;
  border: none;
}
.icon-inner,
.ionicon,
svg {
  display: block;
  height: 100%;
  width: 100%;
}
</style>
