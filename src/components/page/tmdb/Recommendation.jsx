import React, { useState, useEffect, useReducer } from 'react'

import Hero from '../../common/Hero'
import Search from '../../common/Search'
import TitleList from '../../common/TitleList'
import Loader from '../../common/Loader'
import End from '../../common/End'

import TMDB from '../../../api/api'
const movies = [
  19995, 285, 206647, 49026, 49529, 559, 38757, 99861, 767, 209112, 1452, 10764, 58, 57201, 49521, 2454, 24428,
  1865, 41154, 122917, 1930, 20662, 57158, 2268, 254, 597, 271110, 44833, 135397, 37724, 558, 68721, 12155, 36668,
  62211, 8373, 91314, 68728, 102382, 20526, 49013, 44912, 10193, 534, 168259, 72190, 127585, 54138, 81005, 64682,
  9543, 68726, 38356, 217, 105864, 62177, 188927, 10681, 5174, 14161, 17979, 76757, 258489, 411, 246655, 155, 14160,
  15512, 1726, 44826, 8487, 1735, 297761, 2698, 137113, 9804, 14869, 150540, 278927, 10138, 58595, 102651, 119450,
  79698, 64686, 100402, 10192, 158852, 177572, 82690, 5255, 47933, 10191, 296, 118340, 157336, 27205, 315011, 49051,
  9799, 4922, 49538, 131634, 27022, 503, 241259, 810, 68735, 87101, 10140, 676, 1858, 1966, 675, 674, 8960, 6479,
  118, 2062, 272, 10527, 18360, 2080, 605, 109445, 604, 76338, 76341, 13448, 10195, 13053, 19585, 57165, 62213,
  177677, 7978, 5559, 49444, 10196, 956, 117251, 50321, 11619, 266647, 82703, 652, 80321, 36669, 43074, 95, 608,
  2310, 140300, 56292, 81188, 7552, 616, 147441, 13475, 557, 82702, 205584, 10048, 13183, 944, 1927, 72559, 7364,
  2114, 1771, 36643, 8619, 50620, 65759, 1724, 267935, 281957, 77950, 44896, 270946, 2503, 9502, 102899, 101299,
  228161, 74, 8961, 417859, 27576, 86834, 17578, 673, 6972, 82700, 10567, 181533, 38055, 671, 49524, 22, 131631,
  591, 172385, 36658, 51497, 58574, 18823, 861, 1911, 49040, 415, 8871, 435, 955, 2133, 1979, 87827, 1250, 324668,
  9471, 70981, 10996, 68724, 2789, 97020, 7459, 42888, 37834, 75612, 1895, 1894, 585, 76170, 1893, 49519, 2395,
  12100, 290595, 98566, 49047, 9619, 308531, 166424, 1593, 254128, 714, 2024, 163, 787, 262500, 2567, 38745, 40805,
  53182, 41513, 13700, 262504, 39254, 77931, 1639, 80274, 1571, 120, 10204, 8489, 10588, 2048, 1495, 10137, 10198,
  286217, 1635, 24113, 9679, 98, 180, 672, 36557, 869, 280, 11322, 4982, 36955, 18487, 39451, 27581, 9268, 68718,
  10545, 11688, 76163, 2059, 2486, 16523, 116711, 37710, 9946, 1372, 106646, 414, 563, 83542, 41216, 314, 184315,
  9016, 18162, 138103, 257088, 10214, 205775, 11692, 22972, 227973, 29193, 1734, 3131, 76758, 9408, 9890, 855,
  77953, 18, 37786, 10501, 57800, 150689, 7980, 12, 122, 121, 68737, 1995, 157353, 331, 61791, 8204, 47964, 10733,
  9806, 1408, 32657, 607, 863, 44048, 5175, 2655, 22794, 8355, 116745, 4327, 1422, 10674, 7446, 65754, 1572, 10528,
  271969, 10865, 258509, 2253, 10661, 257344, 644, 10756, 686, 9383, 179, 76285, 1996, 291805, 10003, 1535, 2067,
  46195, 2277, 10357, 4477, 8665, 9387, 921, 49852, 4464, 664, 8358, 9836, 2502, 9772, 161, 52451, 76492, 4523,
  59961, 10481, 59108, 1581, 9798, 22897, 298, 7484, 157350, 853, 10159, 9593, 1904, 9615, 51052, 297, 9884, 16858,
  62764, 22538, 9341, 12107, 9637, 49049, 9339, 16281, 39691, 8247, 11253, 1949, 8452, 310, 27578, 954, 70160,
  45243, 364, 7518, 11544, 9986, 8656, 146216, 9291, 55301, 109418, 11665, 6964, 11324, 12193, 9928, 754, 10202,
  4147, 50546, 1701, 13027, 2289, 20504, 9574, 11618, 2300, 12096, 10200, 8834, 228150, 6068, 41515, 9023, 38317
]

const initialTitlesState = {
  page: 0,
  data: [],
  totalPages: 0,
  totalTitles: 0,
}

const titlesReducer = (state, { type, payload }) => {
  switch (type) {
    case 'SET_INITIAL':
      return initialTitlesState

    case 'ADD_TITLES':
      return {
        page: state.page + 1,
        totalPages: payload.total_pages,
        totalTitles: payload.total_results,
        data: [
          ...new Map(
            [...state.data, ...payload.results].map(el => [el.id, el])
          ).values()
        ],
      }

    default:
      throw new Error()
  }
}


function Home() {
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(false)
  const [titles, dispatch] = useReducer(titlesReducer, initialTitlesState)
  let heroTitle = titles.data && titles.data[0]

  const filterMovies = (allMovies) => {
    return allMovies.filter(movie => movies.includes(movie.id))
  }

  useEffect(() => {
    dispatch({ type: 'SET_INITIAL' })
    fetchTitles(1, searchQuery)
  }, [searchQuery])

  const fetchTitles = async (page, searchTerm = "") => {
    setLoading(true)
    const newTitles = await TMDB.getMoviesAndTV(page, searchQuery)

    const filteredTitles = filterMovies(newTitles.results)

    dispatch({
      type: 'ADD_TITLES', payload: {
        ...newTitles,
        results: filteredTitles
      }
    })
    setLoading(false)
  }

  const handlePagination = () => {
    fetchTitles(titles.page + 1)
  }

  return (
    <>
      {heroTitle &&
        <Hero
          image={heroTitle.backdrop_path}
          title={heroTitle.title}
          description={heroTitle.overview}
          link={`/title/${heroTitle.media_type}/${heroTitle.id}`}
        />
      }
      <Search setSearch={setSearchQuery} />
      {titles.data &&
        <TitleList
          loadMore={handlePagination}
          hasMore={titles.totalPages > titles.page}
          header={searchQuery ? "Search Results" : "Popular Today"}
          titles={titles.data}
        />
      }
      {loading && <Loader />}
      {!(loading || titles.totalPages > titles.page) && <End />}

    </>
  )
}

export default Home