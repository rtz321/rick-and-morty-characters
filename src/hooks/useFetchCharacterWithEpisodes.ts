import { useEffect, useState } from 'react'
import { fetchCharacterById, fetchEpisodesByIds } from '../api/api'
import { CharacterWithEpisodes } from '../types/character'
import { extractEpisodeIds } from '../utils/utils'

const useFetchCharacterWithEpisodes = (characterId: string | undefined) => {
    const [character, setCharacter] = useState<
        CharacterWithEpisodes | undefined
    >()
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            if (characterId) {
                try {
                    setLoading(true)
                    setError(null)

                    const characterData = await fetchCharacterById(characterId)
                    const episodeIds = extractEpisodeIds(characterData.episode)
                    const episodesData = await fetchEpisodesByIds(episodeIds)

                    setCharacter({
                        ...characterData,
                        episodes: Array.isArray(episodesData)
                            ? episodesData
                            : [episodesData],
                    })
                } catch (error) {
                    console.error('Error fetching data:', error)
                    setError('Failed to fetch data')
                } finally {
                    setLoading(false)
                }
            }
        }

        fetchData()
    }, [characterId])

    return { character, loading, error }
}

export default useFetchCharacterWithEpisodes
