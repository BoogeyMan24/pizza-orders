<script lang="ts">
	import { invalidateAll } from "$app/navigation";
	import type { SupabaseClient } from "@supabase/supabase-js";

	let { supabase }: { supabase: SupabaseClient } = $props();


	async function logout() {
		const { error } = await supabase.auth.signOut();

		invalidateAll();
	}
</script>

<nav class="h-20 w-full shadow-lg px-12 flex items-center justify-between">
	<a href="/overview" class="">
		<h1 class="text-primary text-2xl font-bold">ok</h1>
	</a>

	<button onclick={logout} class="size-12 hover:bg-gray-200 flex justify-center items-center cursor-pointer rounded-lg">
		<i class="scale-125 fa-solid fa-right-from-bracket"></i>
	</button>
</nav>