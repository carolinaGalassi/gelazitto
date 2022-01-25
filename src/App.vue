<template>
	<v-app>
		<router-view />
		<v-snackbar v-model="snackbar.show" color="primary">
			{{ snackbar.title }}
			<template v-slot:action="{ attrs }">
				<v-btn color="white" text v-bind="attrs" @click="snackbar.action()">
					{{ snackbar.textLink }}
				</v-btn>
			</template>
		</v-snackbar>
	</v-app>
</template>

<script>
import { mapState } from "vuex";
export default {
	name: "About",
	components: {},
	methods: {},
	computed: {
		...mapState({
			snackbar: (state) => state.snackbarModule,
		}),
	},
};
</script>

<style lang="scss">
*::-webkit-scrollbar {
	width: 5px;
}

*::-webkit-scrollbar-track {
	background-color: #e4e4e4;
	border-radius: 100px;
}

*::-webkit-scrollbar-thumb {
	border-radius: 100px;
	background-image: linear-gradient(135deg, #8bc6ec 0%, #9599e2 100%);
	box-shadow: inset 2px 2px 5px 0 rgba(#fff, 0.5);
}

div[role="progressbar"] {
	margin: 0 auto;
	position: absolute;
	top: 50%;
	left: 50%;
}

@import "~bootstrap/dist/css/bootstrap.css";
</style>
