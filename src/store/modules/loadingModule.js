export default {
	state: {
		show: false,
	},
	mutations: {
		SET_LOADING(state, payload) {
			state.show = payload;
		},
	},
	actions: {
		setLoading: ({ commit }, payload) => {
			commit("SET_LOADING", payload);
		},
	},
};
