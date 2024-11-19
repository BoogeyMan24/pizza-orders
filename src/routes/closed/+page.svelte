<script lang="ts">
	import { goto } from "$app/navigation";
	import { onMount } from "svelte";

	let { data } = $props();
	let { supabase } = data;

	let upcoming: Date | null = null;
	let sellingWindow: { start: Date | null, end: Date | null } = $state({ start: null, end: null });
	onMount(async () => {
		

		const res = await supabase
			.from ("pizza_days")
			.select("*")
			.gt("date", new Date(Date.now()).toISOString())
			.order("date", { ascending: true });


		if (res.error == null) {
			upcoming = new Date(res.data[0].date);
			upcoming.setHours(14, 0, 0);
		} else {
			console.error("couldn't get lunch days 1");
			return;
		}

		console.log(upcoming);

		sellingWindow = {
			start: new Date(upcoming.getTime() - 3 * 24 * 60 * 60 * 1000),
			end: upcoming
		}

		sellingWindow.start?.setHours(0, 0, 0, 0);

		if (sellingWindow.start?.getTime() - Date.now() < 0) {
			goto("/");
		}
	})

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
</script>



<div class="w-dvh h-dvh flex justify-center items-center bg-gray-100">
	<div class="rounded-3xl -translate-y-16 shadow-2xl bg-white p-12">
		<h1 class="text-4xl font-bold text-red-500 text-center">Lunch Orders are Closed!</h1>
		<h2 class="text-xl font-medium text-center mt-2">You may order again on Monday ({convertNumToStringMonth(sellingWindow.start?.getMonth() + 1)} {sellingWindow.start == null ? "?" : sellingWindow.start.getDate() + (sellingWindow.start.getDate() == 1 ? "st" : sellingWindow.start.getDate() == 2 ? "nd" : "th")})</h2>
	</div>
</div>