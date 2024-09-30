import { clsx } from 'clsx'

interface SearchBarProps {
    keyword: string
    onSearchChange: (keyword: string) => void
}

const SearchBar = ({
    keyword,
    onSearchChange,
}: SearchBarProps): JSX.Element => {
    return (
        <div className="w-full flex justify-between items-center mb-3 mt-1 p-2">
            <input
                name="search"
                value={keyword}
                placeholder="Search by name"
                onChange={(e) => onSearchChange(e.target.value)}
                className={clsx(
                    'max-w-[350px] pr-11 h-10 pl-3 py-2 bg-transparent placeholder:text-slate-400 border border-slate-200 rounded text-slate-700 text-sm',
                    'transition duration-200 ease focus:outline-none focus:border-slate-400 focus:shadow-md ml-auto hover:border-slate-400 shadow-sm'
                )}
            />
        </div>
    )
}

export default SearchBar
