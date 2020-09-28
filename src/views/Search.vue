<template>
  <div class="search">
    <form @submit.prevent="search" class="search-form">
      <div class="form-control">
        <div class="search-input">
          <svg
            width="20"
            xmlns="http://www.w3.org/2000/svg"
            class="ionicon s-ion-icon"
            viewBox="0 0 512 512"
          >
            <path
              d="M464 428L339.92 303.9a160.48 160.48 0 0030.72-94.58C370.64 120.37 298.27 48 209.32 48S48 120.37 48 209.32s72.37 161.32 161.32 161.32a160.48 160.48 0 0094.58-30.72L428 464zM209.32 319.69a110.38 110.38 0 11110.37-110.37 110.5 110.5 0 01-110.37 110.37z"
            ></path>
          </svg>
          <input
            type="text"
            v-model="query"
            placeholder="Song name, artist or album"
          />
        </div>
      </div>
    </form>
    <div v-if="result.length > 0" class="song-grid-container">
      <ul class="song-grid">
        <SongItem v-for="song of result" :key="song.id" :song="song" />
      </ul>
    </div>
  </div>
</template>


<script lang="ts">
import { computed, defineComponent, inject, ref } from "vue";
import { useSearchSongsLazyQuery } from "../hooks/useSearchSongs";
import { ApolloClient } from "apollo-boost";
import { Song } from "@/models/Song.model";
import SongItem from "@/components/songs/SongItem.vue";
export default defineComponent({
  components: {
    SongItem,
  },
  setup() {
    // eslint-disable-next-line
    const apollo = inject("apollo") as ApolloClient<any>;
    const query = ref("");
    const [
      execQuery,
      {
        result: { data, loading },
      },
    ] = useSearchSongsLazyQuery(apollo);

    function search() {
      execQuery({
        query: query.value,
        limit: 20,
      });
    }

    const result = computed(function () {
      if (data && data.value && data.value.searchSongs) {
        return data.value.searchSongs.songs;
      }
      return [] as Song[];
    });

    return {
      search,
      query,
      result,
      loading,
    };
  },
});
</script>


<style lang="scss" scoped>
.song-grid-container {
  margin-top: 3rem;
  max-width: 90%;
  width: 100%;
  margin: auto;
  margin-bottom: 12rem;
}
.song-grid {
  margin-top: 48px;
}
.search-form {
  position: fixed;
  left: 0;
  top: 64px;
  right: 0;
}
.results {
  margin-bottom: 12rem;
}
.actions {
  padding: 20px;
}
.search-input {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  // display: grid;
  // grid-template-columns: 3% 95%;
  svg {
    position: absolute;
    left: 5px;
    fill: var(--main-color-contrast, #fff);
    // transform: translate(30px, 0px);
  }
  input::placeholder {
    color: rgb(206, 206, 206);
  }
  input {
    padding-top: 6px;
    padding-bottom: 6px;
    background-position: left 8px center;
    height: auto;
    font-size: 16px;
    font-weight: 400;
    line-height: 30px;
    font-family: inherit;
    font-style: inherit;
    letter-spacing: inherit;
    text-decoration: inherit;
    text-indent: inherit;
    text-overflow: inherit;
    text-transform: inherit;
    text-align: inherit;
    white-space: inherit;
    color: inherit;
    border-radius: 0px;
    // border-radius: 3px;
    display: block;
    width: 100%;
    border: 0;
    outline: none;
    background: var(--main-color);
    color: var(--main-color-contrast);
    -webkit-box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
    box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }
}
</style>