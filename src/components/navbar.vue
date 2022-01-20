<template>
	<v-app-bar app class="navbar-container">
		<div>
			<router-link :to="imgRoute"
				><img :src="img" :alt="'Logo de la casa de helados'" class="img-logo" />
			</router-link>
			<slot></slot>
		</div>
	</v-app-bar>
</template>

<script>
import img from "../assets/gelazito.png";

export default {
	name: "navbarComponent",
	props: {
		imgRoute: String,
	},
	data: function () {
		return {
			img: img,
		};
	},
};
</script>

<style scoped>
.navbar-container {
	background-color: #8bc6ec;
	background-image: linear-gradient(135deg, #8bc6ec 0%, #9599e2 100%);
}

.navbar-container > div > div {
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.navbar-icon {
	color: white;
}

.img-logo {
	width: 8em;
}
</style>
