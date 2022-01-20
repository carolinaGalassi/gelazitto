<template>
	<div>
		<v-data-table :headers="headers" :items="data" class="elevation-1">
			<template v-slot:item.oferta="{ item }">
				<div class="p-2">
					<v-chip class="ma-2" color="primary" v-if="item.oferta">
						{{ item.discount }} %
					</v-chip>
				</div>
			</template>
			<template v-slot:item.img="{ item }">
				<div class="p-2">
					<v-img :src="item.img" alt="lal" height="5em" width="5em" />
				</div>
			</template>
			<template v-slot:item.price="{ item }">
				{{ item.price | priceFormat }}
			</template>
			<template v-slot:item.actions="{ item }">
				<v-icon small class="mr-2" @click="editProduct(item)">
					mdi-pencil
				</v-icon>
				<v-icon
					small
					@click="
						dialog = true;
						id = item.id;
					"
				>
					mdi-delete
				</v-icon>
			</template>
		</v-data-table>
		<DialogZitto :show="dialog">
			<div>
				<h5 id="dialogTitle">
					¿Estas seguro de que queres borrar este producto?
				</h5>
			</div>
			<div class="dialog-action">
				<ButtonZitto @actionToExecute="dialog = false"> Cancelar </ButtonZitto>
				<ButtonZitto @actionToExecute="deleteProduct(id)"> Borrar </ButtonZitto>
			</div>
		</DialogZitto>
	</div>
</template>

<script>
import ButtonZitto from "../../../components/ButtonZitto.vue";
import DialogZitto from "../../../components/DialogZitto.vue";

export default {
	components: { ButtonZitto, DialogZitto },
	name: "Table2Component",
	data: () => ({
		dialog: false,
		id: undefined,
		headers: [
			{
				text: "titulo",
				align: "start",
				sortable: false,
				value: "title",
			},
			{ text: "Descripcion", value: "description" },
			{ text: "Imagen", value: "img" },
			{ text: "Oferta", value: "oferta" },
			{ text: "Precio", value: "price" },
			{ text: "Tipo", value: "type" },
			{ text: "Acciones", value: "actions", sortable: false },
		],
	}),
	props: {
		data: Array,
	},
	methods: {
		deleteProduct(id) {
			this.$emit("deleteProduct", id);
			this.dialog = false;
		},
		editProduct(product) {
			this.$emit("editProduct", product);
		},
	},
};
</script>

<style scoped>
.btn-icon {
	border: none;
	background: white;
}

.dialog-action {
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 0.8em;
}
</style>
