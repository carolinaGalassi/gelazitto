<template>
	<v-container>
		<section class="carrito-container">
			<EmptyCarrito
				v-if="$store.getters.numberOfProducts === 0"
				text="¡No armaste tu pedido aún!"
			/>
			<div v-else>
				<CarritoTableView :data="$store.getters.getCarrito" />
				<div class="carrito-action-container">
					<ButtonZitto @actionToExecute="emptyCarrito">Vaciar</ButtonZitto>
					<LinkZitto text="Comprar" :route="`/buy`" type="button" />
				</div>
			</div>
		</section>
	</v-container>
</template>

<script>
import CarritoTableView from "../../components/Carrito/CarritoTableView.vue";
import EmptyCarrito from "../../components/NotFound.vue";
import ButtonZitto from "../../components/ButtonZitto.vue";
import LinkZitto from "../../components/LinkZitto.vue";

export default {
	name: "CarritoComponent",
	components: {
		EmptyCarrito,
		ButtonZitto,
		LinkZitto,
		CarritoTableView,
	},
	methods: {
		emptyCarrito() {
			this.$store.dispatch("emptyCarrito");
		},
		totalAmount: function () {
			return this.$store.getters.getCarrito.reduce(
				(previousValue, currentValue) =>
					previousValue + currentValue.quantity * currentValue.price,
				0,
			);
		},
	},
};
</script>

<style scoped>
.carrito-container {
	display: flex;
	justify-content: center;
	margin: 2em;
}

.carrito-action-container {
	display: flex;
	justify-content: center;
	gap: 0.5em;
	margin-top: 1em;
}
</style>
