<script lang="ts">
	import { goto } from "$app/navigation";
	import { onMount } from "svelte";
	import toast from "svelte-hot-french-toast";
	import { fly } from "svelte/transition";

	type OrderItem = {
		id: string,
		name?: string | null,
		cost: number,
		quantity: number 
	}

	type Order = {
		name: string,
		grade: string,
		order: OrderItem[],
		total: number,
		complete: boolean
	}

	let menu: any = {
		"pizzas": [
			{
				id: "margherita",
				name: "Margherita",
				description: "Homemade sauce with mozzarella",
				popular: true,
				cost: 8,
			},
			{
				id: "pepperoni",
				name: "Pepperoni",
				description: "Homemade sauce, mozzarella, pepperoni",
				popular: true,
				cost: 9,
			},
			{
				id: "slick-chick",
				name: "Slick Chick",
				description: "Homemade sauce, mozzarella, chunks of chicken, onions and sweet corn",
				cost: 10,
			},
			{
				id: "bang-bang",
				name: "Bang Bang 🌶️",
				description: "Homemade sauce, mozzarella, chunks of chicken, onions and sweet corn",
				cost: 8,
			},
			
			{
				id: "garlic-butter-pizza",
				name: "Garlic Butter Pizza",
				description: "No sauce, covered in garlic butter",
				cost: 9.5,
			},
			{
				id: "oh-my-gosh",
				name: "Oh My Gosh!",
				description: "Homemade sauce, mozzarella, pepperoni, salami, homemade meat balls, onions, green peppers, mushrooms and sliced black olives.",
				cost: 12,
			},
			{
				id: "capricciosa",
				name: "Capricciosa",
				description: "Homemade sauce, mozzarella, ham, mushrooms, eggs and green olives",
				cost: 10,
			},
			{
				id: "hawaiian",
				name: "Hawaiian",
				description: "Homemade sauce, mozzarella covered with ham and pineapples",
				cost: 9,
			},
			{
				id: "the-carnivore",
				name: "The Carnivore",
				description: "Homemade sauce, mozzarella, salami, pepperoni, bacon and meatballs",
				cost: 11,
			},
		],
		"burgers": [
			{
				id: "keep-it-simple",
				name: "Keep It Simple",
				description: "Angus burger in brioche bun with American cheese, sliced tomatoes, lettuce and homemade relish.",
				popular: true,
				cost: 7.5
			},
			{
				id: "chicken-burger",
				name: "Chicken Burger",
				description: "Crispy chicken breast tucked in a brioche bun, lettuce, sliced tomatoes, onions and ranch dressing.",
				cost: 9.5
			},
		],
		"sandwiches": [
			{
				id: "the-vegetarian",
				name: "The Vegetarian",
				description: "Homemade sauce, sliced tomatoes, mozzarella, parmesan shavings and rucola",
				cost: 7.5
			},
			{
				id: "little-italy",
				name: "Little Italy",
				description: "Tomatoes, fresh mozzarella di bufala, Parma ham, rucola and balsamic glaze",
				cost: 8
			},
			{
				id: "traditional",
				name: "Traditional",
				description: "Homemade Sauce, mozzarella, and ham.",
				cost: 5
			},
		],
		"salads": [
			{
				id: "chicken-caesar-salad",
				name: "Chicken Caesar Salad",
				description: "Tender pieces of chicken mixed with iceberg lettuce, rucola, bacon, croutons, cherry tomatoes, parmesan shavings, Caesar dressing",
				cost: 9
			},
			{
				id: "green-salad",
				name: "Green Salad",
				description: "Iceberg lettuce, rucola, fresh basil, feta cheese, cherry tomatoes, olives, red cabbage drizzled with balsamic glaze",
				cost: 6
			},
			{
				id: "asian-fusion-salad",
				name: "Asian Fusion Sald",
				description: "Crispy marinated beef (The Oven style), served over iceberg lettuce, cherry tomatoes, red cabbage, rucola, feta cheese, drizzled with balsamic glaze",
				cost: 9
			},
		],
		"sides": [
			{
				id: "garlic-bread",
				name: "Garlic Bread",
				description: "",
				cost: 4
			},
			{
				id: "fries",
				name: "Fries",
				description: "",
				cost: 2.5
			},
			{
				id: "sweet-potato-fries",
				name: "Sweet Potato Fries",
				description: "",
				cost: 4
			},
			{
				id: "chicken-nuggets",
				name: "Chicken Nuggets",
				description: "",
				cost: 5.5
			},
			{
				id: "jalapeno-dippers",
				name: "Jalapeno Dippers",
				description: "",
				cost: 6
			},
		],
		"drinks": [
			{
				id: "coke",
				name: "Coke",
				description: "",
				popular: true,
				cost: 2.5
			},
			{
				id: "coke-zero",
				name: "Coke Zero",
				description: "",
				popular: true,
				cost: 2.5
			},
			{
				id: "dr-pepper",
				name: "Dr. Pepper",
				description: "",
				popular: true,
				cost: 2.5
			},
			{
				id: "sprite",
				name: "Sprite",
				description: "",
				cost: 2.5
			},
			{
				id: "sprite-zero",
				name: "Sprite Zero",
				description: "",
				cost: 2.5
			},
			{
				id: "fanta",
				name: "Dr. Pepper",
				description: "",
				cost: 2.5
			},
			{
				id: "peach-iced-tea",
				name: "Peach Iced Tea",
				description: "",
				cost: 2
			},
			{
				id: "lemon-iced-tea",
				name: "Lemon Iced Tea",
				description: "",
				cost: 2
			},
			{
				id: "water",
				name: "Water",
				description: "",
				cost: 1
			},
			{
				id: "sparkling-water",
				name: "Sparkling Water",
				description: "",
				cost: 1.5
			},
		],
	}

	let { data } = $props();
	let { supabase } = data;

	let order: Order = $state({ name: "", grade: "", order: [], total: 0, complete: false });

	let total = $derived(order.order.reduce((n, {cost, quantity}) => n + cost * quantity, 0));

	$effect(() => {
		order.total = total;
	});

	function addToOrder(id: string, name: string = "", cost: number = 0) {
		if (order.order.some((orderItem) => orderItem.id == id)) {
			incrementOrderItem(id);
		} else {
			toast.success(name + " added to order!", { position: "bottom-end" });
			order.order.push({ id: id, name: name, cost: cost, quantity: 1 });
		}
	}

	function incrementOrderItem(id: string) {
		if (order.order.find((orderItem) => orderItem.id == id)!.quantity >= 9) {
			toast.error("9 is the maximum!");
			return;
		}
		order.order.find((orderItem) => orderItem.id == id)!.quantity += 1;
	}

	function decrementOrderItem(id: string, name: string = "") {
		let orderItem = order.order.find((orderItem) => orderItem.id == id);
		if (orderItem?.quantity == 1) {
			order.order.splice(order.order.indexOf(orderItem), 1);
			toast.success(name + " removed from order!", { position: "bottom-end" });
		} else {
			orderItem!.quantity -= 1;
		}
		
	}

	onMount(() => {
		order.name = localStorage.getItem("name") ?? "";
		order.grade = localStorage.getItem("grade") ?? "";

		try {
			order.order = JSON.parse(localStorage.getItem("order") ?? "");
		} catch (e) {
			console.error(e)
		}
		

		orderID = localStorage.getItem("orderID");

		console.log(orderID);
		if (orderID != null && orderID != "") {
			goto("/order/" + orderID);
		}
	});


	$effect(() => {
		localStorage.setItem("order", JSON.stringify(order.order));
	});


	function onNameInput(event: Event & { currentTarget: EventTarget & HTMLInputElement; }) {
		localStorage.setItem("name", order.name);
	}


	function onGradeInput(event: Event & { currentTarget: EventTarget & HTMLSelectElement; }) {
		localStorage.setItem("grade", order.grade);
	}


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


	let orderID: string | null = $state(null);
	let loading: boolean = $state(false);
	async function completeOrder() {
		loading = true;

		toast.promise( 
			new Promise(async (resolve, reject) => {
				let res = await supabase
					.from ("pizza_days")
					.select("*")

				let upcoming: Date | null = null;

				if (res.error == null) {
					let days = res.data;
					
					for (let day of days) {
						if (day.cancelled) {
							continue;
						}

						let date = new Date(day.date);
						date.setHours(23);
						date.setMinutes(59);
						date.setSeconds(59);

						if (date.getTime() - new Date(Date.now()).getTime() > 0 && (upcoming == null || upcoming.getTime() - date.getTime() > 0)) {
							upcoming = date;
						}
					}
				} else {
					toast.error("Something went wrong.");
					console.error("couldn't get pizza days");
					return;
				}

				if (upcoming == null) {
					toast.error("Something went wrong.");
					console.error("couldn't get pizza days");
					return;
				}



				await new Promise((resolve) => setTimeout(resolve, 1000));

				orderID = order.name.toLowerCase().replaceAll(" ", "-") + Math.floor(Math.random() * 9)  + Math.floor(Math.random() * 9)  + Math.floor(Math.random() * 9)  + Math.floor(Math.random() * 9);

				let resInsert = await supabase
					.from("orders")
					.insert({ name: order.name, grade: order.grade, order: order.order, order_id: orderID, total: order.total, pizza_day: `${upcoming?.getFullYear()}-${upcoming?.getMonth() + 1}-${upcoming?.getDate()}` });

				if (resInsert.error != null) {
					reject();
				} else {
					resolve("pog");

					localStorage.clear();
					order.complete = true;

					localStorage.setItem("orderID", orderID);
				}
			}),
			{
				loading: "Placing order...",
				success: "Order completed!",
				error: "Failed to order!"
			}
		);

		loading = false;
	}

	$effect(() => {
		if (order.complete && (orderID != null && orderID != "")) {
			goto("/order/" + orderID);
		}
	});

	function validateKey(event: KeyboardEvent & { currentTarget: EventTarget & HTMLInputElement; }) {
		if (!/^[a-zA-Z]+$/.test(event.key)) {
			event.preventDefault();
		}
	}


	async function checkForExistingOrder(event: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement; }) {
		

		if (localStorage.getItem("orderID") != null && localStorage.getItem("orderID") != "") {
			orderID = localStorage.getItem("orderID");

			let res = await supabase
				.from("orders")
				.select("*")
				.eq("order_id", orderID)
				.single();

			if (res.data != null) {
				goto("/order/" + orderID);

				toast.success("Order found!", { position: "bottom-end" });
			} else {
				toast.error("No past order found!", { position: "bottom-end" });
			}
		} else {
			toast.error("No past order found!", { position: "bottom-end" });
		}
	}
