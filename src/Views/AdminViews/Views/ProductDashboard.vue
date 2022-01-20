<template>
	<section>
		<v-progress-circular v-if="loading" indeterminate color="primary" />
		<div v-else>
			<FormComponent
				@newUser="newProductAdded"
				@editTheProduct="editTheProduct"
				:productToEdit="productToEdit"
			/>
			<TableComponent
				:data="products"
				@deleteProduct="deleteProduct"
				@editProduct="editProduct"
			/>
		</div>
	</section>
</template>

<script>
import FormComponent from "../Components/FormComponent.vue";
import TableComponent from "../Components/TableComponent.vue";
const axios = require("axios");

export default {
	name: "ProductDashboardView",
	data: function () {
		return {
			products: [],
			productToEdit: {},
			loading: false,
		};
	},
	components: {
		FormComponent,
		TableComponent,
	},
	methods: {
		getAllProducts(title = undefined) {
			this.loading = true;
			axios
				.get(
					"https://61b4d9540e84b700173319bd.mockapi.io/qarocito/api/products",
				)
				.then((response) => {
					this.products = response.data;
					title &&
						this.$store.dispatch("openSnack", {
							title: `${title}`,
						});
				})
				.finally(() => (this.loading = false));
		},
		newProductAdded(product) {
			this.loading = true;
			axios
				.post(
					"https://61b4d9540e84b700173319bd.mockapi.io/qarocito/api/products",
					product,
				)
				.then(() => {
					this.getAllProducts("Producto agregado con éxito!");
				})
				.finally(() => (this.loading = false));
		},
		deleteProduct(id) {
			this.loading = true;
			axios
				.delete(
					`https://61b4d9540e84b700173319bd.mockapi.io/qarocito/api/products/${id}`,
				)
				.then(() => this.getAllProducts("Producto eliminado con éxito"));
		},
		editProduct(product) {
			this.productToEdit = product;
			this.$store.dispatch("openSnack", {
				title: `${product.title} listo para editar!`,
			});
		},
		editTheProduct(product) {
			this.loading = true;
			axios
				.put(
					`https://61b4d9540e84b700173319bd.mockapi.io/qarocito/api/products/${product.id}`,
					product,
				)
				.then(() => this.getAllProducts("Producto editado con éxito"));
		},
	},
	mounted: function () {
		this.getAllProducts();
	},
};
</script>

<style scoped>
section {
	padding: 1em;
}
div[role="progressbar"] {
	position: absolute;
	top: 50%;
	left: 50%;
}
</style>
