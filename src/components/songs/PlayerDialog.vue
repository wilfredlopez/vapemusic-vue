<template>
  <teleport to="body">
    <div v-if="show" @click="tryClose" class="backdrop"></div>
    <transition name="dialog">
      <dialog open v-if="show">
        <header>
          <base-button
            transparent
            small
            circular
            :shadow="false"
            mode="outline"
            label="close player"
            @click="tryClose"
          >
            <down-arrow-icon className="arrow-icon"></down-arrow-icon>
          </base-button>
          <h2>{{ title }}</h2>
        </header>
        <section>
          <img :src="currentTrack.imageUrl" />
          <div class="info-container">
            <p class="title">{{ currentTrack.title }}</p>
            <p class="artist">{{ currentTrack.artist }}</p>
          </div>
          <TrackProgress :seekTo="seekTo" :value="percentPlayed" />
          <div class="track-progress-time">
            <div class="track-progress-time-current">{{ audioTime }}</div>
            <div class="track-progress-time-left">{{ audioTimeLeft }}</div>
          </div>
        </section>
        <menu v-if="!fixed">
          <slot name="actions">
            <base-button
              @click="favorite"
              transparent
              circular
              :label="isFavorite ? 'unfavorite' : 'favorite'"
            >
              <!-- Heart Icon -->
              <svg
                v-if="isFavorite"
                xmlns="http://www.w3.org/2000/svg"
                class="icon favorite"
                viewBox="0 0 512 512"
              >
                <path
                  d="M256 448a32 32 0 01-18-5.57c-78.59-53.35-112.62-89.93-131.39-112.8-40-48.75-59.15-98.8-58.61-153C48.63 114.52 98.46 64 159.08 64c44.08 0 74.61 24.83 92.39 45.51a6 6 0 009.06 0C278.31 88.81 308.84 64 352.92 64c60.62 0 110.45 50.52 111.08 112.64.54 54.21-18.63 104.26-58.61 153-18.77 22.87-52.8 59.45-131.39 112.8a32 32 0 01-18 5.56z"
                />
              </svg>
              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                class="icon unfavorite"
                viewBox="0 0 512 512"
              >
                <path
                  d="M352.92 80C288 80 256 144 256 144s-32-64-96.92-64c-52.76 0-94.54 44.14-95.08 96.81-1.1 109.33 86.73 187.08 183 252.42a16 16 0 0018 0c96.26-65.34 184.09-143.09 183-252.42-.54-52.67-42.32-96.81-95.08-96.81z"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="ionicon-fill-none ionicon-stroke-width"
                />
              </svg>
            </base-button>
            <base-button
              @click="playPrev"
              label="previous"
              circular
              class="flat"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon"
                viewBox="0 0 512 512"
                title="previous"
              >
                <path
                  d="M112 64a16 16 0 0116 16v136.43L360.77 77.11a35.13 35.13 0 0135.77-.44c12 6.8 19.46 20 19.46 34.33v290c0 14.37-7.46 27.53-19.46 34.33a35.14 35.14 0 01-35.77-.45L128 295.57V432a16 16 0 01-32 0V80a16 16 0 0116-16z"
                />
              </svg>
            </base-button>
            <base-button
              @click="togglePlaying"
              label="Play/Pause"
              circular
              class="flat"
            >
              <play-icon class="icon" v-if="isPlaying"></play-icon>
              <pause-icon class="icon" v-else></pause-icon>
            </base-button>
            <base-button @click="playNext" label="Next" circular class="flat">
              <svg
                title="Next"
                xmlns="http://www.w3.org/2000/svg"
                class="icon"
                viewBox="0 0 512 512"
              >
                <path
                  d="M400 64a16 16 0 00-16 16v136.43L151.23 77.11a35.13 35.13 0 00-35.77-.44C103.46 83.47 96 96.63 96 111v290c0 14.37 7.46 27.53 19.46 34.33a35.14 35.14 0 0035.77-.45L384 295.57V432a16 16 0 0032 0V80a16 16 0 00-16-16z"
                />
              </svg>
            </base-button>
          </slot>
        </menu>
      </dialog>
    </transition>
  </teleport>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { ActionTypes } from "@/store/action-types";
