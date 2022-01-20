<template>
	<v-footer app
		><p class="animation">
			No puedes comprar felicidad, ¡Pero si helado!
		</p></v-footer
	>
</template>

<script>
export default {
	name: "FooterComponent",
};
</script>

<style scoped>
.v-footer {
	font-family: "Zilla Slab", ser;
	display: flex;
	justify-content: center;
}
.animation {
	width: 46ch;
	animation: typing 18s steps(46) infinite,
		blink 0.8s step-end infinite alternate;
	white-space: nowrap;
	overflow: hidden;
	font-family: monospace;
	font-size: 1em;
	margin: 0;
}

@keyframes typing {
	0% {
		width: 0;
	}
	50% {
		width: 46ch;
	}
}

@keyframes blink {
	50% {
		border-color: transparent;
	}
}

@media only screen and (max-width: 450px) {
	footer {
		display: none !important;
	}
}
</style>
