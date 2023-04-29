const DEFAULT_TYPES = ["movie", "tv show"]
const MAX_RESULTS = 5

export default function generatePrompt(
	selectedTypes,
	selectedCategories,
	specifications
) {
	const types = selectedTypes
		? selectedTypes.join(", ")
		: DEFAULT_TYPES.join(", ")
	const categories = selectedCategories
		? selectedCategories.join(", ")
		: "any"
	const specs = specifications
		? `Make sure it fits the following specifications as well: <${specifications}>`
		: ""
	let fallbackMsg = ""

	if (selectedTypes || specifications) {
		fallbackMsg = `If you do not have ${MAX_RESULTS} recommendations that fit these criteria perfectly or if there are other reasons, do your best to suggest other cinemas of type: ${types} that I might like.`
	}

	const prompt = `
    give me a list of top ${MAX_RESULTS} cinema recommendations that match the following criteria:

    type: <${types}>
    category: <${categories}>

    ${specs}

    ${fallbackMsg}

    I understand you are an AI and do not have preferences.
    Please ALWAYS return this response numbered list of titles.
  `

	return prompt
}
