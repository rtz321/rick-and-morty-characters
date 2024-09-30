import { useState, useEffect, useCallback } from 'react'
import { fetchCharacters } from '../api/api'
import { useSearchParams } from 'react-router-dom'
import { ApiData } from '../types/types'
import { Character } from '../types/character'
import { EMPTY_CHARACTERS_OBJ } from '../utils/constants'

const useFetchCharacters = (keyword: string) => {
    const [characters, setCharacters] =
        useState<ApiData<Character>>(EMPTY_CHARACTERS_OBJ)
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const [searchParams] = useSearchParams()
    const pageIndex = Number(searchParams.get('page')) || 0

    const fetchAndLoadCharacters = useCallback(async () => {
        setLoading(true)
        setError(null)

        try {
            const data = await fetchCharacters(keyword, pageIndex + 1)
            setCharacters(data)
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : 'An unknown error occurred.'
            )
        } finally {
            setLoading(false)
        }
    }, [keyword, pageIndex])

    useEffect(() => {
        fetchAndLoadCharacters()
    }, [fetchAndLoadCharacters])

    return { characters, loading, error }
}

export default useFetchCharacters
