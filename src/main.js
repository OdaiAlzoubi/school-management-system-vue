import { createApp } from "vue";
import App from "./App.vue";
import router from "@/components/router/index";
import i18n from "@/i18n";

createApp(App).use(router).use(i18n).mount("#app");
