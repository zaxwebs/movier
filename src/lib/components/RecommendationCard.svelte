<script>
	import { onMount } from 'svelte'

	export let name

	let details

	onMount(async () => {
		const response = await fetch(`api/details?name=${name}`)
		details = await response.json()
	})

	// https://www.themoviedb.org/t/p/w600_and_h900_bestv2/ngl2FKBlU4fhbdsrtdom9LVLBXw.jpg
</script>

<div class="flex flex-col rounded md:flex-row border">
	<img
		class="h-40 w-full rounded-t-lg object-cover md:h-full md:w-48 md:rounded-none md:rounded-l-lg"
		src={details
			? `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${details.poster_path}`
			: 'https://tecdn.b-cdn.net/wp-content/uploads/2020/06/vertical.jpg'}
		alt="poster"
	/>
	<div class="flex flex-col justify-start p-6">
		<h5 class="mb-2 text-xl font-medium text-neutral-800 dark:text-neutral-50">{name}</h5>
		{#if details}
			<p class="mb-4 text-base text-neutral-600 dark:text-neutral-200">
				{details.overview}
			</p>
		{/if}
		<p class="text-xs text-neutral-500 dark:text-neutral-300">Last updated 3 mins ago</p>
	</div>
</div>
