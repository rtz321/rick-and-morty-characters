interface Info {
    count: number
    pages: number
}

export interface ApiData<T> {
    info: Info
    results: T[]
}

export interface RouteError {
    statusText?: string
    message?: string
}
