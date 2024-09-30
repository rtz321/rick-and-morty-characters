import { useRouteError } from 'react-router-dom'
import { RouteError } from '../types/types'

const ErrorPage = () => {
    const error = useRouteError() as RouteError

    console.error(error)

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
                <h1>Oops!</h1>
                <p>Sorry, an unexpected error has occurred.</p>
                <p>
                    <i>{error?.statusText || error?.message}</i>
                </p>
            </div>
        </div>
    )
}

export default ErrorPage
