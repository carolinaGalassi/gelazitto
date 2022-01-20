<template>
	<v-container app>
		<section class="list-section">
			<v-progress-circular v-if="loading" indeterminate color="primary" />
			<NoProductsFound
				v-if="products.length === 0 && loading === false"
				text="¡Proximamente encontraras productos!"
			/>
			<div v-else>
				<div v-if="getAllOfertas.length > 0">
					<ListTitleContainer title="Descuentos" />
					<DiscountsList :products="getAllOfertas" />
				</div>
				<div v-if="getAllKgWithoutDiscount.length > 0">
					<ListTitleContainer title="Por KG" />
					<ProductList :products="getAllKgWithoutDiscount" />
				</div>
				<div v-if="getAllPostresWithoutDiscount.length > 0">
					<ListTitleContainer title="Postres Helados" />
					<ProductList :products="getAllPostresWithoutDiscount" />
				</div>
			</div>
		</section>
	</v-container>
</template>

<script>
import NoProductsFound from "../components/NotFound.vue";
const axios = require("axios");
import DiscountsList from "./ListContainer/components/DiscountsList.vue";
import ListTitleContainer from "./ListContainer/components/ListTitleContainer.vue";
import ProductList from "./ListContainer/components/ProductsList.vue";

export default {
	name: "ListContainerComponent",
	data: function () {
		return {
			products: [],
			detalle: false,
			productoSeleccionado: {},
			loading: false,
		};
	},
	components: {
		ProductList,
		DiscountsList,
		ListTitleContainer,
		NoProductsFound,
	},
	methods: {
		cerrarDetalle() {
			this.detalle = false;
		},
		getDiscountMount: function (product) {
			return product.price * ((100 - +product.discount) / 100);
		},
	},
	computed: {
		getAllOfertas: function () {
			return this.products.filter((p) => p.oferta);
		},
		getAllKgWithoutDiscount: function () {
			return this.products.filter((p) => p.type === "porKG" && !p.oferta);
		},
		getAllPostresWithoutDiscount: function () {
			return this.products.filter((p) => p.type === "postre" && !p.oferta);
		},
	},
	mounted() {
		this.loading = true;
		axios
			.get("https://61b4d9540e84b700173319bd.mockapi.io/qarocito/api/products")
			.then((response) => (this.products = response.data))
			.finally(() => (this.loading = false));
	},
};
</script>

<style scoped>
.list-section {
	display: flex;
	flex-direction: column;
	justify-content: center;
	gap: 0.8em;
	height: 100%;
	margin-bottom: 1em;
}

div[role="progressbar"] {
	margin: 0 auto;
	position: absolute;
	top: 50%;
	left: 50%;
}
</style>
