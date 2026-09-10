import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <section className="mx-auto max-w-2xl rounded-2xl border border-orange-100 bg-white p-8 shadow-sm sm:p-12">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-600">404</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">This page is not here.</h1>
      <p className="mt-4 max-w-lg text-stone-600">
        Return to the welcome page and continue your journey.
      </p>
      <Link
        to="/"
        className="mt-8 inline-flex rounded-lg bg-orange-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
      >
        Back to welcome
      </Link>
    </section>
  )
}

export default NotFoundPage
