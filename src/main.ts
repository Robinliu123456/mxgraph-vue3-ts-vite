import { createApp } from "vue";
import App from "./App.vue";
import router from "./route/index";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const app = createApp(App);
app.use(router);
app.mount("#app");
