<template>
  <div class="tab-item-container">
    <router-link :to="to" class="tab-item">
      <span class="icon">
        <slot name="icon"></slot>
      </span>
      <span class="tab-item-inner"> <slot> </slot> </span>
    </router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  props: ["to"]
});
</script>

<style lang="scss" scoped>
.tab-item-container {
  display: flex;
  flex-direction: column;
  flex: 1 1 0;
  font-size: 0.85rem;
  align-self: flex-end;
}

::slotted([img]) {
  height: 20px;
}

.icon,
.icon > * {
  height: 20px;
  stroke: var(--main-color);
}

.tab-item {
  align-self: center;
  justify-content: center;
  align-items: center;
  padding-inline-start: 16px;
  padding-inline-end: 16px;
  border-radius: inherit;
  margin: 0px;
  padding-left: 12px;
  padding-right: 12px;
  padding-top: 6px;
  padding-bottom: 6px;
  font-family: inherit;
  font-size: inherit;
  font-style: inherit;
  font-weight: inherit;
  letter-spacing: inherit;
  text-indent: inherit;
  text-overflow: inherit;
  text-transform: inherit;
  text-align: inherit;
  white-space: inherit;
  color: inherit;
  display: flex;
  position: relative;
  flex-direction: inherit;
  width: 100%;
  height: 100%;
  border: 0px;
  outline: none;
  background: transparent;
  text-decoration: none;
  cursor: pointer;
  overflow: hidden;
  box-sizing: border-box;
  -webkit-user-drag: none;
}

.tab-item:hover,
.icon:hover,
.icon > *:hover,
.router-link-active {
  color: var(--main-color);
  fill: var(--main-color);
  stroke: var(--main-color);
}

.tab-item-inner {
  display: flex;
  position: relative;
  flex-flow: inherit;
  align-items: inherit;
  justify-content: inherit;
  width: 100%;
  height: 100%;
  z-index: 1;
  white-space: nowrap;
}
</style>
