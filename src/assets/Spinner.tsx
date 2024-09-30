const Spinner = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
        width="150"
        height="150"
        style={{
            shapeRendering: 'auto',
            display: 'block',
            background: 'transparent',
            margin: '0 auto',
        }}
        data-testid="spinner"
    >
        <g>
            {Array.from({ length: 12 }).map((_, index) => (
                <g key={index} transform={`rotate(${index * 30} 50 50)`}>
                    <rect
                        fill="#008481"
                        height="12"
                        width="6"
                        ry="6"
                        rx="3"
                        y="24"
                        x="47"
                    >
                        <animate
                            repeatCount="indefinite"
                            begin={`-${(12 - index) * (1 / 12)}s`}
                            dur="1s"
                            keyTimes="0;1"
                            values="1;0"
                            attributeName="opacity"
                        />
                    </rect>
                </g>
            ))}
        </g>
    </svg>
)

export default Spinner
