import { SECRET_API_KEY } from "$env/static/private"
import { Configuration, OpenAIApi } from "openai"

export const GET = async () => {
	const configuration = new Configuration({
		apiKey: SECRET_API_KEY,
	})
	const openai = new OpenAIApi(configuration)

	const response = await openai.createChatCompletion({
		model: "gpt-3.5-turbo",
		messages: [
			{
				role: "user",
				content: 'give me a list of top 10 tv shows like "friends"',
			},
		],
	})

	console.log(response.data.choices)
	return new Response(response.data.choices[0].message.content)
}
