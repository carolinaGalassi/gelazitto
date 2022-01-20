<template>
	<div v-if="show" class="modal-container" role="'dialog'" tabindex="-1">
		<div class="modal-content">
			<div class="modal-content2">
				<slot></slot>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "DialogZitto",
	props: {
		show: Boolean,
	},
};
</script>

<style scoped>
.modal-container {
	position: fixed;
	top: 0;
	left: 0;
	height: 100%;
	width: 100%;
	z-index: 9999999;
	background: rgba(0, 0, 0, 0.5);
	display: flex;
	align-items: center;
	justify-content: center;
	animation: fade-in 0.5s forwards;
}

@keyframes fade-in {
	0% {
		opacity: 0;
	}
	100% {
		opacity: 1;
	}
}

.modal-content {
	background-color: #fefefe;
	margin: 15% auto;
	padding: 1em;
	border: 1px solid #888;
	display: flex;
	gap: 1em;
	align-items: center;
	flex-direction: column;
	animation: slide-in 0.5s forwards;
	border-radius: 15px;
	max-height: 35em;
}

.modal-content2 {
	display: flex;
	gap: 1em;
	align-items: center;
	flex-direction: column;
	overflow-y: auto;
	padding: 1.5em 1em;
}

@keyframes slide-in {
	100% {
		transform: translateY(10px);
	}
}
</style>
