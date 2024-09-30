import type {
    ColumnDef,
    OnChangeFn,
    PaginationState,
    SortingState,
    Updater,
} from '@tanstack/react-table'
import {
    getCoreRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table'
import PaginationControls from './PaginationControls'
import TableBody from './TableBody'
import TableHeader from './TableHeader'

interface TableProps<T> {
    columns: ColumnDef<T, string>[]
    data: T[]
    pageCount: number
    pageIndex: number
    setPageIndex: (pageIndex: number) => void
    totalCount: number
    sorting: SortingState
    setSorting: OnChangeFn<SortingState> | undefined
}

const pageSize = 20

const Table = <T extends { id: number }>({
    data,
    columns,
    pageCount,
    pageIndex,
    setPageIndex,
    setSorting,
    sorting,
    totalCount,
}: TableProps<T>) => {
    const table = useReactTable({
        data,
        columns,
        pageCount,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        manualPagination: true,
        getRowId: (row) => row.id.toString(),
        state: { pagination: { pageIndex, pageSize }, sorting },
        onPaginationChange: (updater: Updater<PaginationState>) => {
            const newState =
                typeof updater === 'function'
                    ? updater({ pageIndex, pageSize })
                    : updater

            setPageIndex(newState.pageIndex)
        },
        onSortingChange: setSorting,
    })

    return (
        <div className="p-2">
            <table className="w-full text-left table-auto min-w-max">
                <TableHeader table={table} />
                <TableBody table={table} />
            </table>
            <PaginationControls
                table={table}
                totalCount={totalCount}
                setPageIndex={setPageIndex}
            />
        </div>
    )
}

export default Table
