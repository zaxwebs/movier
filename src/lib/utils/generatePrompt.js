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
	const prompt = `give me a numbered list of top ${MAX_RESULTS} cinema recommendations that match the following criteria:
	type: <${types}>
	category: <${categories}>
	specifications: <${specifications}>

	Format of each item should be:
	name | type | starting_year e.g Sherlock | TV Show | 2010.`

	return prompt
}
