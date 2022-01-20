<template>
	<v-container>
		<section class="order-dash-container">
			<v-progress-circular v-if="loading" indeterminate color="primary" />
			<article v-else v-for="order in orders" :key="order.id">
				<v-form
					ref="form"
					v-on:submit.prevent="next(order)"
					:data-key="order.id"
				>
					<h2>NRO DE PEDIDO: {{ order.id }}</h2>
					<div class="state-container">
						<h5>{{ getNameState(order.state) }}</h5>
						<ButtonZitto
							type="submit"
							:disabled="
								getNameState(order.state) === 'Retirado' ||
								getNameState(order.state) === 'Enviado'
							"
						>
							<v-tooltip bottom>
								<template v-slot:activator="{ on, attrs }">
									<v-icon v-bind="attrs" v-on="on">mdi-arrow-up</v-icon>
								</template>
								<span>Actualizar estado</span>
							</v-tooltip>
						</ButtonZitto>
					</div>
					<v-text-field
						v-if="
							getNameState(order.state) === 'Confirmado' &&
							order.modoDeEnvio === 'Envio'
						"
						v-model="order.idSeguimiento"
						:rules="rulesSeguimiento"
						label="Código de seguimiento"
						required
					></v-text-field>
					<p>{{ getDateState(order.state) }}</p>
					<p v-if="getNameState(order.state) === 'Enviado'">
						Numero de seguimiento: <span>{{ order.idSeguimiento }}</span>
					</p>
				</v-form>
				<ButtonZitto @actionToExecute="openDetails(order)">
					Ver detalle
				</ButtonZitto>
			</article>
		</section>
		<DialogZitto :show="openDialog">
			<CarritoTableView :data="orderDetail" />
			<ButtonZitto
				@actionToExecute="
					openDialog = false;
					orderDetail = false;
				"
			>
				Cerrar
			</ButtonZitto>
		</DialogZitto>
	</v-container>
</template>

<script>
import ButtonZitto from "../../../components/ButtonZitto.vue";
import CarritoTableView from "../../../components/Carrito/CarritoTableView.vue";
import DialogZitto from "../../../components/DialogZitto.vue";
const axios = require("axios");
const dayjs = require("dayjs");

export default {
	components: { ButtonZitto, DialogZitto, CarritoTableView },
	name: "OrderDashboardView",
	data: function () {
		return {
			openDialog: false,
			orderDetail: undefined,
			orders: [],
			rulesSeguimiento: [(v) => !!v || "Id seguimiento requerido"],
			loading: false,
		};
	},
	methods: {
		openDetails(order) {
			this.openDialog = true;
			this.orderDetail = order.detail;
		},
		stateIsCreated(state) {
			return this.getNameState(state) === "Creado";
		},
		sendMessage(order) {
			return this.stateIsCreated(order.state)
				? `Hola! Tu pedido nro ${order.id} ha sido confirmado. Si elegiste retirarlo en la oficina, se te avisara cuando esta disponible. Pero si por el contrario, decidiste recibirlo via envio, se te notificara cuando esta en manos del correo y te adjuntaremos el codigo de seguimiento correspondiente`
				: order.modoDeEnvio === "Retiro"
				? "Hola! Ya retiraste tu pedido, ¡Que lo disfrutes!"
				: "Hola! Tu pedido nro ${order.id} ha sido enviado. Y su numero de seguimiento es ${order.idSeguimiento}";
		},
		getState(order) {
			if (this.stateIsCreated(order.state)) return "Confirmado";
			return order.modoDeEnvio === "Retiro" ? "Retirado" : "Enviado";
		},
		next(order) {
			const formReference = this.$refs["form"].find(
				(el) => el.$attrs["data-key"] === order.id,
			);
			if (!formReference.validate()) return;
			this.loading = true;
			const newState = { name: this.getState(order), date: dayjs() };
			axios
				.put(
					`https://61b4d9540e84b700173319bd.mockapi.io/qarocito/api/order/${order.id}`,
					{
						...order,
						state: [...order.state, newState],
					},
				)
				.then(() => {
					this.getOrders();
					this.$store.dispatch("openSnack", {
						title: "Estado actualizado",
					});

					// axios.post("https://api.emailjs.com/api/v1.0/email/send", {
					// 	service_id: "service_zzc8nol",
					// 	template_id: "template_lmwer5c",
					// 	user_id: "user_KmWcnJHeavijxySiXPABM",
					// 	template_params: {
					// 		email: "galassi.carolina@gmail.com",
					// 		message: this.sendMessage(order),
					// 	},
					// });
				})
				.then(() => (this.loading = false));
		},
		getNameState(states) {
			return states[states.length - 1].name;
		},
		getDateState(states) {
			return dayjs(states[states.length - 1].date).format("DD/MM/YYYY h:mm a");
		},
		getOrders() {
			this.loading = true;
			axios
				.get("https://61b4d9540e84b700173319bd.mockapi.io/qarocito/api/order")
				.then((response) => (this.orders = response.data))
				.finally(() => (this.loading = false));
		},
		disabledButton(order) {
			return order.state.length == 3;
		},
	},
	mounted() {
		this.getOrders();
	},
};
</script>

<style scoped>
.order-dash-container {
	height: 100%;
	display: grid;
	gap: 1.5em;
	grid-template-columns: repeat(auto-fill, minmax(15em, 1fr));
}

.order-dash-container > article {
	padding: 1.2em;
	background-color: #8080800d;
	border-radius: 10%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}

.state-container {
	display: flex;
	align-items: center;
}

.state-container i {
	font-size: 0.9em;
}

.state-container button {
	background-color: transparent !important;
	border: none !important;
	margin-bottom: 0.4em;
}

.state-container button:hover i {
	color: #6f73a7 !important;
}

span {
	margin-left: 0.2em;
	font-style: italic;
}
</style>
