import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Layout'
import Home from './Home'
import Detail from './Detail'
import ErrorPage from './ErrorPage'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
            { index: true, element: <Home /> },
            { path: 'character/:characterId', element: <Detail /> },
        ],
    },
])

const App = (): JSX.Element => {
    return <RouterProvider router={router} />
}

export default App
