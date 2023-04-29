<script>
	import Button from "../lib/components/Button.svelte"

	const types = ["Movie", "TV Show"]
	let selectedTypes = ["Movie"]

	const categories = [
		"Action",
		"Comedy",
		"Drama",
		"Horror",
		"Romance",
		"Adventure",
		"Sci-Fi",
		"Thriller",
		"Crime",
		"Animation",
		"Fantasy",
		"Mystery",
		"Documentary",
		"Family",
		"War",
		"Musical",
		"Western",
		"History",
		"Sport",
		"Biography",
	]
	let selectedCategories = []

	let specifications

	const fetchList = async () => {
		const data = {
			selectedTypes,
			selectedCategories,
			specifications,
		}

		try {
			const response = await fetch("/api/recommend", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			})
			const json = await response.json()
			console.log(json)
		} catch (error) {
			console.log(error)
		}
	}
</script>

<div>
	<div>
		<div>Types</div>
		<div>
			{#each types as type}
				<label>
					<input
						type="checkbox"
						bind:group={selectedTypes}
						value={type}
					/>
					{type}
				</label>
			{/each}
		</div>
	</div>
	<div>
		<div>Genres</div>
		<div class="flex flex-wrap gap-4">
			{#each categories as category}
				<label>
					<input
						type="checkbox"
						bind:group={selectedCategories}
						value={category}
					/>
					{category}
				</label>
			{/each}
		</div>
	</div>
	<div>
		<div>Any specifications?</div>
		<div>
			<textarea bind:value={specifications} class="border" />
		</div>
	</div>
	<button on:click={fetchList}>Get Started</button>
</div>
