<script lang="ts">
	let { date, count } = $props();
	let dateDate = new Date(date);

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

<a href={"/overview/" + dateDate.getFullYear() + "-" + (dateDate.getMonth().toString().length == 1 ? "0" + (dateDate.getMonth() + 1) : dateDate.getMonth() + 1) + "-" + (dateDate.getDate().toString().length == 1 ? "0" + dateDate.getDate() : dateDate.getDate())} class="p-4 rounded-xl shadow-xl border flex justify-between items-center">
	<h1>{dateDate.getDate() + " " + convertNumToStringMonth(dateDate.getMonth() + 1) + ", " + dateDate.getFullYear()}</h1>
	<h1>{count}</h1>
</a>