</script>


<div class="w-full flex justify-center items-center bg-neutral-300">
	<div class="my-8 md:my-20 w-[95%] sm:w-[90%] md:w-[50rem] bg-white rounded-3xl shadow-2xl">
		<h1 class="relative text-center font-extrabold text-4xl md:text-5xl mt-8 tracking-wide">Pizza Orders</h1>
		<div class="w-[100%] flex justify-center mt-4">
			<div class="h-1 w-[80%] md:w-[50%] bg-primary rounded-full"></div>
		</div>

		{#if orderID != null && orderID != ""}
			<div class="bg-yellow-300 bg-opacity-60 rounded-2xl flex items-center mx-12 mt-12 py-6 px-6 md:px-10 gap-4">
				<i class="scale-125 fa-solid fa-triangle-exclamation text-yellow-600"></i>
				<h1>You already have an order! <button onclick={checkForExistingOrder} class="text-sm hover:text-primary font-semibold cursor-pointer">Click Here</button></h1>
			</div>
		{/if}

		<section class="p-6 md:p-12">
			<h1 class="section-header">General Information</h1>
			<!-- <h2 class="section-subheading">We will use this information to identify you.<br>Please make sure it is accurate.</h2> -->
			
			<div class="flex items-center gap-8">
				<label class="w-[50%]">
					<p class="font-medium">Name</p>
					<input disabled={order.complete} bind:value={order.name} oninput={onNameInput} onkeydown={validateKey} maxlength="16"  type="text" class="h-10 w-full p-2 border-4 rounded-xl border-gray-300 focus:border-sky-300 transition-all outline-none">
				</label>
				<label class="w-28">
					<p class="font-medium">Grade</p>
					<div class="h-10 flex items-center">
						<select disabled={order.complete} bind:value={order.grade} onchange={onGradeInput} class="w-32">
							<option value="7">12 YO</option>
							<option value="8">13 YO</option>
							<option value="9">Sec 1</option>
							<option value="10">Sec 2</option>
							<option value="11">Sec 3</option>
							<option value="12">Sec 4</option>
							<option value="staff">Staff</option>
						</select>
					</div>
				</label>			
			</div>
		</section>



		<section class="">
			<h1 class="pl-6 md:pl-12 section-header">Order</h1>

			
			<!-- <h2 class="section-subheading">We will use this information to identify you.<br>Please make sure it is accurate.</h2> -->

			{#each Object.keys(menu) as section}
				<div>
					<h2 class="pl-6 md:pl-12 section-subheader">{section.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())}</h2>
					
					{#each menu[section] as item}
						<div class="overflow-hidden group px-6 md:px-12 py-2 hover:bg-gray-100 transition-all cursor-pointer flex justify-between items-center">
							<div class="w-[75%] md:w-[35rem]">
								<div class="flex items-center gap-2">
									<h3 class="text-xl font-semibold">{item.name}</h3>
									{#if item.popular}
										<div class="py-1 px-4 bg-primary rounded-full scale-90">
											<h4 class="text-white font-semibold text-sm">popular</h4>
										</div>
									{/if}
								</div>
								
								<div class="flex items-center gap-2">
									<h4 class="text-bold text-nowrap">€ {item.cost.toFixed(2)}</h4>
									{#if item.description != ""}
										<h4>•</h4>
										<h4 class="opacity-70 text-sm overflow-hidden line-clamp-2 text-ellipsis">{item.description}</h4>
									{/if}
								</div>
							</div>
							
							<div class="h-12 flex items-center justify-end md:gap-2">
								{#if order.order.some((orderItem) => orderItem.id == item.id)}
									<div in:fly={{ x: 70 }} out:fly={{ x: 70 }} class="flex justify-center items-center">
										<!-- svelte-ignore a11y_consider_explicit_label -->
										<button disabled={order.complete} onclick={() => decrementOrderItem(item.id, item.name)} class="size-8 flex justify-center items-center rounded-full bg-primary hover:opacity-80 transition-all">
											<i class="fa-solid fa-minus text-white"></i>
										</button>
									</div>

									<div in:fly={{ x: 30 }} out:fly={{ x: 30 }} class="w-8 flex justify-center items-center">
										<h4 class="text-lg">{order.order.find((orderItem) => orderItem.id == item.id)?.quantity}</h4>
									</div>
								{/if}


								<!-- svelte-ignore a11y_consider_explicit_label -->
								<div transition:fly={{ x: 100 }} class="flex justify-center items-center z-50">
									<button disabled={order.complete} onclick={() => addToOrder(item.id, item.name, item.cost)} class="size-8 flex justify-center items-center rounded-full bg-primary hover:opacity-80 transition-all">
										<i class="fa-solid fa-plus text-white"></i>
									</button>
								</div>
							</div>
						</div>
					{/each}
				</div>
			{/each}
		</section>


		{#if order.name != "" && order.grade != ""}
			<section class="p-6 md:p-12 w-[95%] md:w-[70%] mx-auto">
				<h1 class="text-4xl font-bold my-4 mt-12 monofont">{order.name}'s Order Summary</h1>

				{#if order.order.length == 0}
					<div class="h-40 flex justify-center items-center">
						<p class="font-semibold text-red-500">You gotta get at least 1 thing :)</p>
					</div>
				{:else}
					<div class="flex justify-between my-2">
						<h3 class="monofont">Date: {new Date(Date.now()).getDate()} {convertNumToStringMonth(new Date(Date.now()).getMonth() + 1)}, {new Date(Date.now()).getFullYear()}</h3>
						<h3 class="monofont">{new Date(Date.now()).getHours()}:{new Date(Date.now()).getMinutes()}</h3>
					</div>

					{#each order.order as orderItem}
						<div class="py-2 flex justify-between items-center">
							<div class="flex items-center gap-6">
								<h3 class="monofont w-2">{orderItem.quantity}</h3>
								<h3 class="monofont">x</h3>
								<h3 class="monofont">{orderItem.name}</h3>
							</div>
							<div class="flex justify-between items-center w-16">
								<h3 class="monofont">€</h3>
								<h3 class="monofont">{(orderItem.cost * orderItem.quantity).toFixed(2)}</h3>
							</div>
						</div>
					{/each}

					<!-- <div class="py-2 flex justify-between items-center">
						<div class="flex items-center gap-6">
							<h3 class="w-24">Petr's Tax</h3>

						</div>
						<div class="flex justify-between items-center w-16">
							<h3>€</h3>
							<h3 class="">100.00</h3>
						</div>
						
					</div> -->

					<div class="mt-4 h-[2px] w-full mx-auto bg-black rounded-full"></div>
					<div>
						<h3 class="mt-2 text-end text-2xl monofont">€ {order.total.toFixed(2)}</h3>
					</div>


					<div class="mt-12 flex flex-col items-center justify-center">	
						<button disabled={order.complete} onclick={completeOrder} class="bg-primary rounded-xl px-10 py-2 hover:opacity-90 text-white font-medium">Complete Order</button>
						{#if order.complete}
							<p class="mt-2">Thanks for Ordering!</p>
						{/if}
					</div>
				{/if}
			</section>
		{:else}
			<div class="h-40 flex justify-center items-center">
				<p class="font-semibold text-red-500">Please enter a name and grade!</p>
			</div>
		{/if}

		<div class="mb-2 flex justify-center items-center gap-2">
			<h5 class="font-medium opacity-70 text-sm">Already ordered (on this device)?</h5>

			<button onclick={checkForExistingOrder} class="text-sm hover:text-primary opacity-70 hover:opacity-100 font-semibold cursor-pointer">Click Here</button>
		</div>
	</div>
</div>

<style class="postcss">
	.section-header {
		@apply text-3xl md:text-4xl font-bold my-4;
	}

	.section-subheading {
		@apply text-sm font-medium opacity-70 leading-snug;
	}

	.section-subheader {
		@apply text-2xl md:text-3xl font-bold mb-4 mt-10;
	}


	.monofont {
		font-family: monospace;
	}
</style>