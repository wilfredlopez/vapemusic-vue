<template>
  <AppHeader />
  <div v-show="loading" class="spinner-content">
    <RotateSpinner />
  </div>
  <div :class="CONTENT_ELEMENT_CLASS" v-if="!loading">
    <router-view></router-view>
  </div>
  <AudioPlayer v-if="!loading" />
  <PageTabs />
</template>

<script lang="ts">
import { defineComponent, inject, ref, watch, provide, computed } from "vue";
import AudioPlayer from "./components/songs/AudioPlayer.vue";
import AppHeader from "@/components/layout/AppHeader.vue"; // @ is an alias to /src
import PageTabs from "@/components/layout/PageTabs.vue";
import { apolloProvider } from "./apollo";
import { useStore } from "./store";
import { ApolloClient } from "apollo-boost";
import { useGetAllSongsQuery } from "@/hooks/useSongsQuery";
import { ActionTypes } from "@/store/action-types";
import { GetAllSongsDocument } from "./hooks/useSongsQuery";
import { CONTENT_ELEMENT_CLASS } from "@/config";
import RotateSpinner from "./components/UI/RotateSpinner.vue";

const INCREMENTOR = 20;

export default defineComponent({
  name: "App",
  components: {
    AppHeader,
    AudioPlayer,
    PageTabs,
    RotateSpinner,
  },
  setup() {
    const store = useStore();

    //eslint-disable-next-line
    const apollo = inject("apollo") as ApolloClient<any>;
    const limit = ref(31);
    const skip = computed(function () {
      return store.getters.tracks.length;
    });
    const {
      result: { data, error, loading },
      helpers: { fetchMore },
    } = useGetAllSongsQuery(apollo, {
      variables: { limit: limit.value, skip: skip.value },
    });

    const songs = computed(function () {
      return data.value;
    });

    watch(songs, (newValue) => {
      const allSongs = newValue.getAllSongs;
      if (allSongs.songs) {
        store.dispatch(ActionTypes.ADD_SONGS_IF_NOT_ACTION, allSongs.songs);
      }
    });

    if (error.value) {
      //eslint-disable-next-line
      console.log(error.value);
    }

    function loadMore() {
      const contentEl = document.querySelector(`.${CONTENT_ELEMENT_CLASS}`);
      const scroolPos = contentEl?.scrollTop || 0;

      fetchMore({
        updateQuery: (existing, updatedData) => {
          if (updatedData.fetchMoreResult) {
            const newSongs = updatedData.fetchMoreResult.getAllSongs;
            store.dispatch(ActionTypes.ADD_SONGS_IF_NOT_ACTION, newSongs.songs);
            return {
              ...existing,
              getAllSongs: {
                ...existing.getAllSongs,
                totalCount:
                  existing.getAllSongs.totalCount + newSongs.totalCount,
                songs: [...existing.getAllSongs.songs, ...newSongs.songs],
              },
            };
          }
          return existing;
        },
        query: GetAllSongsDocument,
        variables: {
          limit: limit.value + INCREMENTOR,
          skip: skip.value,
        },
      }).then(() => {
        if (contentEl) {
          contentEl.scrollTo({
            top: scroolPos,
          });
        }
        limit.value = limit.value + INCREMENTOR;
      });
    }
    provide("loadMore", loadMore);
    provide("loading", loading);
    return {
      CONTENT_ELEMENT_CLASS,
      loading,
    };
  },
  apolloProvider,
});
</script>

<style lang="scss">
.spinner-content {
  height: 200px;
  width: 100%;
  margin: auto;
  position: absolute;
  top: 0;
  bottom: 0;
}
:root {
  --main-color: #fa4d4d;
  --main-color-shade: #dc4444;
  --main-color-tint: #fb5f5f;
  --main-color-contrast: #fff;
  --secondary-color: #5856d6;
  --secondary-color-contrast: #ffffff;
  --secondary-color-shade: #4d4cbc;
  --secondary-color-tint: #6967da;
  --color-success: #2dd36f;
  --color-danger: #eb445a;

  --app-background: #ffffff;
  --app-text-color: #000;
  --brand-color: #fa4d4d;
  --app-font-family: "Baloo Tamma 2", cursive;
  --border-radius: 8px;
}

* {
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
  -webkit-touch-callout: none;
}

html {
  font-family: var(--app-font-family);
  // overflow: hidden;
  width: 100%;
  height: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-text-size-adjust: 100%;
  -ms-text-size-adjust: 100%;
  text-size-adjust: 100%;
}
body {
  margin: 0;
  background: var(--app-background, #fff);
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  position: fixed;
  width: 100%;
  max-width: 100%;
  height: 100%;
  max-height: 100%;
  text-rendering: optimizeLegibility;
  overflow: hidden;
  touch-action: manipulation;
  -webkit-user-drag: none;
  -ms-content-zooming: none;
  word-wrap: break-word;
  overscroll-behavior-y: none;
  -webkit-text-size-adjust: none;
  -moz-text-size-adjust: none;
  -ms-text-size-adjust: none;
  text-size-adjust: none;
  margin: 0;
  padding: 0;
}
.page {
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  position: absolute;
  flex-direction: column;
  justify-content: space-between;
  contain: layout size style;
  overflow: hidden;
  z-index: 0;
}
a {
  text-decoration: none;
}
.song-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 3rem 1rem;
  width: 100%;
  margin: 0;
  padding: 0;
}
#app {
  font-family: var(--app-font-family, inherit);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

//CONTENT_ELEMENT_CLASS
.content {
  --background: var(--app-background, #fff);
  --color: var(--app-text-color, #000);
  --padding-top: 0px;
  --padding-bottom: 57px;
  --padding-start: 0px;
  --padding-end: 0px;
  --keyboard-offset: 0px;
  --offset-top: 0px;
  --offset-bottom: 0px;
  --overflow: auto;
  height: 100vh;
  display: block;
  position: relative;
  flex: 1 1 0%;
  width: 100%;
  font-family: var(--app-font-family, inherit);
  contain: size style;
  margin: 0px !important;
  padding: 0 !important;
  padding-bottom: var(--padding-bottom, 0) !important;
  overflow: scroll;
}

//CONTENT_ELEMENT_CLASS
.content > * {
  margin-bottom: 6rem;
}
.container {
  max-width: 850px;
  margin: 0 auto;
  padding: 0 12px;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
