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

	let ordersAll: Order[] = $state([]);
	let ordersDisplayed: Order[] = $state([]);

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
			ordersAll = orderRes.data;
			ordersDisplayed = ordersAll;

			loading = false;
		}
	});

	let input = $state("");


	// $effect(() => {
	// 	ordersDisplayed = ordersAll.filter((item) => item.order_id.includes(input.toLowerCase()));
	// });
</script>


<div class="mt-16 pl-24">
	<div class="w-auto">
		<div class="relative gap-6 items-center before:absolute before:bottom-0 before:h-1 before:w-full before:scale-x-105 before:bg-primary inline-flex">
			<h1 class="text-3xl font-bold mb-2">{date.getDate() + " " + convertNumToStringMonth(date.getMonth() + 1) + ", " + date.getFullYear()}</h1>
			<a href={$page.url.pathname + "/summary"} class="text-xl font-semibold">Summary ></a>
		</div>
	</div>
</div>


{#if loading}
	<div class="h-[20rem] w-full flex justify-center items-center">
		<div class="scale-[200%]">
			<i class="fa-solid fa-spinner animate-spin"></i>
		</div>
	</div>
{:else}
	<div class="mx-24 mt-8 w-96 flex rounded-2xl border-4 border-gray-300 has-[:focus]:border-primary has-[:focus]:border-opacity-60 transition-all">
		<input bind:value={input} type="text" placeholder="Search orders..." class="py-2 px-4 text-lg rounded-l-2xl outline-none w-full">
		<!-- svelte-ignore a11y_consider_explicit_label -->
		<button onclick={() => input = ""}  class="rounded-r-2xl size-12 hover:bg-gray-100">
			<i class="fa-solid fa-xmark scale-110"></i>
		</button>
	</div>
	{#if ordersDisplayed.length == 0}
		<div class="h-[20rem] w-full flex justify-center items-center">
			<h1 class="text-red-500 font-bold text-xl">No orders found!</h1>
		</div>
	{:else}
		<div class="grid grid-cols-3 w-full px-24 mt-8 gap-12">
			{#each ordersDisplayed as order, index}
				<div class={order.order_id.includes(input.toLowerCase()) ? "block" : "hidden"}>
					<OrderCard {...order} {supabase} {index} />
				</div>
			{/each}
		</div>
	{/if}
{/if}
