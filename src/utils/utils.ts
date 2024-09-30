import { SetURLSearchParams } from 'react-router-dom'

export const getQueryParam = (
    searchParams: URLSearchParams,
    key: string
): string => {
    return searchParams.get(key) || ''
}

export const setQueryParams = (
    setSearchParams: SetURLSearchParams,
    params: Record<string, string | number>
): void => {
    const newParams = new URLSearchParams()
    Object.entries(params).forEach(([key, value]) => {
        newParams.set(key, value.toString())
    })
    setSearchParams(newParams)
}

export const extractEpisodeIds = (episodeUrls: string[]): string[] => {
    return episodeUrls.map((url: string) => url.split('/').pop() || '')
}

export const createLinkParams = (
    urlPart: string,
    pageIndex: number,
    keyword: string
): string => {
    let link = urlPart

    if (pageIndex > 0) {
        link += '?page=' + pageIndex
    }

    if (keyword) {
        link += (pageIndex > 0 ? '&' : '?') + 'keyword=' + keyword
    }

    return link
}
