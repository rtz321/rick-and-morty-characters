import { LeftArrow } from '../assets/Icons'
import { CharacterWithEpisodes } from '../types/character'
import { clsx } from 'clsx'

type Props = {
    character: CharacterWithEpisodes
    onNavigateBack: () => void
}

const Character = ({ character, onNavigateBack }: Props) => {
    return (
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8 p-0 m-0">
            <div className="flex-shrink-0 mt-2">
                <img
                    src={character.image}
                    alt={character.name}
                    className="max-w-full h-auto"
                />
            </div>

            <div className="flex flex-col justify-start mt-4 flex-grow w-full">
                <>
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-primary font-bold text-2xl">
                            {character.name}
                        </h3>
                        <button
                            onClick={onNavigateBack}
                            className={clsx(
                                'flex items-center justify-center px-5 py-2.5 cursor-pointer',
                                'font-medium text-sm text-gray-900 bg-white border border-gray-300 rounded-lg',
                                'hover:border-gray-500 hover:bg-gray-100',
                                'focus:outline-none focus:ring-4 focus:ring-gray-100'
                            )}
                        >
                            <LeftArrow />
                            Back
                        </button>
                    </div>
                    <div>
                        <span className="font-bold">Status: </span>
                        {character.status}
                    </div>
                    <div>
                        <span className="font-bold">Species: </span>
                        {character.species}
                    </div>
                    <div>
                        <span className="font-bold">Gender: </span>
                        {character.gender}
                    </div>
                </>

                <div className="mt-4">
                    <span className="font-bold">Episodes:</span>
                    <div>
                        {character.episodes.map((episode) => (
                            <div key={episode.id} className="pb-1">
                                <p>
                                    {episode.episode}: {episode.name}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Character
