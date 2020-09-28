<template>
  <div class="host">
    <button v-if="button" class="item">
      <slot></slot>
    </button>
    <router-link :to="to" class="item" v-else-if="link">
      <slot></slot>
    </router-link>
    <div class="item" v-else>
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    button: {
      type: Boolean,
      required: false,
      default: false,
    },
    link: {
      type: Boolean,
      required: false,
      default: false,
    },
    to: {
      type: String,
      required: false,
      default: "/",
    },
  },
});
</script>

<style lang="scss" scoped>
.host {
  --ion-toolbar-height: 56px;
  --platform-opacity: 1;
  --min-height: 48px;
  --background: var(--app-background, #fff);
  --background-activated: transparent;
  --background-focused: currentColor;
  --background-hover: currentColor;
  --background-activated-opacity: 0;
  --background-focused-opacity: 0.12;
  --background-hover-opacity: 0.04;
  --transition: opacity 15ms linear, background-color 15ms linear;
  --padding-start: 16px;
  --color: var(--app-text-color, #000);
  --border-color: rgba(0, 0, 0, 0.13);
  --inner-padding-end: 16px;
  --inner-border-width: 0 0 1px 0;
  --highlight-height: 2px;
  --highlight-color-focused: var(--main-color, #3880ff);
  --highlight-color-valid: var(--color-success, #2dd36f);
  --highlight-color-invalid: var(--color-danger, #eb445a);
  --border-radius: 0px;
  --border-width: 0.5px;
  --border-style: solid;
  --padding-top: 6px;
  --padding-bottom: 6px;
  --padding-end: 6px;
  --padding-start: 6px;
  --inner-border-width: 0px;
  --inner-padding-top: 0px;
  --inner-padding-bottom: 2px;
  --inner-padding-start: 0px;
  --inner-padding-end: 0px;
  --inner-box-shadow: none;
  --show-full-highlight: 0;
  --show-inset-highlight: 0;
  --detail-icon-color: initial;
  --detail-icon-font-size: 20px;
  --detail-icon-opacity: 0.25;
  --color-activated: var(--color);
  --color-focused: var(--color);
  --color-hover: var(--color);
  --ripple-color: currentColor;
  -webkit-font-smoothing: antialiased;
  display: block;
  position: relative;
  align-items: center;
  justify-content: space-between;
  outline: none;
  color: var(--color);
  font-family: var(--app-font-family, inherit);
  text-align: initial;
  text-decoration: none;
  overflow: hidden;
  font-size: 16px;
  font-weight: normal;
}
.item {
  border-radius: var(--border-radius);
  margin: 0px;
  padding-left: calc(var(--padding-start) + 0px);
  padding-right: var(--padding-end);
  padding-top: var(--padding-top);
  padding-bottom: var(--padding-bottom);
  font-family: inherit;
  font-size: inherit;
  font-style: inherit;
  font-weight: inherit;
  letter-spacing: inherit;
  text-decoration: inherit;
  text-indent: inherit;
  text-overflow: inherit;
  text-transform: inherit;
  text-align: inherit;
  white-space: inherit;
  color: inherit;
  display: flex;
  position: relative;
  align-items: inherit;
  justify-content: inherit;
  width: 100%;
  min-height: var(--min-height);
  transition: all 2ms ease;
  border-bottom: var(--border-width, 1px) var(--border-style, solid)
    var(--border-color, #ccc);
  outline: none;
  background: var(--background);
  overflow: inherit;
  box-sizing: border-box;
  z-index: 1;
}
button,
a {
  cursor: pointer;
  user-select: none;
  -webkit-user-drag: none;
  border: inherit;
}
</style>