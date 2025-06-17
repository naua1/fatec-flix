import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Movie, MovieLink } from '../../interfaces/movie.interface'
import { fetchMovieDetails, fetchMovieWatchProviders } from '../../utils/api'
import './MovieDetail.css'

const MovieDetail = () => {
	const { id } = useParams()

	const [movieDetails, setMovieDetails] = useState<Movie>({} as Movie)
	const [providers, setProviders] = useState<MovieLink>({} as MovieLink)
	const [isInFavorites, setIsInFavorites] = useState(false)

	const links = [
		{
			provider_id: 119,
			movie_id: 603692,
			link: 'https://www.primevideo.com/-/pt/detail/0OPU861X5ZA4ETQFV906HPCQ1T/ref=atv_dl_rdr?tag=justbrrsjd-20',
		},
		{
			provider_id: 119,
			movie_id: 245891,
			link: 'https://www.primevideo.com/-/pt/detail/0QSV36C6S10IZ3NOZILJ71VZ9C/ref=atv_dl_rdr?tag=justbrrsjd-20',
		},
		{
			provider_id: 307,
			movie_id: 245891,
			link: 'https://globoplay.globo.com/john-wick-de-volta-ao-jogo/t/xjjRq58GYJ/',
		},
		{
			provider_id: 484,
			movie_id: 245891,
			link: 'https://www.clarotvmais.com.br/filme/john-wick-de-volta-ao-jogo/2537669',
		},
		{
			provider_id: 227,
			movie_id: 245891,
			link: 'https://www.telecine.com.br/',
		},
		{
			provider_id: 119,
			movie_id: 324552,
			link: 'https://www.primevideo.com/-/pt/detail/0IUK3B812OE0SHGE6669S2F27R/ref=atv_dl_rdr?tag=justbrrsjd-20',
		},
		{
			provider_id: 307,
			movie_id: 324552,
			link: 'https://globoplay.globo.com/john-wick-um-novo-dia-para-matar/t/9sxcgDQCKP/',
		},
		{
			provider_id: 119,
			movie_id: 458156,
			link: 'https://www.primevideo.com/-/pt/detail/0O733T1H6OITZW94X3B2NU9HNN/ref=atv_dl_rdr?tag=justbrrsjd-20',
		},
		{
			provider_id: 307,
			movie_id: 458156,
			link: 'https://globoplay.globo.com/john-wick-3-parabellum/t/NNRjmsDsT1/',
		},
		{
			provider_id: 227,
			movie_id: 458156,
			link: 'https://www.telecine.com.br/',
		},
	]

	useEffect(() => {
		const fetchMovie = async () => {
			const movie = await fetchMovieDetails(Number(id))
			setMovieDetails(movie)
			const providers = await fetchMovieWatchProviders(Number(id))
			setProviders(providers)
		}

		fetchMovie().catch(console.error)
	}, [id])

	useEffect(() => {
		const favorites = JSON.parse(localStorage.getItem('favorites') || '[]')
		setIsInFavorites(favorites.some((fav: Movie) => fav.id === movieDetails.id))
	}, [movieDetails.id])

	const handleAddToFavorites = () => {
		const user = JSON.parse(localStorage.getItem('user') || '{}')
		if (user.isLoggedIn) {
			const favorites = JSON.parse(localStorage.getItem('favorites') || '[]')

			if (!isInFavorites) {
				favorites.push(movieDetails)

				localStorage.setItem('favorites', JSON.stringify(favorites))
			} else {
				console.log('O filme já está na lista de favoritos.')
				handleRemoveFromFavorites()
			}

			setIsInFavorites(!isInFavorites)
		} else {
			console.log('O usuário não está logado.')
		}
	}

	const handleRemoveFromFavorites = () => {
		const favorites = JSON.parse(localStorage.getItem('favorites') || '[]')
		const updatedFavorites = favorites.filter(
			(fav: Movie) => fav.id !== movieDetails.id
		)

		localStorage.setItem('favorites', JSON.stringify(updatedFavorites))

		console.log('Filme removido dos favoritos.')

		setIsInFavorites(!isInFavorites)
	}

	const findLink = (providerId: number, movieId: number) => {
		const linkObj = links.find(
			(link) => link.provider_id === providerId && link.movie_id === movieId
		)
		return linkObj ? linkObj.link : '#'
	}

	if (movieDetails) {
		return (
			<div className='movie-detail-container'>
				<img
					src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
					alt={movieDetails.title}
				/>
				<div className='movie-detail-info'>
					<h2>{movieDetails.title}</h2>
					<p>{movieDetails.overview}</p>
					{isInFavorites ? (
						<button
							onClick={handleRemoveFromFavorites}
							className='remove-from-favorites'
						>
							Remover dos Favoritos
						</button>
					) : (
						<button
							onClick={handleAddToFavorites}
							className='add-to-favorites'
						>
							Adicionar aos Favoritos
						</button>
					)}
					<div className='providers-info'>
						<h3>Stream</h3>
						<ul>
							{providers?.flatrate?.map((provider) => (
								<li
									key={provider.provider_id}
									onClick={() =>
										window.open(
											findLink(provider.provider_id, movieDetails.id),
											'_blank'
										)
									}
									id={provider.provider_id.toString()}
								>
									<img
										src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
										alt={`${provider.provider_name} logo`}
										className='provider-logo'
									/>
								</li>
							))}
						</ul>
						<h3>Alugar</h3>
						<ul>
							{providers?.rent?.map((provider) => (
								<li key={provider.provider_id}>
									<img
										src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
										alt={`${provider.provider_name} logo`}
										className='provider-logo'
									/>
								</li>
							))}
						</ul>
						<h3>Comprar</h3>
						<ul>
							{providers?.buy?.map((provider) => (
								<li key={provider.provider_id}>
									<img
										src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
										alt={`${provider.provider_name} logo`}
										className='provider-logo'
									/>
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		)
	} else {
		return <div>Loading...</div>
	}
}

export default MovieDetail
