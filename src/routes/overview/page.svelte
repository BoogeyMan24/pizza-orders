<script lang="ts">
	import { onMount } from "svelte";

	let { data: { supabase } } = $props();

	type PizzaOrderCard = {
		date: Date
		count: number
	}

	let pizzaOrderCards = [];

	let loading = true;
	onMount(async () => {
		let pizzaOrderCardsRes = await supabase
			.from("pizza_days")
			.
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
	<div class="grid grid-cols-3 w-full">

	</div>
{/if}
