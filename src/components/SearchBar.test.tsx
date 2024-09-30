import { render, screen, fireEvent } from '@testing-library/react'
import SearchBar from './SearchBar'

describe('SearchBar Component', () => {
    const keyword = 'Rick'
    const onSearchChange = jest.fn()

    const renderComponent = () =>
        render(<SearchBar keyword={keyword} onSearchChange={onSearchChange} />)

    test('renders input with correct placeholder and value', () => {
        renderComponent()

        const inputElement = screen.getByPlaceholderText('Search by name')

        expect(inputElement).toBeInTheDocument()
        expect(inputElement).toHaveValue('Rick')
    })

    test('calls onSearchChange when input value changes', () => {
        renderComponent()

        const inputElement = screen.getByPlaceholderText('Search by name')

        fireEvent.change(inputElement, { target: { value: 'Morty' } })
        expect(onSearchChange).toHaveBeenCalledWith('Morty')
    })
})
