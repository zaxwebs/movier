import { THEMOVIEDB_API_KEY } from "$env/static/private"

export const GET = async ({ url }) => {
	const name = url.searchParams.get('name')
	const endpoint = `https://api.themoviedb.org/3/search/multi?api_key=${THEMOVIEDB_API_KEY}&language=en-US&page=1&query=${name}`
	const response = await fetch(endpoint)
	const json = await response.json()
	const details = json.results[0]
	return new Response(JSON.stringify(details));
}