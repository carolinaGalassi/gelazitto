<template>
	<aside id="mySidenav" class="sidenav">
		<v-list>
			<v-list-item>
				<v-list-item-content>
					<v-list-item-title class="text-h6"> Hola Admin! </v-list-item-title>
					<v-list-item-subtitle
						>galassi.carolina@gmail.com</v-list-item-subtitle
					>
				</v-list-item-content>
			</v-list-item>
		</v-list>
		<v-divider></v-divider>
		<v-list>
			<v-list-item to="/admin/products">
				<v-list-item-icon>
					<v-icon>mdi-ice-cream</v-icon>
				</v-list-item-icon>
				<v-list-item-title>Productos</v-list-item-title>
			</v-list-item>
			<v-list-item link to="/admin/orders">
				<v-list-item-icon>
					<v-icon>mdi-order-bool-descending-variant</v-icon>
				</v-list-item-icon>
				<v-list-item-title>Pedidos</v-list-item-title>
			</v-list-item>
		</v-list>
	</aside>
</template>

<script>
export default {
	name: "DrawZitto",
	props: {},
};
</script>

<style scoped>
.sidenav {
	height: 100%;
	width: 50px;
	position: fixed;
	z-index: 999;
	top: 0;
	left: 0;
	background-color: #ffffff;
	overflow-x: hidden;
	padding-top: 60px;
	transition: width 1s ease-in-out;
	border-right: solid 1px #80808029;
}

.sidenav:hover {
	width: 250px;
}
</style>
