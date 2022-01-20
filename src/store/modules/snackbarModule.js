export default {
	state: {
		show: false,
		title: "",
		action: null,
		textLink: "",
	},
	mutations: {
		OPEN_SNACK(state, payload) {
			state.show = true;
			state.title = payload.title;
			state.action = payload?.action || (() => (state.show = false));
			state.textLink = payload?.textLink || "Cerrar";
		},
		CLOSE_SNACK(state) {
			state.show = false;
		},
	},
	actions: {
		openSnack: ({ commit }, payload) => {
			commit("OPEN_SNACK", payload);
			setTimeout(function () {
				commit("CLOSE_SNACK");
			}, 2500);
		},
	},
};
