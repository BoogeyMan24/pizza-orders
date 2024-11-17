<script>

	import { fly } from "svelte/transition";

</script>


<div class="w-full flex justify-center items-center bg-neutral-300">
	<div class="my-8 md:my-20 w-[95%] sm:w-[90%] md:w-[50rem] bg-white rounded-3xl shadow-2xl">
		<h1 class="relative text-center font-extrabold text-2xl md:text-3xl mt-8 tracking-wide">Frequently Asked Questions</h1>
		<div class="w-[100%] flex justify-center mt-4">
			<div class="h-1 w-[80%] md:w-[50%] bg-primary rounded-full"></div>
		</div>

		<section class="p-6 md:p-12 flex flex-col gap-8">
			<div>
				<h1 class="section-header">How do I pay for my order? 🍕</h1>
				<p class="w-[80%]">You can pay for your order at the stand on thursday using your order ID. Please don't forget to do so, otherwise you won't get your food.</p>
			</div>

			<div>
				<h1 class="section-header">How do I find my order id? 🤔</h1>
				<p class="w-[80%]">When you complete your order, it will be directly below the "order summary" title to the right. An order ID always has this pattern: name1234 (eg. petr2112). If you ever forget it, we can find it using your name and grade so don't worry too much about it.</p>
			</div>

			<div>
				<h1 class="section-header">I ordered, but don't know where to find it. 🤯</h1>
				<p class="w-[80%]">If you have your order ID, just use it <a href="/order" class="font-semibold opacity-80 hover:text-primary">here</a>. If you don't have it, send Petr a message asking for it on Teams.</p>
			</div>

			<div>
				<h1 class="section-header">How do I know if my order is paid for? 💵</h1>
				<p class="w-[80%]">If you have your order ID, you can navigate <a href="/order" class="font-semibold opacity-80 hover:text-primary">here</a> and enter it. If you don't have your order ID, ask Petr for it on Teams.</p>
			</div>

			<div>
				<h1 class="section-header">I want to change my order. How do I do that? 😏</h1>
				<p class="w-[80%]">You can just make a completely new order. Since we keep track of all orders, we may ask which the correct one is when you are paying for it on Thursday.</p>
			</div>

			<div>
				<h1 class="section-header">I have a different question. 🤫</h1>
				<p class="w-[80%]">Feel free to ask Petr on Teams during school business hours.</p>
			</div>

			<div>
				<h1 class="section-header">This website is so cool! How did you make it? 🫡</h1>
				<p class="w-[80%]">All source code is on Petr's GitHub: <a href="https://github.com/BoogeyMan24/pizza-orders/tree/main" target="_blank" class="font-semibold opacity-80 hover:text-primary">here</a>. If you are genuinly interested, consider joining Coding Club 😎</p>
			</div>


		</section>


		<div class="mb-2 flex justify-center items-center">
			<a href="/" class="text-md mb-2 hover:text-primary opacity-70 hover:opacity-100 font-semibold cursor-pointer">Back to Ordering</a>
		</div>
	</div>
</div>


<style class="postcss">
	.section-header {
		@apply text-xl md:text-2xl font-bold my-4;
	}

	.section-subheading {
		@apply text-sm font-medium opacity-70 leading-snug;
	}

	.section-subheader {
		@apply text-xl md:text-2xl font-bold mb-4 mt-10;
	}


	.monofont {
		font-family: monospace;
	}
</style>