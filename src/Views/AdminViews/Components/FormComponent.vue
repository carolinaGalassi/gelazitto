<template>
	<div class="container">
		<v-expansion-panels>
			<v-expansion-panel>
				<v-expansion-panel-header> Formulario </v-expansion-panel-header>
				<v-expansion-panel-content>
					<v-form ref="userForm" @submit="onSubmit">
						<v-text-field
							v-model="title"
							label="Titulo"
							:rules="[(v) => !!v || 'Requerido']"
						/>
						<v-select
							v-model="type"
							:items="types"
							:rules="[(v) => !!v || 'Requerido']"
							label="Tipo"
						/>
						<v-text-field
							v-model="description"
							label="Descripcion"
							placeholder="Colocar la composicion o cantidad de sabores"
							:rules="[(v) => !!v || 'Requerido']"
						/>
						<v-text-field
							v-model="img"
							label="URL - Imagen"
							type="url"
							:rules="[(v) => !!v || 'Requerido']"
						/>
						<v-text-field
							v-model.number="stock"
							label="Stock"
							:rules="[
								(v) => !!v || 'Requerido',
								(v) => /^[0-9]*$/.test(v) || 'Solo números',
							]"
						/>
						<v-text-field
							v-model="price"
							label="Precio"
							prefix="$"
							:rules="[
								(v) => !!v || 'Requerido',
								(v) => /^[0-9]*$/.test(v) || 'Solo números',
							]"
						/>
						<v-checkbox v-model="oferta" label="¿Esta en oferta?" />
						<v-text-field
							v-model="discount"
							label="Porcentaje"
							:disabled="!oferta"
							required="oferta"
							placeholder="colocar el descuento sin porcentaje"
							suffix="%"
							:rules="ruld"
						/>
						<ButtonZitto type="submit">{{ buttonLabel }}</ButtonZitto>
					</v-form>
				</v-expansion-panel-content>
			</v-expansion-panel>
		</v-expansion-panels>
	</div>
</template>

<script>
import ButtonZitto from "../../../components/ButtonZitto.vue";
import { isObjectEmpty } from "../../../utils/operations";

export default {
	components: { ButtonZitto },
	name: "FormComponent",
	data: function () {
		return {
			title: "",
			description: "",
			img: "",
			stock: "",
			price: "",
			id: "",
			buttonLabel: "Registrar",
			oferta: false,
			discount: "",
			type: "",
			types: ["porKG", "postre"],
		};
	},
	props: {
		productToEdit: Object,
	},
	watch: {
		productToEdit: function () {
			if (!isObjectEmpty(this.productToEdit)) {
				this.title = this.productToEdit.title;
				this.description = this.productToEdit.description;
				this.descriptionExtendida = this.productToEdit.descriptionExtendida;
				this.img = this.productToEdit.img;
				this.stock = this.productToEdit.stock;
				this.price = this.productToEdit.price;
				this.id = this.productToEdit.id;
				this.oferta = this.productToEdit.oferta;
				this.discount = this.productToEdit.discount;
				this.type = this.productToEdit.type;
			}
			this.buttonLabel = "Editar";
		},
	},
	computed: {
		ruld() {
			return this.oferta
				? [
						(v) => !!v || "Requerido",
						(v) => /^[0-9]*$/.test(v) || "Solo números",
				  ] // eslint-disable-line no-mixed-spaces-and-tabs
				: undefined;
		},
	},
	methods: {
		onSubmit(e) {
			e.preventDefault();
			console.log(this.$refs.userForm.validate());
			if (!this.$refs.userForm.validate()) return;

			const newProduct = {
				title: this.title,
				description: this.description,
				descriptionExtendida: this.descriptionExtendida,
				img: this.img,
				stock: this.stock,
				price: this.price,
				oferta: this.oferta,
				discount: this.discount,
				type: this.type,
			};
			this.id !== ""
				? this.$emit("editTheProduct", { ...newProduct, id: this.id })
				: this.$emit("newUser", newProduct);
			this.$refs.userForm.reset();
		},
	},
};
</script>

<style scoped>
.container {
	padding: 1em;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 100%;
}
form {
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 0.8em;
	padding: 1em;
}
form > div {
	display: flex;
	flex-direction: column;
}

form > div > label {
	align-self: baseline;
}

.container button {
	grid-column: 2 / auto;
}

div[role="progressbar"] {
	margin: 0 auto;
}

@media only screen and (max-width: 520px) {
	form {
		grid-template-columns: 1fr;
	}
	.container button {
		grid-column: auto;
	}
}
</style>
