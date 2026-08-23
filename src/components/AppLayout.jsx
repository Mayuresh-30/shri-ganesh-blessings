import { Outlet } from 'react-router-dom'

function AppLayout() {
  return (
    <div className="min-h-screen bg-[#fff8f0] text-stone-900">
      <main className="mx-auto max-w-5xl px-5 py-8 sm:px-8 sm:py-12">
        <Outlet />
      </main>
    </div>
  )
}

export default AppLayout
