<template>
	<v-container app>
		<section class="order-container">
			<v-progress-circular v-if="loading" indeterminate color="primary" />
			<div v-else>
				<NotFound
					v-if="notFound"
					text="¡Upps! Tuvimos un problema, consultá mas tarde"
				/>
				<div class="data-container" v-else>
					<div class="header-pedido">
						<h1>Pedido n# {{ id }}</h1>
						<ButtonZitto @actionToExecute="openDialog = true">
							Ver detalle
						</ButtonZitto>
					</div>
					<v-timeline>
						<v-timeline-item v-for="status in order.state" :key="status.name"
							><div>
								<h3>Pedido {{ status.name }}</h3>
								<p>{{ status.date | dateFormat }}</p>
							</div>
						</v-timeline-item>
					</v-timeline>
				</div>
			</div>
			<DialogZitto :show="openDialog">
				<CarritoTableView :data="detail" />
				<ButtonZitto @actionToExecute="openDialog = false">
					Cerrar
				</ButtonZitto>
			</DialogZitto>
		</section>
	</v-container>
</template>

<script>
import ButtonZitto from "../../components/ButtonZitto.vue";
import CarritoTableView from "../../components/Carrito/CarritoTableView.vue";
import DialogZitto from "../../components/DialogZitto.vue";
import NotFound from "../../components/NotFound.vue";
const dayjs = require("dayjs");
const axios = require("axios");

export default {
	components: { NotFound, CarritoTableView, DialogZitto, ButtonZitto },
	name: "OrderStateView",
	data: function () {
		return {
			order: [],
			loading: false,
			notFound: false,
			id: "XX",
			detail: [],
			openDialog: false,
		};
	},
	filters: {
		dateFormat(value) {
			return dayjs(value).format("DD/MM/YYYY h:mm a");
		},
	},
	mounted() {
		this.loading = true;
		axios
			.get(
				`https://61b4d9540e84b700173319bd.mockapi.io/qarocito/api/order/${this.$route.params.id}`,
			)
			.then((response) => {
				this.order = response.data;
				this.id = this.$route.params.id;
				this.detail = response.data.detail;
			})
			.catch(() => (this.notFound = true))
			.finally(() => (this.loading = false));
	},
};
</script>

<style scoped>
.data-container {
	margin: 1em;
}
.order-container {
	height: 100%;
	display: flex;
	justify-content: center;
	flex-direction: column;
	margin: 1em;
	align-items: center;
}

.data-container h1 {
	justify-self: center;
}

.v-timeline div:nth-child(even) > div > div {
	display: flex;
	align-items: end;
	flex-direction: column;
}

.header-pedido {
	display: flex;
	justify-content: space-around;
	gap: 0.5em;
}
</style>
