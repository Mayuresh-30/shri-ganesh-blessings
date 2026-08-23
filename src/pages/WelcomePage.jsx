import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Sparkles } from 'lucide-react'

function WelcomePage() {
  const [name, setName] = useState('')
  const navigate = useNavigate()

  function handleSubmit(event) {
    event.preventDefault()
    const trimmedName = name.trim()

    if (!trimmedName) {
      return
    }

    const firstName = trimmedName.split(/\s+/)[0]
    navigate('/ganesh', { state: { name: firstName } })
  }

  return (
    <section className="mx-auto max-w-3xl py-6 text-center sm:py-10">
      <div className="relative overflow-hidden rounded-[2rem] bg-[#9f2f18] px-6 py-14 text-orange-50 shadow-xl shadow-orange-950/10 sm:px-12 sm:py-20">
        <div className="absolute -right-16 -top-20 h-52 w-52 rounded-full border border-orange-200/20" aria-hidden="true" />
        <div className="absolute -bottom-28 -left-16 h-64 w-64 rounded-full border border-orange-200/20" aria-hidden="true" />
        <p className="relative text-sm font-semibold uppercase tracking-[0.28em] text-orange-200">A moment of devotion</p>
        <h1 className="relative mt-5 text-4xl font-semibold tracking-tight sm:text-6xl">Welcome to Shri Ganesh Blessings</h1>
        <p className="relative mx-auto mt-5 max-w-xl text-base leading-7 text-orange-100 sm:text-lg">
          Take a quiet moment to connect with Lord Ganesha and receive a blessing for the path ahead.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mx-auto mt-8 max-w-xl rounded-2xl border border-orange-100 bg-white p-6 text-left shadow-lg shadow-orange-950/5 sm:mt-10 sm:p-8">
        <div className="flex items-center justify-between border-b border-orange-100 pb-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-600">Your journey</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-stone-950">Let us know your name</h2>
          </div>
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 text-xl text-orange-700" aria-hidden="true">ॐ</span>
        </div>

        <label htmlFor="name" className="mt-7 block text-sm font-medium text-stone-700">Your beautiful name</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Enter your name"
          autoComplete="name"
          className="mt-2 w-full rounded-lg border border-stone-200 bg-[#fffdfa] px-4 py-3 text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
        />
        <button
          type="submit"
          disabled={!name.trim()}
          className="mt-6 w-full rounded-lg bg-orange-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-stone-300 disabled:text-stone-500 disabled:hover:bg-stone-300"
        >
          <span className="inline-flex items-center justify-center gap-2">
            <Sparkles size={17} aria-hidden="true" />
            Continue to Shri Ganesh
            <ArrowRight size={17} aria-hidden="true" />
          </span>
        </button>
      </form>
    </section>
  )
}

export default WelcomePage
