<template>
	<div class="userview-container">
		<Navbar imgRoute="/">
			<router-link to="/carrito">
				<v-badge overlap color="secondary">
					<span slot="badge">
						{{ $store.getters.numberOfProducts }}
					</span>
					<IceCream :size="32" class="navbar-icon"
				/></v-badge>
			</router-link>
		</Navbar>
		<v-main>
			<router-view></router-view>
		</v-main>
		<FooterComponent />
	</div>
</template>

<script>
import IceCream from "vue-material-design-icons/IceCream.vue";
import FooterComponent from "./components/Footer.vue";
import img from "../../assets/gelazito.png";
import { isInLs, get } from "../../utils/localStorageFunctions";
import Navbar from "../../components/navbar.vue";

export default {
	name: "ListContainerComponent",
	data: function () {
		return {
			img: img,
		};
	},
	components: {
		IceCream,
		FooterComponent,
		Navbar,
	},
	mounted() {
		const carritoVacio = this.$store.getters.numberOfProducts === 0;
		if (isInLs("carrito") && carritoVacio) {
			this.$store.dispatch("fillCarrito", get("carrito"));
		}
	},
};
</script>

<style scoped>
.img-sb {
	width: 15em;
	max-width: 100%;
	border-radius: 22px;
}

.v-main {
	width: 100%;
	height: 100%;
}

.navbar-icon {
	color: white;
}

.img-logo {
	width: 8em;
}

.userview-container {
	height: 100vh;
}

/* FOOTER */
.v-footer {
	font-family: "Zilla Slab", ser;
	display: flex;
	justify-content: center;
}
</style>
