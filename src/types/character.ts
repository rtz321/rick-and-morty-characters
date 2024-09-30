import { Episode } from './episode'

export interface Character {
    id: number
    name: string
    status: string
    species: string
    gender: string
    image: string
    episode: string[]
}

export interface CharacterWithEpisodes extends Character {
    episodes: Episode[]
}
