import { SortingState, createColumnHelper } from '@tanstack/react-table'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Table from './Table/Table'
import { Character } from '../types/character'
import { createLinkParams } from '../utils/utils'

interface CharactersListProps {
    data: Character[]
    pageCount: number
    pageIndex: number
    keyword: string
    setPageIndex: (pageIndex: number) => void
    totalCount: number
}

const columnHelper = createColumnHelper<Character>()

const CharactersList = ({
    data,
    pageCount,
    pageIndex,
    keyword,
    setPageIndex,
    totalCount,
}: CharactersListProps): JSX.Element => {
    const [sorting, setSorting] = useState<SortingState>([])

    const columns = useMemo(
        () => [
            columnHelper.accessor('image', {
                header: 'Avatar',
                cell: ({ row, getValue }) => (
                    <img
                        src={getValue()}
                        alt={row.original.name}
                        width={50}
                        height={50}
                    />
                ),
                enableSorting: false,
            }),
            columnHelper.accessor('name', {
                header: 'Name',
                cell: ({ row }) => (
                    <Link
                        to={createLinkParams(
                            `/character/${row.original.id}`,
                            pageIndex,
                            keyword
                        )}
                        className="font-bold text-primary hover:text-primaryHover hover:underline"
                    >
                        {row.original.name}
                    </Link>
                ),
                enableSorting: true,
            }),
            columnHelper.accessor('species', {
                header: 'Species',
                enableSorting: true,
            }),
            columnHelper.accessor('status', {
                header: 'Status',
                enableSorting: true,
            }),
        ],
        [pageIndex, keyword]
    )

    return (
        <Table
            columns={columns}
            data={data}
            pageCount={pageCount}
            pageIndex={pageIndex}
            setPageIndex={setPageIndex}
            totalCount={totalCount}
            sorting={sorting}
            setSorting={setSorting}
        />
    )
}

export default CharactersList
