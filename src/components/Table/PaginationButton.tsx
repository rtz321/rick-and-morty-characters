import { clsx } from 'clsx'

interface PaginationButtonProps {
    onClick: () => void
    disabled: boolean
    icon: JSX.Element
    label: string
    iconPosition: 'left' | 'right'
}

const PaginationButton = ({
    onClick,
    disabled,
    icon,
    label,
    iconPosition,
}: PaginationButtonProps) => (
    <button
        className={clsx(
            'flex items-center justify-center px-3 py-1 cursor-pointer',
            'text-gray-900 bg-white border border-gray-300 font-medium rounded-lg text-sm',
            'hover:border-gray-500 hover:bg-gray-100',
            'focus:outline-none focus:ring-4 focus:ring-gray-100',
            'disabled:bg-gray-200 disabled:cursor-auto'
        )}
        onClick={onClick}
        disabled={disabled}
    >
        {iconPosition === 'left' && icon}
        {label}
        {iconPosition === 'right' && icon}
    </button>
)

export default PaginationButton
