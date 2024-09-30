import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import ErrorPage from './ErrorPage'
import { useRouteError } from 'react-router-dom'

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useRouteError: jest.fn(),
}))

describe('ErrorPage Component', () => {
    let consoleErrorSpy: jest.SpyInstance

    beforeEach(() => {
        consoleErrorSpy = jest
            .spyOn(console, 'error')
            .mockImplementation(() => {})
    })

    afterEach(() => {
        consoleErrorSpy.mockRestore()
    })

    test('renders error message', () => {
        const mockError = {
            statusText: 'Not Found',
            message: 'The page you are looking for does not exist.',
        }

        ;(useRouteError as jest.Mock).mockReturnValue(mockError)

        render(
            <MemoryRouter initialEntries={['/non-existent-route']}>
                <ErrorPage />
            </MemoryRouter>
        )

        expect(screen.getByText(/oops/i)).toBeInTheDocument()

        expect(
            screen.getByText(/sorry, an unexpected error has occurred/i)
        ).toBeInTheDocument()

        expect(screen.getByText(/not found/i)).toBeInTheDocument()
    })
})
