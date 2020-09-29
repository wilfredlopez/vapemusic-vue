<template>
  <button
    v-if="!link"
    :disabled="disabled"
    :class="{ [mode]: mode, shadow: shadow }"
    :title="label"
    :aria-label="label"
  >
    <slot></slot>
  </button>
  <router-link v-else :to="to" :class="mode">
    <slot></slot>
  </router-link>
</template>

<script>
export default {
  props: {
    mode: {
      type: String, // 'flat' | 'outline'
      required: false,
      default: null,
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
    shadow: {
      type: Boolean,
      required: false,
      default: true,
    },
    link: {
      type: Boolean,
      required: false,
      default: false,
    },
    label: {
      type: String,
      required: false,
      default: "",
    },
    to: {
      type: String,
      required: false,
      default: "/",
    },
  },
};
</script>

<style scoped>
button,
a {
  text-decoration: none;
  padding: 0.65rem 1rem;
  font: inherit;
  background-color: var(--main-color, #3a0061);
  border: 1px solid var(--main-color, #3a0061);
  color: white;
  cursor: pointer;
  border-radius: 4px;
  margin-right: 0.5rem;
  display: inline-block;
  outline: none;
  box-sizing: border-box;
}
.shadow {
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.1);
}
button[primary] {
  background: var(--main-color, blue);
  color: var(--main-color-constrast, red);
}

button[secondary] {
  background: var(--secondary-color, blue);
  color: var(--secondary-color-contrast, red);
}
button[transparent] {
  background: transparent;
  color: var(--main-color-contrast, rgb(255, 255, 255));
  border-color: transparent;
}
button[transparent]:hover {
  background: rgb(0 0 0 / 12%) !important;
  color: var(--main-color-contrast, rgb(255, 255, 255)) !important;
  border-color: transparent !important;
}
button[circular] {
  border-radius: 50%;
}

button:disabled {
  filter: brightness(0.7);
}

button[small] {
  padding: 0.1rem 0.5rem;
}
a:hover,
a:active,
button:hover,
button:active {
  background-color: var(--main-color-shade, #270041);
  border-color: var(--main-color-shade, #270041);
}

.flat {
  background-color: transparent;
  color: var(--main-color, #3a0061);
  border: none;
}

.outline {
  background-color: transparent;
  border-color: var(--main-color, #3a0061);
  color: var(--main-color, #3a0061);
}

.clear {
  background-color: transparent;
  border: 1px solid transparent;
  color: #ffffff;
}
.clear:hover,
.clear:active {
  background-color: transparent;
  border: 1px solid white;
}

.flat:hover,
.flat:active,
.outline:hover,
.outline:active {
  /* background-color: #e5edff; */
  background-color: var(--main-color-tint, #2e034b);
  color: var(--main-color-contrast);
}
</style>
