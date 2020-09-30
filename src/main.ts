import { createApp } from "vue";
import Wl from "wl-range-vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import BaseButton from "@/components/UI/BaseButton.vue";
import BaseCard from "@/components/UI/BaseCard.vue";
import BaseSpinner from "@/components/UI/BaseSpinner.vue";
import BaseDialog from "@/components/UI/BaseDialog.vue";
import VapeMusicLogo from "@/components/UI/VapeMusicLogo.vue";
import HomeIcon from "@/components/icons/HomeIcon.vue";
import PlayIcon from "@/components/icons/PlayIcon.vue";
import PauseIcon from "@/components/icons/PauseIcon.vue";
import InfoIcon from "@/components/icons/InfoIcon.vue";
import ProfileIcon from "@/components/icons/ProfileIcon.vue";
import SearchIcon from "@/components/icons/SearchIcon.vue";
import DownArrowIcon from "@/components/icons/DownArrowIcon.vue";
import BaseList from "@/components/UI/BaseList.vue";
import ListItem from "@/components/UI/ListItem.vue";
import RotateSpinner from "@/components/UI/RotateSpinner.vue";
import { apolloClient } from "./apollo";

// Before you create app
// (Vue as any).config.devtools = true;

const app = createApp(App);
app.use(Wl);
app.config.isCustomElement = el => el.startsWith("wl");
// (app as any).config.devtools = process.env.NODE_ENV === "development";

// After you create app
// (window as any).__VUE_DEVTOOLS_GLOBAL_HOOK__.Vue = app.constructor;

//base components
app.component("base-button", BaseButton);
app.component("base-card", BaseCard);
app.component("base-spinner", BaseSpinner);
app.component("base-dialog", BaseDialog);
app.component("base-list", BaseList);
app.component("list-item", ListItem);
app.component("rotate-spinner", RotateSpinner);
//logos and icons
app.component("vape-music-logo", VapeMusicLogo);
app.component("home-icon", HomeIcon);
app.component("info-icon", InfoIcon);
app.component("play-icon", PlayIcon);
app.component("pause-icon", PauseIcon);
app.component("down-arrow-icon", DownArrowIcon);
app.component("profile-icon", ProfileIcon);
app.component("search-icon", SearchIcon);
//middleware
app.use(store);

app.use(router);
app.provide("apollo", apolloClient);
app.mount("#app");
