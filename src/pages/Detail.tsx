import { useLocation, useNavigate, useParams } from 'react-router-dom'
import Spinner from '../assets/Spinner'
import Character from '../components/Character'
import useFetchCharacterWithEpisodes from '../hooks/useFetchCharacterWithEpisodes'
import { createLinkParams } from '../utils/utils'

const Detail = () => {
    const { characterId } = useParams<{ characterId: string }>()

    const { character, loading, error } =
        useFetchCharacterWithEpisodes(characterId)

    const navigate = useNavigate()
    const location = useLocation()

    const queryParams = new URLSearchParams(location.search)
    const pageIndex = Number(queryParams.get('page')) || 0
    const keyword = queryParams.get('keyword') || ''

    const handleNavigateBack = () => {
        navigate(createLinkParams('/', pageIndex, keyword))
    }

    if (loading) {
        return <Spinner />
    }

    if (!character) {
        return <p className="text-gray-500 text-center">Character not found</p>
    }

    if (error) {
        return <p className="text-red-500">{error}</p>
    }

    return (
        <Character character={character} onNavigateBack={handleNavigateBack} />
    )
}

export default Detail
