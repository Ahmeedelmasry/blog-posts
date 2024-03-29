import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

// Pinia config
import { createPinia } from "pinia";

// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import "@mdi/font/css/materialdesignicons.css";

const vuetify = createVuetify({
  components,
  directives,
});

createApp(App).use(vuetify).use(createPinia()).use(router).mount("#app");
