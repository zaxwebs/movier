const DEFAULT_TYPES = "movie, tv show"
const MAX_RESULTS = 5

export default function generatePrompt(
	selectedTypes = [],
	selectedCategories = [],
	specifications = "none"
) {
	const types = selectedTypes.length
		? selectedTypes.join(", ")
		: DEFAULT_TYPES
	const categories = selectedCategories.length
		? selectedCategories.join(", ")
		: "any"
	const prompt = `give me a numbered list of ${MAX_RESULTS} cinema recommendations fulfilling:
	type: <${types}>
	category: <${categories}>
	specifications: <${specifications}>
	item format: name ex. Sherlock | type ex. TV Show | starting_year`

	return prompt
}
