<template>
  <!-- width="553" -->
  <!-- height="360" -->
  <svg
    :class="color"
    viewBox="0 0 553 360"
    fill="inherit"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g filter="url(#filter0_d)">
      <path
        d="M4.7402 36.9655L52.3813 24.4044L135.285 338.836L4.7402 36.9655Z"
        fill="inherit"
      />
      <path
        d="M224.112 25.0274L271.506 38.4936L135.235 337.823L224.112 25.0274Z"
        fill="inherit"
      />
      <path
        d="M279 37.1648H308.873V313.425L279 338.165V37.1648Z"
        fill="inherit"
      />
      <path d="M518.464 37H548.336V338L518.464 314.807V37Z" fill="inherit" />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M406.687 242.336C405.965 243.942 403.564 243.428 403.564 241.667V239.31L405.853 235.318L406.449 236.402C407.455 238.234 407.543 240.431 406.687 242.336ZM352.464 138.125L405.853 235.318L476.179 112.705L523.694 36.9401L296.881 36.9401L352.464 138.125ZM409.971 132.61L409.287 70.3164L441.489 69.9431L441.728 93.5619L420.26 93.8108L420.858 152.858C420.99 165.907 411.598 176.587 399.683 176.725C396.824 176.828 393.975 176.303 391.303 175.178C388.63 174.053 386.189 172.353 384.122 170.177C382.054 168 380.403 165.391 379.264 162.504C378.125 159.616 377.522 156.507 377.49 153.361C377.459 150.214 377.998 147.092 379.078 144.178C380.158 141.265 381.757 138.619 383.779 136.395C385.802 134.171 388.209 132.414 390.857 131.228C393.506 130.042 396.344 129.45 399.205 129.487C403.122 129.442 406.785 130.64 409.971 132.61ZM388.71 153.231C388.776 159.726 393.66 164.984 399.563 164.916C405.467 164.847 410.244 159.477 410.178 152.982C410.112 146.487 405.228 141.228 399.324 141.297C393.421 141.365 388.644 146.735 388.71 153.231Z"
        fill="inherit"
      />
    </g>
    <defs>
      <!-- width="551.596" -->
      <!-- height="334.993" -->
      <filter
        id="filter0_d"
        x="0.740204"
        y="24.4044"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dy="4" />
        <feGaussianBlur stdDeviation="2" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  props: {
    color: {
      type: String,
      required: false,
      default: "vape"
    }
  }
});
</script>

<style scoped>
svg {
  width: 50px;
  height: 40px;
  /* padding: 0 6px; */
  /* filter: invert(1); */
  display: block;
}

svg.vape {
  fill: #fa4d4d;
}

svg.white {
  fill: white;
}
</style>
