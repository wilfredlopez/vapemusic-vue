<template>
  <div class="wl-spinner" v-show="loading">
    <div class="wl-rotate wl-rotate1" v-bind:style="spinnerStyle">
      <div class="wl-rotate wl-rotate2" v-bind:style="spinnerStyle"></div>
      <div class="wl-rotate wl-rotate3" v-bind:style="spinnerStyle"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RotateSpinner",
  props: {
    loading: {
      type: Boolean,
      default: true,
    },
    color: {
      type: String,
      default: "#fa4d4d",
    },
    size: {
      type: String,
      default: "15px",
    },
    margin: {
      type: String,
      default: "2px",
    },
    radius: {
      type: String,
      default: "100%",
    },
  },
  data() {
    return {
      spinnerStyle: {
        backgroundColor: this.color,
        height: this.size,
        width: this.size,
        margin: this.margin,
        borderRadius: this.radius,
      },
    };
  },
};
</script>

<style>
.wl-spinner .wl-rotate1 {
  -webkit-animation: wl-rotateStretchDelay 1s 0s infinite
    cubic-bezier(0.7, -0.13, 0.22, 0.86);
  animation: wl-rotateStretchDelay 1s 0s infinite
    cubic-bezier(0.7, -0.13, 0.22, 0.86);
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  display: inline-block;
  position: relative;
}
.wl-spinner .wl-rotate2 {
  opacity: 0.8;
  position: absolute;
  top: 0;
  left: -28px;
}
.wl-spinner .wl-rotate3 {
  opacity: 0.8;
  position: absolute;
  top: 0;
  left: 25px;
}
@-webkit-keyframes wl-rotateStretchDelay {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  50% {
    -webkit-transform: rotate(180deg);
    transform: rotate(180deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes wl-rotateStretchDelay {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  50% {
    -webkit-transform: rotate(180deg);
    transform: rotate(180deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>