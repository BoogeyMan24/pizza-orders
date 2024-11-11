<script lang="ts">
	import PizzaOrderCard from "$components/PizzaOrderCard.svelte";
	import { onMount } from "svelte";
	import toast from "svelte-hot-french-toast";

	let { data } = $props();
	let { supabase } = data;

	type PizzaOrderCardType = {
		date: Date
		count: number
	}

	let pizzaOrderCards: PizzaOrderCardType[] = $state([]);
	let pizzaOrderCardsPast: PizzaOrderCardType[] = $state([]);

	let loading = $state(true);
	onMount(async () => {
		let pizzaOrderCardsRes = await supabase
			.from("pizza_days")
			.select("*")
	
		if (pizzaOrderCardsRes.error != null) {
			toast.error("Something went wrong!");
			console.log("Couldn't get pizza days.");
		} else {
			pizzaOrderCards = pizzaOrderCardsRes.data;

			pizzaOrderCards.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

			for (let date of pizzaOrderCards) {
				if (new Date(date.date).getTime() - Date.now() < 0) {
					pizzaOrderCardsPast.push(pizzaOrderCards.shift() as PizzaOrderCardType);
					console.log(pizzaOrderCards);
				}
			}

			pizzaOrderCards = pizzaOrderCards;
			pizzaOrderCardsPast = pizzaOrderCardsPast;

			loading = false;
		}
	});
</script>


<div class="mt-16 pl-24">
	<h1 class="text-3xl font-bold mb-2">Dashboard</h1>
	<div class="-ml-2 h-1 w-48 bg-primary"></div>
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
		{#each pizzaOrderCards as pizzaOrderCard}
			<PizzaOrderCard {...pizzaOrderCard} />
		{/each}
	</div>

	<div class="mt-16 pl-24 -mb-4">
		<h1 class="text-xl font-bold">Past</h1>
	</div>
	<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full px-24 mt-8 gap-6">
		{#each pizzaOrderCardsPast as pizzaOrderCard}
			<PizzaOrderCard {...pizzaOrderCard} />
		{/each}
	</div>
{/if}