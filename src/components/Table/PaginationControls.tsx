import { Table } from '@tanstack/react-table'
import {
    DoubleLeftArrow,
    DoubleRightArrow,
    LeftArrow,
    RightArrow,
} from '../../assets/Icons'
import PaginationButton from './PaginationButton'

interface PaginationControlsProps<T> {
    table: Table<T>
    totalCount: number
    setPageIndex: (pageIndex: number) => void
}

const PaginationControls = <T extends { id: number }>({
    table,
    totalCount,
    setPageIndex,
}: PaginationControlsProps<T>) => (
    <div className="flex justify-between items-center px-4 py-3">
        <div className="text-sm text-slate-500 flex items-center">
            Showing{' '}
            <b className="mx-1">
                {table.getRowModel().rows.length.toLocaleString()}
            </b>
            of <b className="mx-1">{totalCount.toLocaleString()}</b> characters
        </div>

        <div className="flex items-center space-x-2 ml-auto">
            <PaginationButton
                onClick={() => setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
                icon={<DoubleLeftArrow />}
                iconPosition="left"
                label="First"
            />
            <PaginationButton
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                icon={<LeftArrow />}
                iconPosition="left"
                label="Previous"
            />
            <span className="flex items-center">
                Page{' '}
                <strong className="mx-1">
                    {table.getState().pagination.pageIndex + 1} of{' '}
                    {table.getPageCount()}
                </strong>
            </span>
            <PaginationButton
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                icon={<RightArrow />}
                iconPosition="right"
                label="Next"
            />
            <PaginationButton
                onClick={() => setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
                icon={<DoubleRightArrow />}
                iconPosition="right"
                label="Last"
            />
        </div>
    </div>
)

export default PaginationControls
