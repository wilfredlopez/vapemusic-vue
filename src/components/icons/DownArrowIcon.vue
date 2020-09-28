<template>
  <span>
    <div class="icon-inner">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="icon"
        :class="className"
        viewBox="0 0 512 512"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="48"
          d="M112 268l144 144 144-144M256 392V100"
          class="ionicon-fill-none"
        />
      </svg>
    </div>
  </span>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  props: {
    className: {
      type: String,
      required: false,
      default: "",
    },
  },
});
</script>

<style scoped>
span {
  display: inline-block;
  width: 1.5em;
  height: 1.5em;
  contain: strict;
  fill: currentcolor;
  box-sizing: content-box !important;
}

.icon-inner,
.icon,
svg {
  display: block;
  height: 100%;
  width: 100%;
}
</style>
