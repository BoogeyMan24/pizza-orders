<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import toast from 'svelte-hot-french-toast';

	
	let { data } = $props();
	let { supabase } = data;

	onMount(() => {

	})

	let input = $state("");
	let error = $state("");

	let loading = $state(false);

	async function searchForOrder(event: SubmitEvent & { currentTarget: EventTarget & HTMLFormElement; }) {
		console.log("test");
		event.preventDefault();

		if (/^[a-z]{1,12}[0-9]{4}$/.test(input)) {
			error = "";
			loading = true;

			let res = await supabase
				.from("orders")
				.select("*")
				.eq("order_id", input.toLowerCase())
				.single();
		
			if (!res.error) {
				toast.success("Order found!");
				await goto("order/" + input.toLowerCase());
			} else {
				toast.error("No order found!");
			}
			loading = false;
		} else {
			error = "That is not a valid order ID.";
		}
	}
</script>

<div class="flex justify-center items-center mt-[14rem] w-dvw flex-col">
	<h1 class="relative text-center font-extrabold text-4xl md:text-5xl mt-8 tracking-wide">Find your Order!</h1>
	<div class="w-[100%] flex justify-center mt-4 mb-14">
		<div class="h-1 w-[70%] sm:w-80 bg-primary rounded-full"></div>
	</div>
	<form onsubmit={searchForOrder} class="w-[90%] sm:w-[30rem] mb-4">
		<div class="flex rounded-2xl border-4 border-gray-300 has-[:focus]:border-primary has-[:focus]:border-opacity-60 transition-all w-full">
			<input disabled={loading} bind:value={input} type="text" placeholder="Order ID..." class="py-2 px-4 text-lg rounded-l-2xl outline-none w-full">
			<!-- svelte-ignore a11y_consider_explicit_label -->
			<button disabled={loading} type="submit" class="rounded-r-2xl size-12 hover:bg-gray-100">
				{#if loading}
					<div class="flex justify-center items-center scale-125">
						<i class="fa-solid fa-spinner animate-spin"></i>
					</div>
				{:else}
					<i class="fa-solid fa-magnifying-glass scale-110"></i>
				{/if}
			</button>
		</div>
	</form>
	{#if error} 
		<p class="font-medium text-lg text-red-500">{error}</p>
	{/if}
</div>
