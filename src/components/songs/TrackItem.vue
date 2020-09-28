<template>
  <li @click="handleClick">
    <div>
      <img :src="song.imageUrl" class="track-image" />
    </div>
    <div class="track-info">
      <p class="title">{{ song.title }}</p>
      <p class="artist">{{ song.artist }}</p>
    </div>
  </li>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Song } from "../../models/Song.model";
import { PropType } from "vue";
import { useStore } from "@/store";
import { ActionTypes } from "@/store/action-types";

export default defineComponent({
  props: {
    song: {
      type: Object as PropType<Song>,
      required: true
    }
  },
  name: "TrackItem",
  setup(props) {
    const store = useStore();
    function handleClick() {
      store.dispatch(ActionTypes.PLAY_ACTION, props.song);
    }
    return {
      handleClick
    };
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
li {
  list-style: none;
  width: 100%;
  max-width: 500px;
  display: flex;
  cursor: pointer;
  align-items: center;
}

.track-image {
  width: 100%;
  max-width: 60px;
}
.track-info {
  margin: 0 1rem;
}
p {
  padding: 4px 0;
  margin: 0;
  text-align: left;
}
.title {
  font-size: 0.9rem;
  font-weight: 500;
}

.artist {
  font-weight: 400;
  font-size: 0.8rem;
  font-style: italic;
}
</style>
