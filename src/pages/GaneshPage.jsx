import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

const ganeshRepresentations = ['Ganapati', 'Vighnaharta', 'Ekadanta', 'Gajanana']
const flowers = ['🌼', '🌸', '🌺', '🌻']

function createShower(flowersToRelease, burstId) {
  return Array.from({ length: 30 }, (_, index) => ({
    id: `${burstId}-${index}`,
    burstId,
    flower: flowersToRelease[index % flowersToRelease.length],
    left: `${8 + Math.random() * 84}%`,
    delay: `${Math.random() * 0.7}s`,
    duration: `${1.8 + Math.random() * 1.4}s`,
  }))
}

function GaneshPage() {
  const { state } = useLocation()
  const navigate = useNavigate()
  const [wish, setWish] = useState('')
  const [shower, setShower] = useState([])
  const [ganeshName] = useState(() => ganeshRepresentations[Math.floor(Math.random() * ganeshRepresentations.length)])

  function releaseFlowers(flower) {
    const burstId = `${Date.now()}-${Math.random()}`
    setShower((currentShower) => [...currentShower, ...createShower([flower], burstId)])

    window.setTimeout(() => {
      setShower((currentShower) => currentShower.filter(({ burstId: currentBurstId }) => currentBurstId !== burstId))
    }, 4500)
  }

  function handleBlessing(event) {
    event.preventDefault()
    const trimmedWish = wish.trim()

    if (!trimmedWish) {
      window.alert('Please enter a wish before receiving your blessing.')
      return
    }

    navigate('/blessings', {
      state: { name: state?.name || '', wish: trimmedWish, ganeshName },
    })
  }

  return (
    <section className="mx-auto max-w-3xl text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-600">The remover of obstacles</p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight text-stone-950 sm:text-5xl">
        {state?.name ? `Welcome, ${state.name}.` : 'Welcome, devotee.'}
      </h1>
      <p className="mx-auto mt-4 max-w-xl text-lg leading-8 text-stone-600">Offer a flower, share your wish, and receive a blessing.</p>

      <div className="relative mt-10 overflow-hidden rounded-[2rem] border border-orange-200 bg-[#fff3df] p-4 shadow-xl shadow-orange-950/10 sm:p-7">
        <div className="relative flex min-h-[280px] items-center justify-center overflow-hidden rounded-2xl bg-[#f3d4a4] text-7xl text-[#9f2f18] sm:min-h-[340px] sm:text-9xl">
          <span className="select-none" aria-label={`Placeholder for ${ganeshName} image`}>ॐ</span>
          {shower.map(({ id, flower, left, delay, duration }) => (
            <span
              key={id}
              className="pointer-events-none absolute top-0 text-2xl flower-fall sm:text-3xl"
              style={{ left, animationDelay: delay, animationDuration: duration }}
              aria-hidden="true"
            >
              {flower}
            </span>
          ))}
        </div>

        <form onSubmit={handleBlessing} className="mt-6 text-left">
          <label htmlFor="wish" className="block text-sm font-medium text-stone-700">Your wish</label>
          <textarea
            id="wish"
            value={wish}
            onChange={(event) => setWish(event.target.value)}
            placeholder="Enter your wish"
            rows="3"
            className="mt-2 w-full resize-none rounded-xl border border-orange-200 bg-white px-4 py-3 text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
          />

          <div className="mt-5 flex items-center justify-center gap-3" aria-label="Offer a flower">
            {flowers.map((flower) => (
              <button
                key={flower}
                type="button"
                onClick={() => releaseFlowers(flower)}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-orange-200 bg-white text-2xl shadow-sm transition hover:-translate-y-1 hover:border-orange-400 hover:bg-orange-50 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2"
                aria-label={`Offer ${flower}`}
              >
                <span aria-hidden="true">{flower}</span>
              </button>
            ))}
          </div>

          <button
            type="submit"
            className="mt-7 w-full rounded-xl bg-[#9f2f18] px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-[#842512] focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
          >
            <span className="inline-flex items-center justify-center gap-2">
              Receive my blessing
              <ArrowRight size={17} aria-hidden="true" />
            </span>
          </button>
        </form>
      </div>
    </section>
  )
}
export default GaneshPage
