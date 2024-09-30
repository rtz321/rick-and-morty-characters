import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Home from './Home'
import useFetchCharacters from '../hooks/useFetchCharacters'
import { EMPTY_CHARACTERS_OBJ } from '../utils/constants'

jest.mock('../hooks/useFetchCharacters')

describe('Home Component', () => {
    const renderComponent = () =>
        render(
            <MemoryRouter>
                <Home />
            </MemoryRouter>
        )

    beforeEach(() => {
        ;(useFetchCharacters as jest.Mock).mockReturnValue({
            characters: EMPTY_CHARACTERS_OBJ,
            loading: false,
            error: null,
        })
    })

    test('renders search bar', () => {
        renderComponent()

        expect(screen.getByPlaceholderText(/search/i)).toBeInTheDocument()
    })

    test('displays no characters found message', () => {
        renderComponent()

        expect(screen.getByText(/no characters found/i)).toBeInTheDocument()
    })

    test('handles search input', async () => {
        ;(useFetchCharacters as jest.Mock).mockReturnValue({
            characters: {
                results: [{ id: 1, name: 'Rick Sanchez' }],
                info: { pages: 1, count: 1 },
            },
            loading: false,
            error: null,
        })

        renderComponent()

        const searchInput = screen.getByPlaceholderText(
            /search/i
        ) as HTMLInputElement
        fireEvent.change(searchInput, { target: { value: 'Rick' } })
        await waitFor(() => expect(searchInput.value).toBe('Rick'))

        expect(screen.getByText(/rick sanchez/i)).toBeInTheDocument()
    })
})
