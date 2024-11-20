<svelte:head>
	<title>Dashboard | Lunch Orders</title>
</svelte:head>

<script lang="ts">
	import LunchOrderCard from "$components/LunchOrderCard.svelte";
	import { onMount } from "svelte";
	import toast from "svelte-hot-french-toast";

	let { data } = $props();
	let { supabase } = data;

	type LunchOrderCardType = {
		date: Date
		count: number
	}

	let lunchOrderCards: LunchOrderCardType[] = $state([]);
	let lunchOrderCardsPast: LunchOrderCardType[] = $state([]);

	let loading = $state(true);
	onMount(async () => {
		let lunchOrderCardsRes = await supabase
			.from("pizza_days")
			.select("*")
	
		if (lunchOrderCardsRes.error != null) {
			toast.error("Something went wrong!");
			console.log("Couldn't get lunch days.");
		} else {
			lunchOrderCards = lunchOrderCardsRes.data;

			lunchOrderCards.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

			for (let date of lunchOrderCards) {
				if (new Date(date.date).getTime() - Date.now() < 0) {
					lunchOrderCardsPast.push(lunchOrderCards.shift() as LunchOrderCardType);
					console.log(lunchOrderCards);
				}
			}

			lunchOrderCards = lunchOrderCards;
			lunchOrderCardsPast = lunchOrderCardsPast;

			loading = false;
		}
	});
</script>


<div class="mt-16 pl-24">
	<div class="relative before:absolute before:bottom-0 before:h-1 before:w-full before:scale-x-105 before:bg-primary inline-flex">
		<h1 class="text-3xl font-bold mb-2">Dashboard</h1>
	</div>
</div>


{#if loading}
	<div class="h-[20rem] w-full flex justify-center items-center">
		<div class="scale-[200%]">
			<i class="fa-solid fa-spinner animate-spin"></i>
		</div>
	</div>
{:else}
	<div class="mt-16 pl-24 -mb-4">
		<h1 class="text-xl font-bold">Upcoming</h1>
	</div>
	<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full px-24 mt-8 gap-6">
		{#each lunchOrderCards as lunchOrderCard}
			<LunchOrderCard {...lunchOrderCard} />
		{/each}
	</div>

	<div class="mt-16 pl-24 -mb-4">
		<h1 class="text-xl font-bold">Past</h1>
	</div>
	<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full px-24 mt-8 gap-6">
		{#each lunchOrderCardsPast as lunchOrderCard}
			<LunchOrderCard {...lunchOrderCard} />
		{/each}
	</div>
{/if}