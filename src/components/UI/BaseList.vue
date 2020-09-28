<template>
  <div class="host">
    <div class="root">
      <header class="head">
        <slot name="header"> </slot>
      </header>
      <slot></slot>
    </div>
  </div>
</template>


<style lang="scss" scoped>
header,
.head {
  margin: 0px;
  padding: 0px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  min-height: 40px;
  border-width: var(--border-width);
  border-style: var(--border-style);
  border-color: var(--border-color);
  background: var(--background);
  color: var(--color);
  overflow: hidden;
  padding-left: calc(12px + 16px);
  min-height: 45px;
  font-size: 14px;
  padding-left: unset;
  padding-inline-start: calc(12px + 16px);
}
.host {
  --border-style: solid;
  --border-width: 0;
  --inner-border-width: 0;
  -webkit-font-smoothing: antialiased;
  --color: #000;
  --border-color: rgba(0, 0, 0, 0.13);
  --background: var(--list-background, #fff);
  --color: var(--text-color, #000);
  --padding-top: 0px;
  --padding-bottom: 0px;
  --padding-start: 0px;
  --padding-end: 0px;
  --keyboard-offset: 0px;
  --offset-top: 0px;
  --offset-bottom: 0px;
  --overflow: auto;
  display: block;
  position: relative;
  flex: 1 1 0%;
  width: 100%;
  height: 100%;
  font-family: var(--app-font-family, inherit);
  margin: 0px !important;
  padding: 0px !important;
}
.root {
  margin-left: 0;
  margin-right: 0;
  margin-top: 0;
  margin-bottom: 0;
  padding-left: 0;
  padding-right: 0;
  padding-top: 8px;
  padding-bottom: 8px;
  background: var(--list-background, #fff);
}
</style>