import { render, screen, fireEvent } from '@testing-library/react'
import Character from './Character'

describe('Character Component', () => {
    const character = {
        id: 1,
        name: 'Rick Sanchez',
        status: 'Alive',
        species: 'Human',
        gender: 'Male',
        image: 'http://example.com/rick.png',
        episode: [],
        episodes: [],
    }

    const onNavigateBackMock = jest.fn()

    const renderComponent = () =>
        render(
            <Character
                character={character}
                onNavigateBack={onNavigateBackMock}
            />
        )

    test('renders character details', () => {
        renderComponent()

        expect(screen.getByText(/rick sanchez/i)).toBeInTheDocument()
        expect(screen.getByText(/alive/i)).toBeInTheDocument()
        expect(screen.getByRole('img')).toHaveAttribute('src', character.image)
    })

    test('calls onNavigateBack when button is clicked', () => {
        renderComponent()

        const backButton = screen.getByRole('button', { name: /back/i })
        fireEvent.click(backButton)

        expect(onNavigateBackMock).toHaveBeenCalledTimes(1)
    })
})
