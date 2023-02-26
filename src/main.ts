import { createApp } from "vue";
import App from "./App.vue";
import Notifications from "@kyvg/vue3-notification";

import { router } from "./ui/router/router";

// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import { aliases, mdi } from "vuetify/iconsets/mdi";

const vuetify = createVuetify({
  //components,
  //directives,

  icons: {
    defaultSet: "mdi",
    aliases,
    sets: {
      mdi,
    },
  },
});

const app = createApp(App);

app.use(router);
app.use(vuetify);
app.use(Notifications);

app.mount("#app");
