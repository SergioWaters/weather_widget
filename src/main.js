import { createApp } from "vue";
import { store } from "./store";
import App from "./App.vue";

const app = createApp(App);
console.log(app, "created");

app.config.compilerOptions.isCustomElement = (tag) =>
  tag === "openweather-widgetsw";
console.log(app.config, "config");

app.use(store);
app.mount("openweather-widgetsw");
console.log(app, "mount");
