<template>
	<div class="desc-list">
		<article v-for="oferta in products" :key="oferta.id" class="desc-article">
			<div class="img-container">
				<h6>{{ oferta.discount | discountFormat }}</h6>
				<img :src="oferta.img" :alt="oferta.title" />
			</div>
			<h5>{{ oferta.title }}</h5>
			<div class="prices">
				<div>
					<p>{{ getDiscountMount(oferta) | priceFormat }}</p>
					<p>{{ oferta.price | priceFormat }}</p>
				</div>
				<LinkZitto
					text="Detalles"
					:route="`/product/${oferta.id}`"
					type="button"
				/>
			</div>
		</article>
	</div>
</template>

<script>
import LinkZitto from "../../../components/LinkZitto.vue";
export default {
	name: "DiscountListComponent",
	props: {
		products: Array,
	},
	components: {
		LinkZitto,
	},
	methods: {
		getDiscountMount: function (product) {
			return product.price * ((100 - +product.discount) / 100);
		},
	},
	filters: {
		discountFormat(value) {
			return `-${value}%`;
		},
	},
};
</script>

<style scoped>
.desc-list {
	display: flex;
	gap: 1em;
	flex-wrap: wrap;
	margin-bottom: 1em;
	margin-left: 1em;
}

.desc-article {
	font-family: "Zilla Slab", ser;
}

.desc-article h5,
.desc-article p {
	margin-bottom: 0;
}

.desc-article > div {
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

.prices > a {
	align-self: center;
}

.img-container {
	position: relative;
}

.img-container img {
	width: 15em;
	max-width: 100%;
	border-radius: 22px;
}

.img-container h6 {
	position: absolute;
	background: white;
	padding: 0.5em;
	border-radius: 0 0 10px 0px;
	font-weight: bold;
	color: #8186c1;
}

@media only screen and (max-width: 520px) {
	.desc-list {
		justify-content: center;
	}
}
</style>
