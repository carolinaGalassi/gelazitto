<template>
	<section class="login-container">
		<div class="login-form">
			<v-form ref="form" v-on:submit.prevent="login()">
				<v-text-field
					v-model="mail"
					:rules="mailRules"
					label="Mail"
					required
				></v-text-field>

				<v-text-field
					v-model="contra"
					:rules="contraRules"
					label="Contraseña"
					required
					type="password"
				></v-text-field>

				<ButtonZitto type="Submit">Entrar! </ButtonZitto>
			</v-form>
		</div>
	</section>
</template>

<script>
import ButtonZitto from "../components/ButtonZitto.vue";
export default {
	components: { ButtonZitto },
	name: "LoginView",
	data: function () {
		return {
			users: [],
			mail: "",
			contra: "",
			mailRules: [
				(v) => !!v || "Mail requerido",
				(v) => /\S+@\S+\.\S+/.test(v) || "Mail inválido",
			],
			contraRules: [
				(v) =>
					/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/.test(v) ||
					"La contraseña debe tener minimo seis caracteres, contener minusculas, mayusculas y numeros",
			],
		};
	},
	methods: {
		login() {
			if (!this.$refs.form.validate()) return;
			this.$store
				.dispatch("authentication", {
					mail: this.mail,
					password: this.contra,
				})
				.then(() => {
					this.$router.push("/admin");
				})
				.catch(() =>
					this.$store.dispatch("openSnack", {
						title: "Usuario o contraseña incorrectos",
					}),
				);
		},
	},
	beforeCreate() {
		if (this.$store.getters.isAuthenticated) {
			this.$router.push("/admin");
		}
	},
};
</script>

<style scoped>
.login-container {
	height: 100%;
	display: flex;
	justify-content: center;
	flex-direction: column;
	align-items: center;
	background-color: #8bc6ec;
	background-image: linear-gradient(135deg, #8bc6ec 0%, #9599e2 100%);
}

.login-form {
	display: flex;
	flex-direction: column;
	box-shadow: rgb(0 0 0 / 24%) 0px 3px 8px;
	padding: 1.5em;
	border-radius: 20px;
	gap: 0.5em;
	background-color: white;
}
.login-form form {
	display: flex;
	flex-direction: column;
}

.login-form button {
	border-radius: 10px;
	padding: 0.3em 0.8em 0.3em 0.8em;
	align-self: flex-end;
	color: #949ae2;
	border-color: #9599e2;
	align-self: flex-end;
	font-family: "Zilla Slab", serif;
	text-transform: capitalize;
}

.login-form button:hover {
	color: white;
	background-color: #949ae2;
	border-color: #9599e2;
}

.login-form + a {
	color: white;
	margin-top: 1em;
	font-family: "Zilla Slab", serif;
}
</style>
