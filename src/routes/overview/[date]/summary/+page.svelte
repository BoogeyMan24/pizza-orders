<svelte:head>
	<title>Orders on {date.getDate() + " " + convertNumToStringMonth(date.getMonth() + 1) + ", " + date.getFullYear()} | Lunch Orders</title>
</svelte:head>

<script lang="ts">
	import { page } from "$app/stores";
	import OrderCard from "$components/OrderCard.svelte";
	import { onMount } from "svelte";
	import toast from "svelte-hot-french-toast";

	type Order = {
		name: string,
		grade: string,
		order: string,
		order_id: string,
		total: number,
		paid: boolean,
	}

	let { data } = $props();
	let { supabase } = data;

	let date = new Date($page.params.date);

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


	let loading = $state(true);

	let orderTotals: any = $state({});
	let total = $state(0);
	onMount(async () => {
		let orderRes = await supabase
			.from("paid_orders")
			.select("*, order_id(*)")
			.eq("order_id.pizza_day", $page.params.date)
			.eq("paid", true);

		if (orderRes.error != null) {
			toast.error("Something went wrong!");
			console.log("failed to get orders");
			return;
		} else {

			for (let i = 0; i < orderRes.data.length; i++) {
				let order = orderRes.data[i].order_id;
				
				for (let orderItem of order.order) {
					orderTotals[orderItem.id] = (orderTotals[orderItem.id] ?? 0) + orderItem.quantity;
					total += orderItem.cost * orderItem.quantity;
				}
			}

			orderTotals = orderTotals;
			console.log(Object.keys(orderTotals));

			loading = false;
		}
	});
</script>



<div class="mt-16 pl-6 sm:pl-24">
	<div class="relative before:absolute before:bottom-0 before:h-1 before:w-full before:scale-x-105 before:bg-primary inline-flex">
		<h1 class="text-3xl font-bold mb-2">Summary - {date.getDate() + " " + convertNumToStringMonth(date.getMonth() + 1) + ", " + date.getFullYear()}</h1>
	</div>
</div>


{#if loading}
	<div class="h-[20rem] w-full flex justify-center items-center">
		<div class="scale-[200%]">
			<i class="fa-solid fa-spinner animate-spin"></i>
		</div>
	</div>
{:else}
	
	{#if Object.keys(orderTotals).length == 0}
		<div class="h-[20rem] w-full flex justify-center items-center">
			<h1 class="text-red-500 font-bold text-xl">No orders found!</h1>
		</div>
	{:else}
		<div class=" w-full px-6 sm:px-24 mt-8 gap-6">
			{#each Object.keys(orderTotals) as order}
				<div class="flex gap-4">
					<h1 class="w-6 text-center">{orderTotals[order]}</h1> x
					<h1>{order}</h1>
				</div>
			{/each}
			<h1 class="text-xl font-bold mt-4">Total: € {total.toFixed(2)}</h1>
		</div>
	{/if}
{/if}
