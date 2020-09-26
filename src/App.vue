<template>
  <AppHeader />
  <router-view />
  <br />
  <br />
  <br />
  <br />
  <AudioPlayer />
  <PageTabs />
</template>

<script lang="ts">
import { defineComponent, inject, ref, watch, provide } from "vue";
import AudioPlayer from "./components/songs/AudioPlayer.vue";
import AppHeader from "@/components/layout/AppHeader.vue"; // @ is an alias to /src
import PageTabs from "@/components/layout/PageTabs.vue";
import { apolloProvider } from "./apollo";
import { useStore } from "./store";
import { ApolloClient } from "apollo-boost";
import { useGetAllSongsQuery } from "@/hooks/useSongsQuery";
import { ActionTypes } from "@/store/action-types";
import { GetAllSongsDocument } from "./hooks/useSongsQuery";

export default defineComponent({
  name: "App",
  components: {
    AppHeader,
    AudioPlayer,
    PageTabs
  },
  setup() {
    const store = useStore();

    //eslint-disable-next-line
    const apollo = inject("apollo") as ApolloClient<any>;
    const limit = ref(31);
    const {
      result: { data, error, loading },
      helpers: { fetchMore }
    } = useGetAllSongsQuery(apollo, { variables: { limit: limit.value } });

    watch(data, () => {
      const allSongs = data.value.getAllSongs;
      store.dispatch(ActionTypes.ADD_SONGS_IF_NOT_ACTION, allSongs.songs);
    });

    if (error.value) {
      console.log(error);
    }
    // const songs = computed(function() {
    //   return store.state.music.tracks;
    // });

    function loadMore() {
      fetchMore({
        updateQuery: (existing, updatedData) => {
          if (updatedData.fetchMoreResult) {
            const newSongs = updatedData.fetchMoreResult.getAllSongs;
            return {
              ...existing,
              getAllSongs: {
                ...existing.getAllSongs,
                totalCount:
                  existing.getAllSongs.totalCount + newSongs.totalCount,
                songs: [...existing.getAllSongs.songs, ...newSongs.songs]
              }
            };
          }
          return existing;
        },
        query: GetAllSongsDocument,
        variables: {
          limit: limit.value + 20,
          skip: limit.value
        }
      }).then(() => {
        limit.value = limit.value + 20;
      });
    }
    provide("loadMore", loadMore);
    provide("loading", loading);
  },
  apolloProvider
});
</script>

<style lang="scss">
:root {
  --main-color: #fa4d4d;
  --main-color-shade: #dc4444;
  --main-color-tint: #fb5f5f;
  --main-color-contrast: #fff;
  --secondary-color: #5856d6;
  --secondary-color-contrast: #ffffff;
  --secondary-color-shade: #4d4cbc;
  --secondary-color-tint: #6967da;

  --app-background: #ffffff;
  --brand-color: #fa4d4d;
  --app-font-family: "Baloo Tamma 2", cursive;
}

html {
  font-family: var(--app-font-family);
}
body {
  margin: 0;
}
a {
  text-decoration: none;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
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
