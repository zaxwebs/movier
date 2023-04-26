<script>
	import Button from '../lib/components/Button.svelte'
	import Checkbox from '../lib/components/Checkbox.svelte'

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
	let selectedCatagories = []
</script>

<div>
	<div>
		<div>Types</div>
		<div>
			{#each types as type}
				<label>
					<input type="checkbox" bind:group={selectedTypes} value={type} />
					{type}
				</label>
			{/each}
		</div>
	</div>
	<div>
		<div>Genres</div>
		<div>
			{#each categories as category}
				<label>
					<input type="checkbox" bind:group={selectedCatagories} value={category} />
					{category}
				</label>
			{/each}
		</div>
	</div>
	<div>
		<div>Any specifications?</div>
		<div>
			<textarea />
		</div>
	</div>
	<Button>Get Started</Button>
</div>
