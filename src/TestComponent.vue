<template>
  <span>
    <audio ref="audioEl" :src="currentTrack.audioUrl" style="display: none" />
    <teleport to="body">
      <div class="player-container">
        <div class="track-preview">
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
              <button class=" btn icon-inner" @click.stop="togglePlaying">
                <span v-if="isPlaying">Pause</span>
                <span v-else>Play</span>
              </button>
              <button @click="playNext" class="btn next-btn">PlayNext</button>
            </div>
          </div>
        </div>
      </div>
    </teleport>
  </span>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from "vue";
import { useAudioControls } from "use-vue-hooks";

const sampleTracks = [
  {
    id: "5de11a305a58b41df485e98a",
    name: "Ozuna - Dificil Olvidar",
    audioUrl:
      "https://res.cloudinary.com/wlopez/video/upload/v1575033391/vapemusic2/2019/10/Ozuna%20%E2%80%93%20Dif%C3%ADcil%20Olvidar.mp3/gkxjvzeulzhoy9l0mzz8.mp3",
    imageUrl:
      "https://res.cloudinary.com/wlopez/image/upload/v1575033390/vapemusic2/2019/10/Ozuna%20-%20Niviru%20Cover.jpg/Ozuna_-_Niviru_Cover_z7mtjj.jpg",
    artist: "Ozuna",
    title: "Dificil De Olvidar",
    genre: "Reggaeton"
  },
  {
    id: "5e514f8e47f6b853d0439a89",
    name: "Reik Ft. Farruko &  Camilo - Si Me Dices Que Si",
    audioUrl:
      "https://res.cloudinary.com/wlopez/video/upload/v1582387085/vapemusic2/2020/1/Farruko_-_Si_Me_Dices_Que_Si.mp3",
    imageUrl:
      "https://res.cloudinary.com/wlopez/image/upload/v1582385647/vapemusic2/2020/1/Si_Me_Dices_Que_Si.jpg",
    artist: "Reik Ft. Farruko &  Camilo",
    genre: "Reggaeton",
    title: "Si Me Dices Que Si"
  }
];

export default defineComponent({
  name: "AudioPlayer",
  setup() {
    const audioEl = ref<HTMLAudioElement | null>(null);
    const currentIndex = ref(0);
    const isPlaying = ref(false);
    const percentPlayed = ref(0);

    const currentTrack = computed(function() {
      return sampleTracks[currentIndex.value];
    });
    const audioUrl = computed(function() {
      return currentTrack.value.audioUrl;
    });

    function playNext() {
      let index = currentIndex.value + 1;
      if (index > sampleTracks.length - 1) {
        index = 0;
      }
      currentIndex.value = index;
    }

    const { controls, state, audioTime, audioTimeLeft } = useAudioControls({
      audioEl,
      src: audioUrl,
      autoplay: false,
      loop: false
    });

    watch(isPlaying, is => {
      if (is) {
        controls.play();
      } else {
        controls.pause();
      }
    });

    function togglePlaying() {
      if (isPlaying.value === true) {
        isPlaying.value = false;
      } else {
        isPlaying.value = true;
      }
    }

    function seekTo(to: number) {
      if (percentPlayed.value !== to) {
        controls.seek(Math.floor(to));
      }
    }

    return {
      currentTrack,
      isPlaying,
      percentPlayed,
      audioEl,
      audioTime,
      audioTimeLeft,
      togglePlaying,
      seekTo,
      playNext
    };
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.player-container {
  position: fixed;
  bottom: 0px;
  width: 100%;
  z-index: 1000;
}

.btn {
  outline: none;
  border: none;
  padding: 8px 6px;
  margin: 9px;
  border-radius: 3px;
  min-width: 60px;
}

.next-btn {
  background: #1b5ccd;
  color: white;
  cursor: pointer;
}

.icon-inner {
  background: #3a6f13;
  outline: none;
  border: none;
  color: white;
  cursor: pointer;
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
  color: rgb(195, 195, 195);
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
</style>
