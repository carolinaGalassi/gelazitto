<template>
	<section class="buy-container">
		<v-progress-circular v-if="loading" indeterminate color="primary" />
		<v-form v-else ref="form" v-on:submit.prevent>
			<v-text-field
				v-model="mail"
				:rules="mailRules"
				label="Mail"
				required
			></v-text-field>
			<div>
				<h3>Forma de pago</h3>
				<v-radio-group v-model="modoDePago">
					<v-radio
						v-for="modoPago in ['Efectivo', 'Transferencia']"
						:key="modoPago"
						:label="modoPago"
						:value="modoPago"
					></v-radio>
				</v-radio-group>
			</div>
			<div>
				<h3>Forma de Envio</h3>
				<v-radio-group v-model="modoDeEnvio">
					<v-radio
						v-for="modoEnvio in ['Retiro', 'Envio']"
						:key="modoEnvio"
						:label="modoEnvio"
						:value="modoEnvio"
					></v-radio>
				</v-radio-group>
			</div>
			<ButtonZitto @actionToExecute="createOrder">Comprar</ButtonZitto>
		</v-form>
		<DialogZitto :show="dialog.show">
			<div>
				<h3 id="dialogTitle">¡Tu pedido esta creado!</h3>
				<h6 id="dialogDesc">ORDEN NRO {{ dialog.text }}</h6>
			</div>
			<LinkZitto text="listo!" :route="'/'" type="button" />
		</DialogZitto>
	</section>
</template>

<script>
import ButtonZitto from "../../components/ButtonZitto.vue";
import LinkZitto from "../../components/LinkZitto.vue";
import DialogZitto from "../../components/DialogZitto.vue";
const dayjs = require("dayjs");
const axios = require("axios");

export default {
	name: "CarritoComponent",
	data: function () {
		return {
			modoDePago: "Efectivo",
			modoDeEnvio: "Retiro",
			mail: "",
			loading: false,
			dialog: {
				show: false,
				text: "",
			},
			mailRules: [
				(v) => !!v || "Mail requerido",
				(v) => /\S+@\S+\.\S+/.test(v) || "Mail inválido",
			],
		};
	},
	components: { ButtonZitto, LinkZitto, DialogZitto },
	methods: {
		emptyCarrito() {
			this.$store.dispatch("emptyCarrito");
		},
		createOrder() {
			if (!this.$refs.form.validate()) return;
			this.loading = true;
			axios
				.post(
					"https://61b4d9540e84b700173319bd.mockapi.io/qarocito/api/order",
					{
						detail: this.$store.getters.getCarrito,
						monto: this.totalAmount(),
						mail: this.mail.toLowerCase(),
						modoDePago: this.modoDePago,
						modoDeEnvio: this.modoDeEnvio,
						state: [{ name: "Creado", date: dayjs() }],
					},
				)
				.then((response) => {
					this.emptyCarrito();
					axios.post("https://api.emailjs.com/api/v1.0/email/send", {
						service_id: "service_zzc8nol",
						template_id: "template_lmwer5c",
						user_id: "user_KmWcnJHeavijxySiXPABM",
						template_params: {
							email: this.mail.toLowerCase(),
							message: `Hola! Gracias por elegir Gelazito. Tu orden es la número ${response.data.id}.
							Y podes seguir su estado en https://gelazitto.vercel.app/order/${response.data.id} .
							En los proximos mails, te vamos a estar confirmando cuando esta listo para retirar o si ya fue enviado`,
						},
					});
					this.dialog = { show: true, text: response.data.id };
				})
				.finally(() => (this.loading = false));
		},
		totalAmount: function () {
			return this.$store.getters.getCarrito.reduce(
				(previousValue, currentValue) =>
					previousValue + currentValue.quantity * currentValue.price,
				0,
			);
		},
	},
	mounted() {
		this.$store.getters.numberOfProducts === 0 && this.$router.push("/");
	},
};
</script>

<style scoped>
.buy-container {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;
}

.modal-content > div {
	text-align: center;
}

h3 {
	font-family: "Zilla Slab";
	font-weight: 400;
	font-size: 2em;
}

h6 {
	font-weight: 300;
	font-size: 1.2em;
}
</style>
