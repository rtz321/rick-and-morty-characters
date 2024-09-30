import { render, screen, fireEvent } from '@testing-library/react'
import CharactersList from './CharactersList'
import { MemoryRouter } from 'react-router-dom'
import { Character } from '../types/character'

describe('CharactersList Component', () => {
    const mockSetPageIndex = jest.fn()

    const mockData: Character[] = [
        {
            id: 1,
            name: 'Rick Sanchez',
            species: 'Human',
            status: 'Alive',
            gender: 'Male',
            image: 'https://example.com/rick.png',
            episode: [
                'https://rickandmortyapi.com/api/episode/1',
                'https://rickandmortyapi.com/api/episode/2',
            ],
        },
        {
            id: 2,
            name: 'Morty Smith',
            species: 'Human',
            status: 'Alive',
            gender: 'Male',
            image: 'https://example.com/morty.png',
            episode: [
                'https://rickandmortyapi.com/api/episode/1',
                'https://rickandmortyapi.com/api/episode/2',
            ],
        },
    ]

    const renderComponent = () =>
        render(
            <MemoryRouter>
                <CharactersList
                    data={mockData}
                    pageCount={3}
                    pageIndex={1}
                    keyword="rick"
                    setPageIndex={mockSetPageIndex}
                    totalCount={2}
                />
            </MemoryRouter>
        )

    test('renders table with character data', () => {
        renderComponent()

        expect(screen.getByText('Avatar')).toBeInTheDocument()
        expect(screen.getByText('Name')).toBeInTheDocument()
        expect(screen.getByText('Species')).toBeInTheDocument()
        expect(screen.getByText('Status')).toBeInTheDocument()

        expect(screen.getByText('Rick Sanchez')).toBeInTheDocument()
        expect(screen.getByText('Morty Smith')).toBeInTheDocument()

        const speciesElements = screen.getAllByText('Human')
        expect(speciesElements.length).toBeGreaterThan(0)

        const statusElements = screen.getAllByText('Alive')
        expect(statusElements.length).toBeGreaterThan(0)

        const rickImage = screen.getByAltText('Rick Sanchez')
        const mortyImage = screen.getByAltText('Morty Smith')

        expect(rickImage).toBeInTheDocument()
        expect(mortyImage).toBeInTheDocument()
        expect(rickImage).toHaveAttribute('src', 'https://example.com/rick.png')
        expect(mortyImage).toHaveAttribute(
            'src',
            'https://example.com/morty.png'
        )
    })

    test('renders links with correct URL', () => {
        renderComponent()

        const rickLink = screen.getByText('Rick Sanchez').closest('a')
        expect(rickLink).toHaveAttribute(
            'href',
            '/character/1?page=1&keyword=rick'
        )

        const mortyLink = screen.getByText('Morty Smith').closest('a')
        expect(mortyLink).toHaveAttribute(
            'href',
            '/character/2?page=1&keyword=rick'
        )
    })

    test('calls setPageIndex on pagination change', () => {
        renderComponent()

        fireEvent.click(screen.getByText('Next'))

        expect(mockSetPageIndex).toHaveBeenCalledWith(2)
    })
})