import { Song } from "@/models/Song.model";
import TrackProgress from "../UI/TrackProgress.vue";
export default defineComponent({
  components: {
    TrackProgress,
  },
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      required: false,
    },
    fixed: {
      type: Boolean,
      required: false,
      default: false,
    },
    togglePlaying: {
      type: Function,
    },
    seekTo: {
      type: Function,
      required: true,
    },
    audioTime: {
      type: String,
      required: false,
      default: `0:00`,
    },
    audioTimeLeft: {
      type: String,
      required: false,
      default: `0:00`,
    },
  },
  emits: ["close"],
  methods: {
    tryClose() {
      if (this.fixed) {
        return;
      }
      this.$emit("close");
    },
    playPrev() {
      this.$store.dispatch(ActionTypes.PREV_ACTION);
    },
    playNext() {
      this.$store.dispatch(ActionTypes.NEXT_ACTION);
    },
    favorite() {
      this.$store.dispatch(ActionTypes.FAV_ACTION, this.currentTrack);
    },
  },
  computed: {
    percentPlayed(): number {
      return Math.floor(this.$store.getters.playingState.percentPlayed);
    },
    currentTrack(): Song {
      return this.$store.getters.currentTrack;
    },
    isPlaying(): boolean {
      return this.$store.getters.playingState.isPlaying;
    },
    isFavorite(): boolean {
      return (
        typeof this.$store.getters.favTracks.find(
          (t) => t.id === this.currentTrack.id
        ) !== "undefined"
      );
    },
  },
});
</script>

<style scoped>
.track-progress-time {
  display: flex;
  margin-top: 5px;
  font-size: 12px;
}
.track-progress-time-current {
  flex: 1 1;
  color: #494949;
}

.track-progress-time-left {
  color: #494949;
}

.icon {
  width: 100%;
  max-width: 30px;

  display: block;
  fill: currentColor;
}

.favorite {
  fill: red;
  stroke: currentcolor;
}
.unfavorite {
  fill: white;
  stroke: red;
  stroke-width: 3rem;
}
.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.75);

  z-index: 1000;
}

.arrow-icon {
  width: 28px;
  color: white;
  fill: white;
}

dialog {
  position: fixed;
  top: 7vh;
  left: 10%;
  width: 80%;
  height: auto;
  z-index: 1002;
  border-radius: 12px;
  border: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 0;
  margin: 0;
  overflow: hidden;
  background-color: white;
}

@media screen and (max-width: 700px) {
  dialog {
    top: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    border-radius: 0;
  }
}

@media only screen and (min-device-width: 375px) and (max-device-width: 812px) and (orientation: landscape) {
  dialog {
    top: 0vh;
    height: 100vh;
    left: 5%;
    width: 90%;
    overflow: scroll;
  }
}

.dialog-enter-from,
.dialog-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

.dialog-enter-to,
.dialog-leave-from {
  transform: scale(1);
  opacity: 1;
}
img {
  width: 100%;
}
.dialog-enter-active {
  transition: all 0.3s ease-out;
}
.dialog-leave-active {
  transition: all 0.3s ease-in;
}
header {
  background-color: var(--main-color, #fff);
  color: var(--main-color-contrast, rgb(0, 0, 0));
  width: 100%;
  padding: 1rem;
  display: flex;

  align-items: center;
}

header h2 {
  margin: 0;
}

section {
  padding: 1.58rem 1.58rem 0 1.58rem;
  max-width: 560px;
  margin: auto;
}

.title {
  font-weight: bold;
}

.artist {
  font-size: small;
}
.info-container {
  padding: 0;
}
p {
  margin: 0;
}

menu {
  padding: 0 1rem 1rem;
  display: flex;
  justify-content: center;
  margin: 0;
}

@media (min-width: 768px) {
  dialog {
    left: calc(50% - 20rem);
    width: 40rem;
  }
}
</style>
