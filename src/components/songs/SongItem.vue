<template>
  <li @click="handleClick">
    <img :src="song.imageUrl" class="song-image" />
    <p class="title">{{ song.title }}</p>
    <p class="artist">{{ song.artist }}</p>
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
    song: Object as PropType<Song>,
  },
  name: "SongItem",
  setup(props) {
    const store = useStore();
    function handleClick() {
      store.dispatch(ActionTypes.PLAY_ACTION, props.song);
    }
    return {
      handleClick,
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
li {
  list-style: none;
  width: 100%;
  max-width: 500px;
  cursor: pointer;
}
.song-image {
  width: 100%;
  max-width: 500px;
}
p {
  padding: 0;
  margin: 0;
  text-align: left;
}
.title {
  font-weight: bold;
  font-size: 0.8rem;
}

.artist {
  font-weight: 400;
  font-size: 0.8rem;
}
</style>
