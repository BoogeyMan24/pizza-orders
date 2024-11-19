<script lang="ts">
	import { onMount } from "svelte";

	let { name, grade, order, order_id, total, index, supabase } = $props();
	// get length and chec for it


	let paid: boolean | null = $state(null);

	onMount(async () => {
		let res = await supabase
			.from("paid_orders")
			.select("*")
			.eq("order_id", order_id)
			.single();

		if (res.error == null) {
			paid = res.data.paid;
		}
	});
</script>

<a href={"/overview/order/" + order_id} class={"px-6 py-4 rounded-xl shadow-xl flex items-center gap-4 border"}>
	<div class="w-full flex justify-between items-center">
		<div class="">
			<div class="flex gap-2 items-center">
				<h1 class="text-2xl font-semibold">{name}</h1>
				-
				<h3 class="text-base font-medium opacity-70">Grade {grade}</h3>
			</div>
			
			<h1>{order_id}</h1>
		</div>
		
		{#if paid == null}
			<i class="fa-solid fa-spinner animate-spin"></i>
		{:else}
			<h1 class={"font-bold " + (paid ? "text-green-400" : "text-red-500")}>{paid ? "Paid" : "Not Paid"}</h1>
		{/if}
	</div>
</a>
