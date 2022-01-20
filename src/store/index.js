import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import { set, remove } from "../utils/localStorageFunctions";
import snackbarModule from "./modules/snackbarModule";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		carrito: [],
		authenticated: false,
	},
	mutations: {
		ADD_CARRITO(state, payload) {
			const newCarrito = [...state.carrito, payload];
			state.carrito = newCarrito;
			set("carrito", newCarrito);
		},
		LOGIN_USER(state, payload) {
			state.authenticated = payload;
		},
		EMPTY_CARRITO(state) {
			state.carrito = [];
			remove("carrito");
		},
		FILL_CARRITO(state, payload) {
			state.carrito = payload;
		},
	},
	actions: {
		addToCarrito(context, payload) {
			context.commit("ADD_CARRITO", payload);
		},
		emptyCarrito(context) {
			context.commit("EMPTY_CARRITO");
		},
		authentication(context, payload) {
			return new Promise((resolve, reject) => {
				axios
					.get("https://61b4d9540e84b700173319bd.mockapi.io/qarocito/api/users")
					.then((response) => {
						const users = response.data;
						const userFind = users.find(
							(user) =>
								user.email === payload.mail &&
								user.password === payload.password,
						);
						if (userFind) {
							resolve("");
							context.commit("LOGIN_USER", userFind);
						} else {
							reject("Mail o contraseña incorrecto!");
						}
					})
					.catch(() => {
						reject("Pagina no disponible!");
					});
			});
		},
		logout(context) {
			context.commit("LOGIN_USER", false);
		},
		fillCarrito(context, payload) {
			context.commit("FILL_CARRITO", payload);
		},
	},
	getters: {
		isAuthenticated: (state) => state.authenticated,
		numberOfProducts: (state) => state.carrito.length,
		getCarrito: (state) => state.carrito,
	},
	modules: { snackbarModule },
});
