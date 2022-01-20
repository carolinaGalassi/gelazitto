<template>
	<div class="empty-carrito">
		<img :src="img" :alt="'lasa'" class="img-logo" />
		<h3>{{ text }}</h3>
		<LinkZitto text="Volver!" route="/" type="button" />
	</div>
</template>

<script>
import imgShop from "../assets/shop.png";
import LinkZitto from "./LinkZitto.vue";

export default {
	name: "EmptyCarrito",
	props: {
		text: String,
	},
	data: function () {
		return {
			img: imgShop,
		};
	},
	components: {
		LinkZitto,
	},
};
</script>

<style scoped>
.empty-carrito {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 100%;
	gap: 1em;
}

.empty-carrito img {
	width: 20em;
	opacity: 0.7;
}

.empty-carrito a {
	align-self: center;
}

h3 {
	font-family: "Zilla Slab", serif;
}
</style>
