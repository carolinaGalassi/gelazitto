<template>
	<div class="desc-title-container">
		<v-divider />
		<h3 class="desc-title">{{ title }}</h3>
		<v-divider />
	</div>
</template>

<script>
export default {
	name: "ListTitleContainer",
	props: {
		title: String,
	},
};
</script>

<style scoped>
/* title */
.desc-title {
	margin-top: 0.8em;
	font-family: "Zilla Slab", ser;
	font-size: 2em;
	margin-left: 0.5em;
	font-weight: 600;
	margin-bottom: 1em;
	text-align: center;
	border-radius: 10px;
}

.desc-title-container {
	display: flex;
	gap: 1em;
	align-items: center;
}
</style>
