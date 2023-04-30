<script>
	import { onMount } from 'svelte'
	import { Rating } from 'flowbite-svelte'

	export let name

	let details

	onMount(async () => {
		const response = await fetch(`api/details?name=${name}`)
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
			? `https://www.themoviedb.org/t/p/w300_and_h450_bestv2${details.poster_path}`
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

		{#if details}
			<p class="text-xs text-neutral-500 dark:text-neutral-300 mb-4">
				Released on {details.release_date}
			</p>
			<Rating count rating={convertRating(details.vote_average)}>
				<span class="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400" />
				<span class="text-sm font-medium text-gray-900 dark:text-white"
					>{details.vote_count} reviews</span
				>
			</Rating>
		{/if}
	</div>
</div>
