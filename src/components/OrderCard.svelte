<script lang="ts">
	let { name, grade, order, order_id, total, paid, index } = $props();
	// get length and chec for it
</script>

<a href={"/overview/order/" + order_id} class={"px-6 py-4 rounded-xl shadow-xl flex items-center gap-4 " + (index == 0 ? "border-t" : "")}>
	<div class="w-full flex justify-between items-center">
		<div class="">
			<h1 class="text-2xl font-semibold">{name}</h1>
			<h1>{order_id}</h1>
		</div>
		

		<h1 class={"font-bold " + (paid ? "text-green-400" : "text-red-500")}>{paid ? "Paid" : "Not Paid"}</h1>
	</div>
</a>
