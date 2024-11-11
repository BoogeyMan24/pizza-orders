<svelte:head>
	<title>{order.name}'s Order Summary | Pizza Orders</title>
</svelte:head>

<script lang="ts">
	import { goto } from "$app/navigation";
	import { fade, fly } from "svelte/transition";

	let props = $props();
	let { data: { order } } = props;


	function convertNumToStringMonth(num: number) {
		switch (num) {
			case 1:
				return "January";

			case 2:
				return "February";

			case 3:
				return "March";

			case 4:
				return "April";

			case 5:
				return "May";

			case 6:
				return "June";

			case 7:
				return "July";

			case 8:
				return "August";
			
			case 9:
				return "September";

			case 10:
				return "October";

			case 11:
				return "November";

			case 12:
				return "December";
		}
	}

	let date = new Date(order.pizza_day);


	let confirmDialog: boolean = $state(false);

	function newOrder() {
		localStorage.clear();
		goto("/");
	}
</script>

{#if confirmDialog}
	<div onclick={() => confirmDialog = !confirmDialog} transition:fade class="absolute w-dvw h-dvh bg-black opacity-20 z-40"></div>
{/if}

{#if confirmDialog}
	<div class="absolute w-dvw h-dvh flex justify-center items-center">
		<div transition:fly={{ y: 100 }} class="relative w-[28rem] bg-white rounded-2xl p-6 z-50">
			<button onclick={() => confirmDialog = !confirmDialog} class="absolute top-4 right-4 scale-150">
				<i class="fa-solid fa-xmark text-gray-400 hover:text-gray-300 transition-all"></i>
			</button>
			<h1 class="text-red-500 font-bold text-2xl mb-1">Are you sure?</h1>
			<h2>This action is permanent and you will lose this order.</h2>
			<div class="mt-2 flex justify-end items-center">
				<button onclick={newOrder} class="text-white font-bold hover:bg-red-500 bg-red-400 transition-all px-6 py-1 rounded-xl">Confirm</button>
			</div>
		</div>
	</div>
{/if}

<section class="p-12 w-[95%] md:w-[40rem] mx-auto">
	<h1 class="text-4xl font-bold my-4 mt-12 monofont">{order.name}'s Order Summary</h1>


	<div class="flex justify-between my-2">
		<h3 class="monofont w-[60%]">Pizza Date: {date.getDate()} {convertNumToStringMonth(date.getMonth() + 1)}, {date.getFullYear()}</h3>
		<h3 class="monofont">{order.order_id}</h3>
	</div>

	{#each order.order as orderItem}
		<div class="py-2 flex justify-between items-center">
			<div class="flex items-center gap-6">
				<h3 class="monofont w-2">{orderItem.quantity}</h3>
				<h3 class="monofont">x</h3>
				<h3 class="monofont">{orderItem.name}</h3>
			</div>
			<div class="flex justify-between items-center w-16">
				<h3 class="monofont">€</h3>
				<h3 class="monofont">{(orderItem.cost * orderItem.quantity).toFixed(2)}</h3>
			</div>
		</div>
	{/each}

	<!-- <div class="py-2 flex justify-between items-center">
		<div class="flex items-center gap-6">
			<h3 class="w-24">Petr's Tax</h3>

		</div>
		<div class="flex justify-between items-center w-16">
			<h3>€</h3>
			<h3 class="">100.00</h3>
		</div>
		
	</div> -->

	<div class="mt-4 h-[2px] w-full mx-auto bg-black rounded-full"></div>
	<div>
		<h3 class="mt-2 text-end text-2xl monofont">€ {order.total.toFixed(2)}</h3>
	</div>

	{#if !order.paid}
		<div class="h-24 flex justify-center items-center">
			<button onclick={() => confirmDialog = true} class="text-white font-bold hover:bg-red-500 bg-red-400 transition-all px-6 py-2 rounded-xl">Change Order</button>
		</div>
	{/if}

	{#if order.paid}
		<div class="mt-8">
			<h1 class="text-center text-2xl font-bold text-green-500">You're all set!</h1>
			<h1 class="text-center font-medium">Don't forget to pick up your order.</h1>
		</div>
	{:else}
		<div class="mt-8">
			<h1 class="text-center text-xl font-bold text-red-500">This order has not been paid yet!</h1>
			<h1 class="text-center font-medium">Please make sure to pay at the pizza order stand.</h1>
		</div>
	{/if}
</section>



<style lang="postcss">
	.monofont {
		font-family: monospace;
	}
</style>