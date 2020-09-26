<template>
  <button v-if="!link" :class="mode">
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
      default: null
    },
    link: {
      type: Boolean,
      required: false,
      default: false
    },
    to: {
      type: String,
      required: false,
      default: "/"
    }
  }
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
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.1);
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
  background-color: var(--main-color-shade, #2e034b);
}
</style>
