import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import TitleDetails from '../../common/TitleDetails'
import ActorList from '../../common/ActorList'
import ActorDetails from '../../common/ActorDetails'
import Loader from '../../common/Loader'
import TMDB from '../../../api/api'

function R_TP() {
	const { type, id } = useParams()

	// State for managing the data
	const [loading, setLoading] = useState(true)
	const [selectedActorID, setSelectedActorID] = useState(null)
	const [selectedActor, setSelectedActor] = useState({})
	const [actors, setActors] = useState([])
	const [title, setTitle] = useState({})
	const [recommendedMovies, setRecommendedMovies] = useState([])

	// Fetch the title and actors based on the current ID and type
	useEffect(() => {
		const fetchData = async () => {
			setLoading(true)
			// Fetch title data from TMDB
			const titleData = await TMDB.getTitle(type, id)
			setTitle(titleData.data)

			// Fetch actors data from TMDB
			const actorsData = await TMDB.getActors(type, id)
			setActors(actorsData)

			// Fetch recommended movies based on the title
			const recommendationsData = await TMDB.getRecommendedMovies(titleData.data.title)
			setRecommendedMovies(recommendationsData)

			setLoading(false)
		}
		fetchData()
	}, [type, id])

	// Fetch actor details based on the selected actor
	const fetchActor = async (actorID) => {
		setLoading(true)
		const actorData = await TMDB.getActor(actorID)
		setSelectedActor(actorData)
		setLoading(false)
	}

	useEffect(() => {
		if (!selectedActorID) return
		fetchActor(selectedActorID)
	}, [selectedActorID])

	return (
		<>
			{/* Display actor details if selected */}
			{selectedActorID && 
				<ActorDetails 
					actor={selectedActor} 
					loading={loading}
					onClose={() => setSelectedActorID(null)} 
				/>
			}

			{/* Display the title details */}
			{title.data && <TitleDetails title={title.data} />}

			{/* Display actor list */}
			{actors && 
				<ActorList 
					header="Cast" 
					actors={actors} 
					onClick={setSelectedActorID} 
				/>
			}

			{/* Display recommended movies below the actors */}
			{recommendedMovies.length > 0 && !loading && (
				<div className="recommended-movies">
					<h3>Recommended Movies</h3>
					<ul>
						{recommendedMovies.map(movie => (
							<li key={movie.id}>
								<a href={`/title/${movie.type}/${movie.id}`}>
									{movie.title}
								</a>
							</li>
						))}
					</ul>
				</div>
			)}

			{/* Loader */}
			{loading && <Loader />}

			{/* If no data and not loading, show loader */}
			{!(title.data || actors) && <Loader />}
		</>
	)
}

export default R_TP
