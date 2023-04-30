<script>
	import { Checkbox, Textarea, Label, Button, Alert, Spinner } from 'flowbite-svelte'
	import RecommendationCard from '$lib/components/RecommendationCard.svelte'

	const types = ['Movie', 'TV Show']
	let selectedTypes = ['Movie', 'TV Show']

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
			const json = await response.json()
			console.log(json)
			isLoading = false
			recommendations = [...json.list]
		} catch (error) {
			console.log(error)
		}
	}
</script>

<section class="p-4">
	<div class="mb-6">
		<div class="mb-6">
			<Label for="specifications" class="mb-2">Any specifications?</Label>
			<Textarea
				id="specifications"
				placeholder="E.g. featuring Tom Cruise"
				rows="3"
				bind:value={specifications}
			/>
		</div>
		<div class="mb-6">
			<Label class="mb-2">Types</Label>
			<div class="flex flex-wrap gap-4">
				{#each types as type}
					<Checkbox bind:group={selectedTypes} value={type}>{type}</Checkbox>
				{/each}
			</div>
		</div>
		<div class="mb-6">
			<Label class="mb-2">Genres</Label>
			<div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
				{#each categories as category}
					<Checkbox bind:group={selectedCategories} value={category}>{category}</Checkbox>
				{/each}
			</div>
		</div>

		<Button on:click={fetchList}>Get Recommendations</Button>
	</div>
	<div>
		{#if isLoading}
			<div
				class="flex flex-col items-center bg-white border border-gray-200 rounded-lg md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 overflow-hidden"
			>
				<img
					class="object-cover w-full h-44 md:w-48"
					src="https://media0.giphy.com/media/CLCT8BXR1T2oyBYilM/giphy.gif?cid=ecf05e476mc7wshubrm0ogph6oid99x6joh8r17bbhm9a6g5&ep=v1_gifs_related&rid=giphy.gif&ct=g"
					alt="Jimmy Fallon waiting GIF"
				/>
				<div class="flex flex-col justify-between p-4 leading-normal">
					<h5
						class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
					>
						The AI cinema gods are <span class="underline">loading</span> your recommendations.
					</h5>
					<p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
						Hope you have the popcorn ready. Your recommendations are coming right up!
					</p>
				</div>
			</div>
		{/if}
		{#if recommendations.length}
			<div>
				{#each recommendations as recommendation}
					<div class="mb-6">
						<RecommendationCard name={recommendation.name} />
					</div>
				{/each}
			</div>
		{/if}
	</div>
</section>
