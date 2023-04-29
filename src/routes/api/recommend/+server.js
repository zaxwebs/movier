import { SECRET_API_KEY } from '$env/static/private'
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
	apiKey: SECRET_API_KEY,
});
const openai = new OpenAIApi(configuration)


const generatePrompt = (selectedTypes, selectedCategories, specifications) => {
	const count = 5;

	return `
		give me a list of top ${count} cinema recommendations that match the following criteria:

		type:  ${selectedTypes ? selectedTypes.join(', ') : 'movie, tv show'}
		category: ${selectedCategories ? selectedCategories.join(', ') : 'any'}

		${specifications
			? `Make sure it fits the following specifications as well: ${specifications}.`
			: ''
		}

		${selectedTypes || specifications
			? `If you do not have ${count} recommendations that fit these criteria perfectly or if there are other reasons, do your best to suggest other cinemas of type: ${selectedTypes.join(', ')}'s that I might like.`
			: ''
		}
	

		I understand you do not have preferences.
		Please ALWAYS return this response numbered list of titles of titles.
	`
}

export const GET = async () => {


	const response = await openai.createChatCompletion({
		model: "gpt-3.5-turbo",
		messages: [
			{ role: 'user', content: 'give me a list of top 10 tv shows like friends' }
		],
	});

	console.log(response.data.choices);
	return new Response(response.data.choices[0].message.content); // TODO: stringify
}

export const POST = async ({ request }) => {
	const { selectedTypes, selectedCategories, specifications } = await request.json()
	const prompt = generatePrompt(selectedTypes, selectedCategories, specifications)
	console.log(prompt)
	const response = await openai.createChatCompletion({
		model: "gpt-3.5-turbo",
		messages: [
			{ role: 'user', content: prompt }
		],
	});
	return new Response(JSON.stringify(response.data.choices[0].message.content))
}