<script>
	import { onMount } from 'svelte'
	import { Rating } from 'flowbite-svelte'

	export let name
	export let type
	export let year

	let details

	onMount(async () => {
		const response = await fetch(`api/details?name=${name}&year=${year}`)
		details = await response.json()
	})

	const convertRating = (rating) => {
		const outOfFive = rating / 2
		return outOfFive.toFixed(1)
	}
</script>

<div class="flex flex-col md:flex-row overflow-hidden rounded border">
	<img
		class="h-40 w-full object-cover md:h-full md:w-48"
		src={details
			? `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${details.poster_path}`
			: 'images/poster.jpg'}
		alt="poster"
	/>
	<div class="flex flex-col justify-start p-6">
		<h5 class="mb-4 text-xl font-medium text-neutral-800 dark:text-neutral-50">{name}</h5>
		<div class="flex gap-4 text-sm font-medium text-gray-900 dark:text-white mb-4">
			<div>{type}</div>
			<div>{year}</div>
		</div>
		{#if details}
			<p class="mb-4 text-base text-neutral-600 dark:text-neutral-200">
				{details.overview}
			</p>
		{/if}

		{#if details}
			<Rating count rating={convertRating(details.vote_average)}>
				<span class="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400" />
				<span class="text-sm font-medium text-gray-900 dark:text-white"
					>{details.vote_count} ratings</span
				>
			</Rating>
		{/if}
	</div>
</div>
