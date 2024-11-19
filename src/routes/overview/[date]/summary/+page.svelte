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

	let orders: Order[] = $state([]);
	onMount(async () => {
		let orderRes = await supabase
			.from("orders")
			.select("*")
			.eq("pizza_day", $page.params.date);


		if (orderRes.error != null) {
			toast.error("Something went wrong!");
			console.log("failed to get orders");
			return;
		} else {
			orders = orderRes.data;

			loading = false;
		}
	});
</script>



<div class="mt-16 pl-24">
	<h1 class="text-3xl font-bold mb-2">Summary - {date.getDate() + " " + convertNumToStringMonth(date.getMonth() + 1) + ", " + date.getFullYear()}</h1>
	<div class="-ml-2 h-1 w-[31rem] bg-primary"></div>
</div>

<div>Still WIP!</div>


<!-- {#if loading}
	<div class="h-[20rem] w-full flex justify-center items-center">
		<div class="scale-[200%]">
			<i class="fa-solid fa-spinner animate-spin"></i>
		</div>
	</div>
{:else}
	
	{#if orders.length == 0}
		<div class="h-[20rem] w-full flex justify-center items-center">
			<h1 class="text-red-500 font-bold text-xl">No orders found!</h1>
		</div>
	{:else}
		<div class="grid grid-cols-3 w-full px-24 mt-8 gap-12">
			{#each orders as order, index}
				<OrderCard {...order} {supabase} {index} />
			{/each}
		</div>
	{/if}
{/if} -->
