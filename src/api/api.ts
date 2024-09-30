import { API_URL, EMPTY_CHARACTERS_OBJ } from '../utils/constants'

export const fetchCharacters = async (keyword: string, pageIndex: number) => {
    const response = await fetch(
        `${API_URL}/character/?name=${keyword}&page=${pageIndex}`
    )

    if (!response.ok) {
        if (response.status === 404) {
            return EMPTY_CHARACTERS_OBJ
        }
        throw new Error('Failed to fetch characters')
    }

    return await response.json()
}

export const fetchCharacterById = async (characterId: string) => {
    const response = await fetch(`${API_URL}/character/${characterId}`)

    if (!response.ok) {
        if (response.status === 404) {
            return []
        }
        throw new Error('Failed to fetch character')
    }

    return await response.json()
}

export const fetchEpisodesByIds = async (episodeIds: string[]) => {
    const response = await fetch(`${API_URL}/episode/${episodeIds.join(',')}`)

    if (!response.ok) {
        throw new Error('Failed to fetch episodes')
    }

    return await response.json()
}
