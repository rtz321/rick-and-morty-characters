import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Detail from './Detail'
import useFetchCharacterWithEpisodes from '../hooks/useFetchCharacterWithEpisodes'

jest.mock('../hooks/useFetchCharacterWithEpisodes')

describe('Detail Component', () => {
    const renderComponent = () =>
        render(
            <MemoryRouter initialEntries={['/character/1']}>
                <Detail />
            </MemoryRouter>
        )

    beforeEach(() => {
        ;(useFetchCharacterWithEpisodes as jest.Mock).mockReturnValue({
            character: undefined,
            loading: false,
            error: null,
        })
    })

    test('renders loading spinner', () => {
        ;(useFetchCharacterWithEpisodes as jest.Mock).mockReturnValue({
            character: undefined,
            loading: true,
            error: null,
        })

        renderComponent()

        expect(screen.getByTestId('spinner')).toBeInTheDocument()
    })

    test('displays character not found message', () => {
        renderComponent()

        expect(screen.getByText(/character not found/i)).toBeInTheDocument()
    })
})
