import { SECRET_API_KEY } from '$env/static/private'
import { Configuration, OpenAIApi } from "openai";


export const GET = async () => {
	const configuration = new Configuration({
		apiKey: SECRET_API_KEY,
	});
	const openai = new OpenAIApi(configuration);
	const response = await openai.createCompletion({
		model: "text-davinci-003",
		prompt: "top 10 movie shows like the big bang theory are: \n\n",
		temperature: 0,
		max_tokens: 200,
	});
	console.log(response.data.choices);
	return new Response(response.data.choices);
}