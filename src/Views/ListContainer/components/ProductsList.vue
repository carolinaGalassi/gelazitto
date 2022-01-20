<template>
	<div class="list-container">
		<article v-for="product in products" :key="product.id" class="desc-article">
			<img :src="product.img" :alt="product.title" class="img-sb" />
			<h5>{{ product.title }}</h5>
			<div class="prices">
				<p>{{ product.price | priceFormat }}</p>
				<LinkZitto
					text="Detalles"
					:route="`/product/${product.id}`"
					type="button"
				/>
			</div>
		</article>
	</div>
</template>
<script>
import LinkZitto from "../../../components/LinkZitto.vue";

export default {
	name: "productComponent",
	props: {
		products: Array,
	},
	components: {
		LinkZitto,
	},
};
</script>
<style scoped>
.desc-article {
	font-family: "Zilla Slab", ser;
}

.desc-article h5,
.desc-article p {
	margin-bottom: 0;
}

.desc-article > div:nth-child(2) {
	display: flex;
	gap: 0.2em;
	align-items: baseline;
	justify-content: space-between;
}

.desc-article > div > div {
	display: flex;
	align-items: baseline;
}

.desc-article > div p:first-child {
	font-weight: bold;
	font-size: 2.3em;
}

.desc-article > div p:nth-child(2) {
	font-size: 1.7em;
	color: grey;
	text-decoration: line-through;
}

.img-sb {
	width: 15em;
	max-width: 100%;
	border-radius: 22px;
}

.list-container {
	display: flex;
	gap: 1em;
	flex-wrap: wrap;
	margin-left: 1em;
	margin-bottom: 1em;
}

@media only screen and (max-width: 520px) {
	.list-container {
		justify-content: center;
	}
}
</style>
