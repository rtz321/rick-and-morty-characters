import {
    createLinkParams,
    extractEpisodeIds,
    getQueryParam,
    setQueryParams,
} from './utils'

describe('getQueryParam', () => {
    it('returns the value of the query parameter if it exists', () => {
        const searchParams = new URLSearchParams('page=1&keyword=test')
        expect(getQueryParam(searchParams, 'page')).toBe('1')
        expect(getQueryParam(searchParams, 'keyword')).toBe('test')
    })

    it('returns an empty string if the query parameter does not exist', () => {
        const searchParams = new URLSearchParams('page=1')
        expect(getQueryParam(searchParams, 'keyword')).toBe('')
    })
})

describe('setQueryParams', () => {
    it('sets the query parameters correctly', () => {
        const setSearchParams = jest.fn()
        const params = { page: 2, keyword: 'test' }

        setQueryParams(setSearchParams, params)

        expect(setSearchParams).toHaveBeenCalledTimes(1)
        expect(setSearchParams).toHaveBeenCalledWith(
            expect.any(URLSearchParams)
        )

        const newParams = setSearchParams.mock.calls[0][0]
        expect(newParams.get('page')).toBe('2')
        expect(newParams.get('keyword')).toBe('test')
    })
})

describe('extractEpisodeIds', () => {
    it('returns an array of episode ids extracted from URLs', () => {
        const urls = [
            'https://rickandmortyapi.com/api/episode/1',
            'https://rickandmortyapi.com/api/episode/2',
        ]
        const result = extractEpisodeIds(urls)
        expect(result).toEqual(['1', '2'])
    })

    it('handles empty URLs correctly', () => {
        const urls = ['']
        const result = extractEpisodeIds(urls)
        expect(result).toEqual([''])
    })
})

describe('createLinkParams', () => {
    it('creates a link with page index and keyword', () => {
        const link = createLinkParams('/characters', 1, 'test')
        expect(link).toBe('/characters?page=1&keyword=test')
    })

    it('creates a link with only page index', () => {
        const link = createLinkParams('/characters', 2, '')
        expect(link).toBe('/characters?page=2')
    })

    it('creates a link with only keyword', () => {
        const link = createLinkParams('/characters', 0, 'test')
        expect(link).toBe('/characters?keyword=test')
    })

    it('creates a link with no parameters', () => {
        const link = createLinkParams('/characters', 0, '')
        expect(link).toBe('/characters')
    })
})
