import { render, screen, fireEvent } from '@testing-library/react'
import { ColumnDef } from '@tanstack/react-table'
import Table from './Table'
import { Character } from '../../types/character'

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

const mockColumns: ColumnDef<(typeof mockData)[0], string>[] = [
    {
        accessorKey: 'image',
        header: 'Avatar',
        cell: ({ row }) => (
            <img
                src={row.original.image}
                alt={row.original.name}
                className="w-16 h-16"
            />
        ),
    },
    { accessorKey: 'name', header: 'Name' },
    { accessorKey: 'species', header: 'Species' },
    { accessorKey: 'status', header: 'Status' },
]

const mockSetPageIndex = jest.fn()
const mockSetSorting = jest.fn()

describe('Table Component', () => {
    const renderComponent = () =>
        render(
            <Table
                data={mockData}
                columns={mockColumns}
                pageCount={2}
                pageIndex={0}
                setPageIndex={mockSetPageIndex}
                totalCount={2}
                sorting={[]}
                setSorting={mockSetSorting}
            />
        )

    test('renders table with correct headers and data', () => {
        renderComponent()

        expect(screen.getByText('Avatar')).toBeInTheDocument()
        expect(screen.getByText('Name')).toBeInTheDocument()
        expect(screen.getByText('Species')).toBeInTheDocument()
        expect(screen.getByText('Status')).toBeInTheDocument()

        expect(screen.getByText('Rick Sanchez')).toBeInTheDocument()
        expect(screen.getByText('Morty Smith')).toBeInTheDocument()
        expect(screen.getAllByText('Human')).toHaveLength(2)
        expect(screen.getAllByText('Alive')).toHaveLength(2)

        const rickImage = screen.getByRole('img', { name: 'Rick Sanchez' })
        const mortyImage = screen.getByRole('img', { name: 'Morty Smith' })

        expect(rickImage).toBeInTheDocument()
        expect(mortyImage).toBeInTheDocument()
        expect(rickImage).toHaveAttribute('src', 'https://example.com/rick.png')
        expect(mortyImage).toHaveAttribute(
            'src',
            'https://example.com/morty.png'
        )
    })

    test('calls setPageIndex when pagination controls are used', () => {
        renderComponent()

        const nextPageButton = screen.getByText('Next')
        fireEvent.click(nextPageButton)

        expect(mockSetPageIndex).toHaveBeenCalledWith(1)
    })

    test('calls setSorting when column header is clicked for sorting', () => {
        renderComponent()

        const nameHeader = screen.getByText('Name')
        fireEvent.click(nameHeader)

        expect(mockSetSorting).toHaveBeenCalled()
    })
})
