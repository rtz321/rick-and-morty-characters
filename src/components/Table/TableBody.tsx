import { flexRender, Table } from '@tanstack/react-table'
import { clsx } from 'clsx'

const TableBody = <T extends { id: number }>({
    table,
}: {
    table: Table<T>
}) => (
    <tbody>
        {table.getRowModel().rows.map((row) => (
            <tr
                key={row.id}
                className="hover:bg-slate-50 border-b border-slate-200"
            >
                {row.getVisibleCells().map((cell) => (
                    <td
                        key={cell.id}
                        className={clsx(
                            'px-4 py-1',
                            cell.column.id === 'image' ? 'w-16' : 'w-auto'
                        )}
                    >
                        <p className="block font-semibold text-sm text-slate-800">
                            {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                            )}
                        </p>
                    </td>
                ))}
            </tr>
        ))}
    </tbody>
)

export default TableBody
