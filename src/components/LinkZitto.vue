<template>
	<router-link class="common" :to="route" :class="{ [type]: true }">{{
		text
	}}</router-link>
</template>

<script>
export default {
	name: "LinkZito",
	props: {
		route: String,
		text: String,
		type: {
			type: String,
			default: "classic",
		},
	},
};
</script>

<style scoped>
.common {
	text-decoration: none;
	border-radius: 10px;
	padding: 0.3em 0.8em 0.3em 0.8em;
	align-self: flex-end;
	color: #949ae2;
	border: none;
	font-family: "Zilla Slab", serif;
	text-transform: capitalize;
}

.classic:hover {
	text-decoration: underline;
}

.button {
	border: solid 1px #9599e2;
}

.button:hover {
	color: white;
	background-color: #949ae2;
}
</style>
