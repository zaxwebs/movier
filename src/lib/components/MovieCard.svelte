<script>
	import { onMount } from 'svelte'

	export let name

	let details

	onMount(async () => {
		const response = await fetch(`api/details?name=${name}`)
		details = await response.json()
	})
</script>

<div class="border rounded">
	<div class="p-4">
		<h3 class="text-lg font-semibold text-gray-900 dark:text-white">
			{name}
		</h3>
		{#if details}
			<p>{details.overview}</p>
		{/if}
	</div>
</div>
