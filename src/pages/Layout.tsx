import { Outlet } from 'react-router-dom'

const Layout = () => {
    return (
        <div>
            <header className="sticky top-0 flex items-center justify-center bg-primary w-screen text-white z-10">
                <h2 className="m-2 mx-4 font-bold text-2xl">
                    Rick & Morty characters
                </h2>
            </header>

            <main className="max-w-7xl mx-auto p-6">
                <Outlet />
            </main>
        </div>
    )
}

export default Layout
