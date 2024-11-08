<script lang="ts">
	import { goto } from "$app/navigation";
	import toast from "svelte-hot-french-toast";

	let props = $props();
	let { data: { supabase } } = props;


	let email = $state("");
	let password = $state("");


	function login() {
		toast.promise(
			new Promise(async (resolve, reject) => {
				console.log("begin");
				const res = await supabase.auth.signInWithPassword({
					email: email,
					password: password,
				});
				console.log("supabase auth", res);

				console.log("pass?", !res.error);
				console.log(res);
				if (!res.error) {
					console.log("loggedin begin");

					await goto("/overview");
					resolve("loggedin");
					
					console.log("loggedin end");
				} else {
					console.log("error begin");
					reject();
					console.log("error end");
				}
				console.log("end");
			}),
			{
				loading: "Logging in...",
				success: "Logged in",
				error: "Failed to login."
			},
			{
				position: "top-end"
			}
		)
	}
</script>

<div class="w-full h-[calc(100vh_-_10rem)] flex justify-center items-center">
	<div class="p-8 border rounded-xl shadow-xl">
		<div class="w-80 flex flex-col g-4">
			<h1 class="pr-24 text-xl text-primary font-bold">Login to see the Orders!</h1>
			<div class="mt-4 mb-8 flex flex-col gap-2">
				<label class="flex flex-col">
					Email
					<input required bind:value={email} name="email" type="email" class="primary-input">
					<!-- {#if form?.type === "email"}
						<p class="text-red-500">{form?.error}</p>
					{/if} -->
				</label>
				<label class="flex flex-col">
					Password
					<input required bind:value={password} name="password" type="password" class="primary-input">
					<!-- {#if form?.type === "password"}
						<p class="text-red-500">{form?.error}</p>
					{/if} -->
				</label>
				<!-- {#if form?.type === "authentication"}
					<p class="text-red-500">{form?.error}</p>
				{/if} -->
			</div>
			
			<div class="w-full flex justify-end items-center">
				<button onclick={login} class="px-5 py-1 bg-primary rounded-md text-white text-xs">Sign in</button>
			</div>
		</div>
	</div>
</div>

<style lang="postcss">
	.primary-input {
		@apply border rounded-md px-2 py-1;
	}
</style>