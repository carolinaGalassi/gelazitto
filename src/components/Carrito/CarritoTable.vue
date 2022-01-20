<template>
	<v-data-table :headers="headers" :items="data" class="elevation-1">
		<template v-slot:item.price="{ item }">
			{{ item.price | priceFormat }}
		</template>
		<template v-slot:item.flavors="{ item }">
			{{ item.flavors | formatFlavors }}
		</template>
	</v-data-table>
</template>

<script>
export default {
	name: "TableComponent",
	props: {
		data: Array,
	},
	data: () => ({
		headers: [
			{
				text: "titulo",
				align: "start",
				sortable: false,
				value: "title",
			},
			{ text: "Sabores", value: "flavors" },
			{ text: "Precio", value: "price" },
			{ text: "Cantidad", value: "quantity" },
		],
	}),
	methods: {
		amount: function (quantity, price) {
			return quantity * price;
		},
	},
	filters: {
		formatFlavors(value) {
			return value.toString();
		},
	},
};
</script>
