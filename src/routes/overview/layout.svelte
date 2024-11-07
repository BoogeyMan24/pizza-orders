<script lang="ts">
	import Nav from "$components/Nav.svelte";

	let { children, data } = $props();
	let { supabase, session } = data;
</script>

<Nav {...data} />
{@render children()}
