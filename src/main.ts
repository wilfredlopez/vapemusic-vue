import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import BaseButton from "@/components/UI/BaseButton.vue";
import BaseCard from "@/components/UI/BaseCard.vue";
import BaseSpinner from "@/components/UI/BaseSpinner.vue";
import BaseDialog from "@/components/UI/BaseDialog.vue";
import VapeMusicLogo from "@/components/UI/VapeMusicLogo.vue";
import HomeIcon from "@/components/icons/HomeIcon.vue";
import InfoIcon from "@/components/icons/InfoIcon.vue";
import ProfileIcon from "@/components/icons/ProfileIcon.vue";
import SearchIcon from "@/components/icons/SearchIcon.vue";
import { apolloProvider, apolloClient } from "./apollo";

const app = createApp(App);

app.component("base-button", BaseButton);
app.component("base-card", BaseCard);
app.component("base-spinner", BaseSpinner);
app.component("base-dialog", BaseDialog);
app.component("vape-music-logo", VapeMusicLogo);
app.component("home-icon", HomeIcon);
app.component("info-icon", InfoIcon);
app.component("profile-icon", ProfileIcon);
app.component("search-icon", SearchIcon);

//middleware
app.use(apolloProvider);
app.use(store);
app.use(router);
app.provide("apollo", apolloClient);

app.mount("#app");
