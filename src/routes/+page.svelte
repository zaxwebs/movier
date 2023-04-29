<script>
	import { extractNumberedList } from '$lib/utils/helpers'
	import { Checkbox, Textarea, Label, Button } from 'flowbite-svelte'

	const types = ['Movie', 'TV Show']
	let selectedTypes = ['Movie']

	const categories = [
		'Action',
		'Comedy',
		'Drama',
		'Horror',
		'Romance',
		'Adventure',
		'Sci-Fi',
		'Thriller',
		'Crime',
		'Animation',
		'Fantasy',
		'Mystery',
		'Documentary',
		'Family',
		'War',
		'Musical',
		'Western',
		'History',
		'Sport',
		'Biography',
	]
	let selectedCategories = []

	let specifications

	let recommendations = []

	let isLoading = false

	const fetchList = async () => {
		isLoading = true
		recommendations = []

		const data = {
			selectedTypes,
			selectedCategories,
			specifications,
		}

		try {
			const response = await fetch('/api/recommend', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			})
			const output = await response.text()
			console.log(extractNumberedList(output))

			isLoading = false
			recommendations = extractNumberedList(output)
		} catch (error) {
			console.log(error)
		}
	}
</script>

<div class="mb-4">
	<div class="mb-3">
		<Label class="mb-2">Types</Label>
		<div class="flex flex-wrap gap-4">
			{#each types as type}
				<Checkbox bind:group={selectedTypes} value={type}>{type}</Checkbox>
			{/each}
		</div>
	</div>
	<div class="mb-3">
		<Label class="mb-2">Genres</Label>
		<div class="flex flex-wrap gap-4">
			{#each categories as category}
				<Checkbox bind:group={selectedCategories} value={category}>{category}</Checkbox>
			{/each}
		</div>
	</div>
	<div class="mb-3">
		<Label for="specifications" class="mb-2">Any specifications?</Label>
		<Textarea
			id="specifications"
			placeholder="Your message"
			rows="3"
			bind:value={specifications}
		/>
	</div>
	<Button on:click={fetchList}>Get Recommendations</Button>
</div>
<div>
	{#if isLoading}
		Loading...
	{/if}
	{#each recommendations as recommendation}
		<div>{recommendation}</div>
	{/each}
</div>
