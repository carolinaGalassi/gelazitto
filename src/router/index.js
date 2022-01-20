import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store/index";

Vue.use(VueRouter);

const routes = [
	{
		path: "/login",
		name: "Login",
		component: () => import("../Views/Login.vue"),
	},
	{
		path: "/register",
		name: "Register",
		component: () => import("../Views/Register"),
	},
	{
		path: "/",
		name: "Products",
		component: () => import("../Views/UserView/UserView.vue"),
		children: [
			{
				path: "/carrito",
				name: "Carrito",
				component: () => import("../Views/Carrito/Carrito.vue"),
			},
			{
				path: "/product/:id",
				name: "Detail",
				component: () => import("../Views/Detail/Detail.vue"),
			},
			{
				path: "/",
				name: "Products",
				component: () => import("../Views/ListContainer"),
			},
			{
				path: "/buy",
				name: "Buy",
				component: () => import("../Views/Buy/Buy.vue"),
				meta: {
					requiresCarrito: true,
				},
			},
			{
				path: "/order/:id",
				name: "Order",
				component: () => import("../Views/OrderState/OrderState.vue"),
			},
		],
	},
	{
		path: "/admin",
		name: "AdminDashboard",
		component: () => import("../Views/AdminViews/AdminDashboard"),
		children: [
			{
				path: "orders",
				name: "Orders",
				component: () => import("../Views/AdminViews/Views/OrderDashboard.vue"),
			},
			{
				path: "products",
				name: "Products",
				component: () =>
					import("../Views/AdminViews/Views/ProductDashboard.vue"),
			},
		],
		meta: {
			requiresAuth: true,
		},
	},
	{ path: "/:pathMatch(.*)*", redirect: "/" },
];

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes,
});

router.beforeEach((to, from, next) => {
	if (to.matched.some((record) => record.meta.requiresAuth)) {
		if (store.getters.isAuthenticated) {
			next();
			return;
		}
		next("/login");
	} else {
		next();
	}
});

router.beforeEach((to, from, next) => {
	if (to.matched.some((record) => record.meta.requiresCarrito)) {
		if (store.getters.numberOfProducts > 0) {
			next();
			return;
		}
		next("/");
	} else {
		next();
	}
});
export default router;
