<template>
	<div>
		<header class="carrito-header">
			<h1>Compritas</h1>
			<h5>{{ totalAmount() | priceFormat }}</h5>
		</header>
		<CarritoTable :data="data" />
	</div>
</template>

<script>
import CarritoTable from "./CarritoTable.vue";

export default {
	name: "CarritoTableView",
	components: {
		CarritoTable,
	},
	props: {
		data: Array,
	},
	methods: {
		totalAmount: function () {
			return this.data.reduce(
				(previousValue, currentValue) =>
					previousValue + currentValue.quantity * currentValue.price,
				0,
			);
		},
	},
};
</script>

<style scoped>
.carrito-header {
	display: flex;
	justify-content: space-between;
	align-items: baseline;
}
</style>
