<script lang="ts">
	import { invalidateAll } from "$app/navigation";
	import { onMount } from "svelte";

	let { data } = $props();
	let { supabase } = data;

	async function logoutGlobally() {
		const { error } = await supabase.auth.signOut({ scope: "global" });

		if (!error) {
			invalidateAll();
		}
	}
</script>

<button onclick={logoutGlobally}>Logout Globally</button>