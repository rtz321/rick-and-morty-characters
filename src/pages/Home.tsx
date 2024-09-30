import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import CharactersList from '../components/CharactersList'
import SearchBar from '../components/SearchBar'
import Spinner from '../assets/Spinner'
import useFetchCharacters from '../hooks/useFetchCharacters'
import useDebounce from '../hooks/useDebounce'
import { getQueryParam, setQueryParams } from '../utils/utils'

const Home = (): JSX.Element => {
    const [searchParams, setSearchParams] = useSearchParams()
    const [keyword, setKeyword] = useState<string>(
        getQueryParam(searchParams, 'keyword')
    )

    const debouncedKeyword = useDebounce(keyword, 300)
    const { characters, loading, error } = useFetchCharacters(debouncedKeyword)

    const handleSearchChange = (newKeyword: string) => {
        setKeyword(newKeyword)
        setQueryParams(setSearchParams, {
            ...(newKeyword && { keyword: newKeyword }),
        })
    }

    return (
        <>
            <SearchBar keyword={keyword} onSearchChange={handleSearchChange} />

            {loading && <Spinner />}

            {error && <p className="text-red-500">{error}</p>}

            {characters.results.length > 0 ? (
                <CharactersList
                    data={characters.results}
                    pageCount={characters.info.pages || 1}
                    pageIndex={Number(getQueryParam(searchParams, 'page')) || 0}
                    keyword={keyword}
                    setPageIndex={(page) =>
                        setQueryParams(setSearchParams, {
                            ...(page > 0 && { page: page.toString() }),
                            ...(keyword && { keyword }),
                        })
                    }
                    totalCount={characters.info.count || 0}
                />
            ) : (
                <p className="text-gray-500 text-center">No characters found</p>
            )}
        </>
    )
}

export default Home
