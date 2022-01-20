<template>
	<div class="register-container">
		<form v-on:submit.prevent="register" class="register-form">
			<label for="mail">Mail</label>
			<input type="text" id="mail" v-model="mail" class="form-control" />
			<label for="contra">Contraseña</label>
			<input
				type="password"
				id="contra"
				v-model="contra"
				class="form-control"
			/>
			<label for="rol">Elegir un rol:</label>
			<select id="rol" v-model="rol" class="custom-select">
				<option value="admin">Admin</option>
				<option value="user">Usuario</option>
			</select>
			<button type="submit" class="btn btn-outline-primary btn-custom">
				Registar
			</button>
		</form>
		<ul v-if="errors.length">
			<li v-for="(error, i) in errors" :key="i">{{ error }}</li>
		</ul>
	</div>
</template>

<script>
const axios = require("axios");
export default {
	name: "LoginComponent",
	data: function () {
		return {
			mail: "",
			contra: "",
			errors: [],
			rol: "",
		};
	},
	methods: {
		register() {
			this.errors = [];
			const mayusMinusNumbersAnd6CharactersReg =
				/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;
			if (!mayusMinusNumbersAnd6CharactersReg.test(this.contra)) {
				this.errors.push(
					"La contraseña debe tener minimo seis caracteres, contener minusculas, mayusculas y numeros",
				);
				return;
			}

			const emailRe = /\S+@\S+\.\S+/; //eslint-disable-line

			if (!emailRe.test(this.mail)) {
				this.errors.push("El email no cumple con el formato requerido");
				return;
			}
			axios
				.post(
					"https://61b4d9540e84b700173319bd.mockapi.io/qarocito/api/users",
					{ email: this.mail, password: this.contra, rol: this.rol },
				)
				.then(() => this.$router.push("/"));
		},
	},
};
</script>

<style scoped>
.register-container {
	height: 100%;
	display: flex;
	justify-content: center;
	flex-direction: column;
	align-items: center;
	background-color: #8bc6ec;
	background-image: linear-gradient(135deg, #8bc6ec 0%, #9599e2 100%);
}
.register-form {
	display: flex;
	flex-direction: column;
	gap: 0.5em;
	box-shadow: rgb(0 0 0 / 24%) 0px 3px 8px;
	padding: 1.5em;
	border-radius: 20px;
	background-color: white;
}

.register-form > button {
	border-radius: 10px;
	padding: 0.3em 0.8em 0.3em 0.8em;
	align-self: flex-end;
}

label {
	align-self: baseline;
}

.custom-select {
	display: block;
	width: 100%;
	padding: 0.575rem 0.75rem;
	font-size: 1rem;
	font-weight: 400;
	line-height: 1.5;
	color: #212529;
	background-color: #fff;
	background-clip: padding-box;
	border: 1px solid #ced4da;
	border-radius: 0.25rem;
	transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}
.btn-custom {
	color: #949ae2;
	border-color: #9599e2;
}
.btn-custom:hover {
	color: white;
	background-color: #949ae2;
	border-color: #9599e2;
}
</style>
