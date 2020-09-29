<template>
  <teleport to="body">
    <div class="tabs">
      <div class="tabs-container">
        <div class="tabs-inner">
          <tab-item to="/app/browse">
            <template v-slot:icon>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon"
                height="20"
                viewBox="0 0 512 512"
              >
                <path
                  d="M261.56 101.28a8 8 0 00-11.06 0L66.4 277.15a8 8 0 00-2.47 5.79L63.9 448a32 32 0 0032 32H192a16 16 0 0016-16V328a8 8 0 018-8h80a8 8 0 018 8v136a16 16 0 0016 16h96.06a32 32 0 0032-32V282.94a8 8 0 00-2.47-5.79z"
                />
                <path
                  d="M490.91 244.15l-74.8-71.56V64a16 16 0 00-16-16h-48a16 16 0 00-16 16v32l-57.92-55.38C272.77 35.14 264.71 32 256 32c-8.68 0-16.72 3.14-22.14 8.63l-212.7 203.5c-6.22 6-7 15.87-1.34 22.37A16 16 0 0043 267.56L250.5 69.28a8 8 0 0111.06 0l207.52 198.28a16 16 0 0022.59-.44c6.14-6.36 5.63-16.86-.76-22.97z"
                />
              </svg>
            </template>

            Home
          </tab-item>
          <tab-item to="/app/search">
            <template v-slot:icon>
              <search-icon></search-icon>
            </template>
            Search
          </tab-item>
          <tab-item to="/app/account">
            <template v-slot:icon>
              <profile-icon></profile-icon>
            </template>
            Your Library
          </tab-item>
          <tab-item to="/app/about">
            <template v-slot:icon>
              <info-icon></info-icon>
            </template>
            About
          </tab-item>
        </div>
      </div>
    </div>
  </teleport>
</template>

<style lang="scss" scoped>
.tabs {
  position: fixed;
  bottom: 0px;
  width: 100%;
  z-index: 1000;
  contain: layout size style;
  height: 57px;
}

.icon {
  height: 20px;
}
.tabs-container {
  width: 100%;
  height: 57px;
  background-color: var(--app-background, #fff);
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  display: flex;
  flex-direction: column;
  contain: size layout style;
}
.tabs-inner {
  flex: 1 1 0%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

<script lang="ts">
import { defineComponent } from "vue";

import TabItem from "./TabItem.vue";
export default defineComponent({
  components: {
    TabItem,
  },
});
</script>
