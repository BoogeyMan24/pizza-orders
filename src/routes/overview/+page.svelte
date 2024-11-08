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
				if (new Date(date.date).getTime() - Date.now() > 0) {
					pizzaOrderCards.push(pizzaOrderCards.shift());
				}
			}

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
	<div class="grid grid-cols-3 w-full px-24 mt-8 gap-12">
		{#each pizzaOrderCards as pizzaOrderCard}
			<PizzaOrderCard {...pizzaOrderCard} />
		{/each}
	</div>
{/if}
