<template>
  <div class="track-progress">
    <div class="progress-container host">
      <div class="range-slider">
        <div class="range-bar" role="presentation" part="bar"></div>
        <div
          class="range-bar range-bar-active"
          role="presentation"
          part="bar-active"
          :style="{ right: `${100 - value}%`, left: '0%' }"
        ></div>
        <input
          type="range"
          class="aux-input"
          aria-valuemin="0"
          aria-valuemax="100"
          :aria-valuenow="value"
          name=""
          :value="value"
          @change="handleSeek"
        />
        <!-- @keydown="handleSeek" -->
        <div
          class="range-knob-handle range-knob-a"
          role="slider"
          tabindex="0"
          aria-valuemin="0"
          aria-valuemax="100"
          aria-valuenow="8"
          :style="{ left: `${value}%` }"
        >
          <div class="range-knob" role="presentation" part="knob"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, Events, PropType } from "vue";
export default defineComponent({
  props: {
    value: {
      type: Number,
      required: true,
    },
    seekTo: {
      type: Function as PropType<(value: number) => void>,
      required: false,
    },
  },
  methods: {
    handleSeek(event: Events["onChange"]) {
      const target = event.target as HTMLInputElement | null;
      if (target) {
        const value = target.value;
        const seekTo = parseInt(value);
        if (isNaN(seekTo)) {
          return;
        }
        if (this.$props.seekTo) {
          this.$props.seekTo(seekTo);
        }
      }
    },
  },
});
</script>

<style scoped>
.host {
  /* --thump-border-radius: 7px; */
  --thump-border-radius: 0px;
  --thump-height: 20px;
  --thump-width: 39px;
  --thump-box-shadow: 0px 0px 0px rgba(0, 0, 0, 0.2),
    0px 0px 0px rgba(0, 0, 0, 0.2);
  --thump-border: 0px solid rgba(0, 0, 0, 0.2);
  --knob-box-shadow: none;
  --knob-handle-size: calc(var(--thump-height) * 2);
  --bar-background-active: transparent;
  --knob-background: transparent;
  --bar-border-radius: 0;
  --height: 32px;
  --pin-background: var(--main-color, #00ff15);
}

.aux-input {
  /* color: transparent; */
  color: inherit;
  background: transparent;
  margin: 0;
  margin-left: unset;
  margin-inline-start: calc(16px - var(--height, 32px) / 2);
  /* user-select: none; */
  user-select: all;
  /* display: none; */
  /* display: block; */
  width: 100%;
  border: none;

  position: absolute;
  height: var(--height, 32px);
  outline: none;
  /* padding: 8px 14px; */
  padding: 0;
  touch-action: manipulation;
  appearance: initial;
  cursor: default;
  letter-spacing: normal;
  word-spacing: normal;
  text-transform: none;
  text-indent: 0px;
  text-shadow: none;
}
input[type="range"] {
  -webkit-appearance: none;

  margin: -1px 0;

  width: 100%;
}
input[type="range"]:focus {
  outline: none;
}
input[type="range"]::-webkit-slider-runnable-track {
  width: 100%;
  height: 12.8px;
  cursor: pointer;
  box-shadow: 0px 0px 0px rgba(0, 0, 0, 0.02), 0px 0px 0px rgba(0, 0, 0, 0.191);
  background: var(--knob-background);
  border-radius: 25px;
  border: 0px solid rgba(34, 34, 34, 0.102);
}
input[type="range"]::-webkit-slider-thumb {
  box-shadow: var(--thump-box-shadow);
  border: var(--thump-border);
  height: var(--thump-height, 20px);
  width: var(--thump-width, 39px);
  border-radius: var(--thump-border-radius, 7px);
  background: var(--pin-background);
  cursor: pointer;
  -webkit-appearance: none;
  margin-top: -3.6px;
}
input[type="range"]:focus::-webkit-slider-runnable-track {
  background: var(--bar-background-active);
}
input[type="range"]::-moz-range-track {
  width: 100%;
  height: 12.8px;
  cursor: pointer;
  animation-duration: 0.2s;
  box-shadow: 0px 0px 0px #000000, 0px 0px 0px #0d0d0d;
  background: var(--bar-background-active);
  border-radius: 25px;
  border: 0px solid #000101;
}
input[type="range"]::-moz-range-thumb {
  box-shadow: var(--thump-box-shadow);
  border: var(--thump-border);
  height: var(--thump-height, 20px);
  width: var(--thump-width, 39px);
  border-radius: var(--thump-border-radius, 7px);
  background: var(--pin-background);
  cursor: pointer;
}
input[type="range"]::-ms-track {
  width: 100%;
  height: 12.8px;
  cursor: pointer;
  animation-duration: 0.2s;
  background: transparent;
  border-color: transparent;
  border-width: 39px 0;
  color: transparent;
}
input[type="range"]::-ms-fill-lower {
  background: var(--knob-background);
  border: 0px solid rgba(0, 0, 0, 0.253);
  border-radius: 50px;
  box-shadow: 0px 0px 0px rgba(0, 0, 0, 0.164), 0px 0px 0px rgba(0, 0, 0, 0.144);
}
input[type="range"]::-ms-fill-upper {
  background: var(--bar-background-active);
  border: 0px solid rgba(0, 0, 0, 0.11);
  border-radius: 50px;
  box-shadow: 0px 0px 0px #000000, 0px 0px 0px #0d0d0d;
}
input[type="range"]::-ms-thumb {
  box-shadow: var(--thump-box-shadow);
  border: var(--thump-border);
  height: var(--thump-height, 20px);
  width: var(--thump-width, 39px);
  border-radius: var(--thump-border-radius, 7px);
  background: var(--pin-background);
  cursor: pointer;
}
input[type="range"]:focus::-ms-fill-lower {
  background: var(--knob-background);
}
input[type="range"]:focus::-ms-fill-upper {
  background: var(--bar-background-active);
}

.track-progress {
  margin-bottom: 1rem;
}

.progress-container {
  padding-inline-start: 0px;
  padding-inline-end: 0px;
  display: flex;
  position: relative;
  flex: 3 1 0%;
  align-items: center;
  user-select: none;
  z-index: 2;
}

.range-slider {
  position: relative;
  flex: 1 1 0%;
  width: 100%;
  height: 40px;
  contain: size layout style;
  cursor: grab;
  touch-action: pan-y;
}
.range-bar {
  border-radius: 3px;
  left: 0px;
  top: calc((30px - 20px) / 2);
  position: absolute;
  width: 100%;
  height: 20px;
  /* background: rgb(112, 250, 216); */
  background: rgba(255, 0, 0, 0.514);
  pointer-events: none;
}
.range-bar-active {
  bottom: 0px;
  width: auto;
  background: var(--main-color);
  /* background: rgba(0, 0, 0, 0.4); */
}

.range-knob-handle:active,
.range-knob-handle:focus {
  outline: none;
}

.range-knob-handle {
  display: none;
  margin-left: unset;
  position: absolute;
  width: 30px;
  height: 30px;
  text-align: center;
  margin-inline-start: calc(0px - 30px / 2);
}
.range-knob {
  transform: scale(0.67);
  transition-duration: 120ms;
  transition-property: transform, background-color, border, -webkit-transform;
  transition-timing-function: ease;
  z-index: 2;
  border-radius: 50%;
  left: calc(50% - 25px / 2);
  top: calc(50% - 25px / 2);
  position: absolute;
  width: 25px;
  height: 25px;
  background: rgb(255, 255, 255);
  box-shadow: var(--knob-box-shadow);
  pointer-events: none;
}
</style>
