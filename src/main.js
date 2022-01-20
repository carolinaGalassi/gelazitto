import Vue from "vue";
import App from "./App.vue";
import router from "./router/index";
import vuetify from "./plugins/vuetify";
import store from "./store";
import { priceFormat } from "./utils/formaterFunctions";

Vue.config.productionTip = false;

Vue.filter("priceFormat", priceFormat);

new Vue({
	router,
	vuetify,
	store,
	render: (h) => h(App),
}).$mount("#app");
