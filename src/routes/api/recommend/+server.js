import { SECRET_API_KEY } from '$env/static/private'
import { fetch } from 'undici'


export const GET = async () => {
	const url = 'https://openai80.p.rapidapi.com/chat/completions';
	const options = {
		method: 'POST',
		headers: {
			'content-type': 'application/json',
			'X-RapidAPI-Key': SECRET_API_KEY,
			'X-RapidAPI-Host': 'openai80.p.rapidapi.com'
		},
		body: {
			model: 'gpt-3.5-turbo',
			messages: [
				{
					role: 'user',
					content: 'list 10 movies'
				}
			]
		}
	};

	try {
		const response = await fetch(url, options);
		const result = await response.json();
		console.log(result)
		return new Response(result);
	} catch (error) {
		console.error(error);
	}


}