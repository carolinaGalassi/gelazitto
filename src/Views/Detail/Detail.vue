<template>
	<section class="detail-container">
		<v-progress-circular
			v-if="loading"
			indeterminate
			color="primary"
		></v-progress-circular>
		<div v-else class="detail-container-content">
			<v-img :src="product.img" class="my-3" contain height="200" />
			<div>
				<h3>{{ product.title }}</h3>
				<p>{{ product.descriptionExtendida }}</p>
				<h6>{{ product.price | priceFormat }}</h6>
				<ButtonZitto
					@actionToExecute="agregarAlCarrito"
					:disabled="requiredFlavors"
					>Agregar</ButtonZitto
				>
				<LinkZitto text="Volver" route="/" />
			</div>
			<v-select
				v-model="icecreams"
				:items="[
					'Chocolate',
					'Vainilla',
					'Menta granizada',
					'Tramontana',
					'Dulce de leche',
					'Banan split',
				]"
				label="Sabores disponibles"
				multiple
				chips
				hint="Elegir unicamente 4"
				persistent-hint
				class="icecream-flavors"
				:rules="[
					(v) => {
						return icecreams.length < 5 || 'Elegir unicamente 4';
					},
				]"
			></v-select>
		</div>
	</section>
</template>

<script>
import axios from "axios";
import LinkZitto from "../../components/LinkZitto.vue";
import ButtonZitto from "../../components/ButtonZitto.vue";

export default {
	name: "DetailComponent",
	components: {
		LinkZitto,
		ButtonZitto,
	},
	data: function () {
		return {
			product: {},
			loading: false,
			icecreams: [],
		};
	},
	computed: {
		requiredFlavors() {
			return this.icecreams.length === 0 || this.icecreams.length > 4;
		},
	},
	methods: {
		agregarAlCarrito() {
			this.$store.dispatch("addToCarrito", {
				...this.product,
				flavors: this.icecreams,
				quantity: 1,
			});
			this.icecreams = [];
			this.$store.dispatch("openSnack", {
				title: "Agregaste un nuevo producto",
				action: this.goToCarrito,
				textLink: "carrito",
			});
		},
		goToCarrito() {
			this.$router.push("/carrito");
		},
	},
	mounted() {
		const id = this.$route.params.id;
		this.loading = true;
		axios
			.get(
				`https://61b4d9540e84b700173319bd.mockapi.io/qarocito/api/products/${id}`,
			)
			.then((response) => (this.product = response.data))
			.finally(() => (this.loading = false));
	},
};
</script>

<style scoped>
.detail-container {
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
}
.detail-container-content {
	display: grid;
	grid-template-columns: 1fr 1fr;
	height: 100%;
	place-content: center;
}

.detail-container-content > div:nth-child(2) {
	align-self: center;
}

.icecream-flavors {
	grid-column: 1/ 4;
	padding: 1em;
	justify-self: center;
}

@media only screen and (max-width: 520px) {
	.detail-container-content {
		grid-template-columns: 1fr;
	}

	.detail-container-content > div:nth-child(2) {
		justify-self: center;
	}

	.icecream-flavors {
		grid-column: auto;
	}
}
</style>
