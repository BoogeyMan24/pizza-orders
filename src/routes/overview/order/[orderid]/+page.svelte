<svelte:head>
	<title>{order.name}'s Order Summary | Pizza Orders</title>
</svelte:head>

<script lang="ts">
	import { page } from "$app/stores";
	import { onMount } from "svelte";
	import toast from "svelte-hot-french-toast";

	let props = $props();
	let { data: { order, supabase } } = props;

	let path = $page.url.pathname;


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

	let loading: boolean = $state(false);

	async function markAsPaid(event: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement; }) {
		loading = true;

		let res = await supabase
			.from("orders")
			.update({ paid: true })
			.eq("order_id", order.order_id);

		if (res.error != null) {
			toast.error("Failed to update!");
			console.log("Couldn't update");
		} else {
			order.paid = true;
		}
		

		loading = false;
	}
</script>

<a href={"/overview/" + date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()} class="absolute w-32 top-20 left-0 m-2 px-4 gap-4 py-1 bg-gray-200 hover:opacity-80 rounded-xl flex items-center">
	<i class="fa-solid fa-arrow-left-long"></i> Back
</a>

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

	<!-- {#if !order.paid}
		<div class="h-24 flex justify-center items-center">
			<button onclick={() => confirmDialog = true} class="text-white font-bold hover:bg-red-500 bg-red-400 transition-all px-6 py-2 rounded-xl">Change Order</button>
		</div>
	{/if} -->

	{#if loading}
		<i class="fa-solid fa-spinner animate-spin"></i>
	{:else}
		<h1 class={"font-bold " + (order.paid ? "text-green-400" : "text-red-500")}>{order.paid ? "Paid" : "Not Paid"}</h1>
	{/if}

	{#if !order.paid}
		<div class="flex justify-center items-center gap-12 mt-12">
			<button class:disabled={loading} onclick={markAsPaid} class="px-8 py-2 bg-green-400 rounded-xl text-white font-bold shadow-lg">Mark as Paid</button>
		</div>
	{/if}

	<!-- {#if order.paid}
		<div class="mt-8">
			<h1 class="text-center text-2xl font-bold text-green-500">You're all set!</h1>
			<h1 class="text-center font-medium">Don't forget to pick up your order.</h1>
		</div>
	{:else}
		<div class="mt-8">
			<h1 class="text-center text-xl font-bold text-red-500">This order has not been paid yet!</h1>
			<h1 class="text-center font-medium">Please make sure to pay at the pizza order stand.</h1>
		</div>
	{/if} -->
</section>



<style lang="postcss">
	.monofont {
		font-family: monospace;
	}
</style>