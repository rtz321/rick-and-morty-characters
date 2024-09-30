import { flexRender, Table } from '@tanstack/react-table'
import { DownArrow, UpArrow } from '../../assets/Icons'
import { clsx } from 'clsx'

const TableHeader = <T extends { id: number }>({
    table,
}: {
    table: Table<T>
}) => (
    <thead>
        {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                    const sorting = header.column.getIsSorted()

                    return (
                        <th
                            key={header.id}
                            className={clsx(
                                'p-4 border-b border-slate-200 bg-slate-50',
                                {
                                    'cursor-pointer select-none':
                                        header.column.getCanSort(),
                                }
                            )}
                            onClick={header.column.getToggleSortingHandler()}
                        >
                            <div className="flex items-center">
                                {flexRender(
                                    header.column.columnDef.header,
                                    header.getContext()
                                )}
                                {sorting === 'asc' ? (
                                    <UpArrow />
                                ) : sorting === 'desc' ? (
                                    <DownArrow />
                                ) : null}
                            </div>
                        </th>
                    )
                })}
            </tr>
        ))}
    </thead>
)
export default TableHeader
