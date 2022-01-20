<template>
	<button @click="action()" :disabled="disabled" :type="type">
		<slot></slot>
	</button>
</template>

<script>
export default {
	name: "ButtonZitto",
	props: {
		text: String,
		disabled: Boolean,
		type: {
			type: String,
			default: "text",
		},
	},
	methods: {
		action() {
			this.$emit("actionToExecute");
		},
	},
};
</script>

<style scoped>
button {
	border-radius: 10px;
	padding: 0.3em 0.8em 0.3em 0.8em;
	align-self: flex-end;
	color: #949ae2;
	border: solid 1px #9599e2;
	align-self: flex-end;
	font-family: "Zilla Slab", serif;
	text-transform: capitalize;
}

button:disabled {
	border: none;
	color: #0000007a;
	background-color: #80808036;
	cursor: initial;
}

button:hover:enabled {
	color: white;
	background-color: #949ae2;
}

button:hover i {
	color: white !important;
}

button i {
	color: #949ae2 !important;
}

button:disabled i {
	color: #0000007a !important;
}
</style>
