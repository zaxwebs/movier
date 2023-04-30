import { OPENAI_API_KEY } from "$env/static/private"
import { Configuration, OpenAIApi } from "openai"
import generatePrompt from "$lib/utils/generatePrompt"
import { extractList } from '$lib/utils/helpers'

const configuration = new Configuration({
	apiKey: OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)

export const POST = async ({ request }) => {
	const { selectedTypes, selectedCategories, specifications } =
		await request.json()
	const prompt = generatePrompt(
		selectedTypes,
		selectedCategories,
		specifications
	)

	const response = await openai.createChatCompletion({
		model: "gpt-3.5-turbo",
		messages: [{ role: "user", content: prompt }],
	})

	const content = response.data.choices[0].message.content
	const extractedList = extractList(content)
	const objects = []

	extractedList.forEach(item => {
		const splits = item.split(" | ")
		objects.push({
			name: splits[0],
			type: splits[1],
		})
	})


	console.log(extractedList)


	return new Response(JSON.stringify({ list: objects }))
}
