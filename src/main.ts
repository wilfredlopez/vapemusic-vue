import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import BaseButton from "@/components/UI/BaseButton.vue";
import BaseCard from "@/components/UI/BaseCard.vue";
import BaseSpinner from "@/components/UI/BaseSpinner.vue";
import BaseDialog from "@/components/UI/BaseDialog.vue";

const app = createApp(App);
app.component("base-button", BaseButton);
app.component("base-card", BaseCard);
app.component("base-spinner", BaseSpinner);
app.component("base-dialog", BaseDialog);
app.use(store);
app.use(router).mount("#app");
