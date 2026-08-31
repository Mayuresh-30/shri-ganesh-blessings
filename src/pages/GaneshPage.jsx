import { motion } from 'motion/react'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { getGaneshImage } from '../data/ganeshImages'

const selectedImageStorageKey = 'shri-ganesh-selected-image'
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
  const ganeshImage = getGaneshImage(state?.ganeshImageId || window.sessionStorage.getItem(selectedImageStorageKey))
  const [wish, setWish] = useState('')
  const [shower, setShower] = useState([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [offeredFlowers, setOfferedFlowers] = useState([])

  const isBlessable = offeredFlowers.length === flowers.length

  function releaseFlowers(flower) {
    const burstId = `${Date.now()}-${Math.random()}`
    setShower((currentShower) => [...currentShower, ...createShower([flower], burstId)])

    window.setTimeout(() => {
      setShower((currentShower) => currentShower.filter(({ burstId: currentBurstId }) => currentBurstId !== burstId))
    }, 4500)

    setOfferedFlowers((currentOfferedFlowers) => {
      if (currentOfferedFlowers.includes(flower)) {
        return currentOfferedFlowers
      }

      return [...currentOfferedFlowers, flower]
    })
  }

  async function handleBlessing(event) {
    event.preventDefault()
    const trimmedWish = wish.trim()

    if (isSubmitting) {
      return
    }

    if (!trimmedWish) {
      window.alert('Please enter a wish before receiving your blessing.')
      return
    }

    setIsSubmitting(true)

    try {
      const result = await fetch('/api/blessings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userName: state?.name || '',
          userWish: trimmedWish,
          ganeshName: ganeshImage.id,
        }),
      })
      const data = await result.json()

      if (!result.ok) {
        throw new Error(data.error || 'Unable to receive blessing')
      }

      navigate('/blessings', {
        state: {
          name: state?.name || '',
          wish: trimmedWish,
          ganeshImageId: ganeshImage.id,
          bappaResponse: data.message,
        },
      })
    } catch (error) {
      window.alert(error.message || 'Unable to receive blessing. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="mx-auto max-w-3xl text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#8c4d3a]">The remover of obstacles</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-[#2f2421] sm:text-5xl">
          {state?.name ? `Welcome, ${state.name}.` : 'Welcome, devotee.'}
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-lg leading-8 text-[#5b433d]">Offer a flower, share your wish, and receive a blessing.</p>
      </motion.div>

      <motion.div
        className="ganesh-card relative mt-10 overflow-hidden rounded-[2rem] p-4 shadow-xl shadow-[#4a2b26]/10 sm:p-7"
        initial={{ opacity: 0, y: 28, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.18, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <motion.div
          className="ganesh-image-stage relative flex min-h-[280px] items-center justify-center overflow-hidden rounded-2xl text-7xl text-[#9f2f18] sm:min-h-[340px] sm:text-9xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.1, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <img src={ganeshImage.src} alt="Shri Ganesh" className="h-full max-h-[320px] w-full object-contain" />
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
        </motion.div>

        <form onSubmit={handleBlessing} className="mt-6 text-left">
          <label htmlFor="wish" className="block text-sm font-medium text-[#5e3c36]">Your wish</label>
          <textarea
            id="wish"
            value={wish}
            onChange={(event) => setWish(event.target.value)}
            placeholder="Enter your wish"
            rows="3"
            className="mt-2 w-full resize-none rounded-xl border border-[#dcc2a3] bg-[#fffdfa] px-4 py-3 text-[#2b1d1b] outline-none transition placeholder:text-[#8b7168] focus:border-[#8c4d3a] focus:ring-2 focus:ring-[#e7d2bc]"
          />

          <div className="mt-5 flex items-center justify-center gap-3" aria-label="Offer a flower">
            {flowers.map((flower) => (
              <button
                key={flower}
                type="button"
                onClick={() => releaseFlowers(flower)}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-[#e4c9a7] bg-[#fffaf5] text-2xl shadow-sm transition hover:-translate-y-1 hover:border-[#a7543f] hover:bg-[#fdf0e3] focus:outline-none focus:ring-2 focus:ring-[#d8a862] focus:ring-offset-2"
                aria-label={`Offer ${flower}`}
              >
                <span aria-hidden="true">{flower}</span>
              </button>
            ))}
          </div>

          <p className="mt-3 text-center text-sm font-medium text-[#7a5749]">
            {isBlessable ? 'All flowers are offered. Bappa is ready to bless you.' : `Offer all ${flowers.length} flowers to unlock the blessing.`}
          </p>

          <button
            type="submit"
            disabled={isSubmitting || !isBlessable}
            className="mt-7 w-full rounded-xl bg-[#d75b2a] px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-[#c5501e] focus:outline-none focus:ring-2 focus:ring-[#f4c453] focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-[#c7a18b]"
          >
            <span className="inline-flex items-center justify-center gap-2">
              Receive my blessing
              <ArrowRight size={17} aria-hidden="true" />
            </span>
          </button>
        </form>
      </motion.div>
    </section>
  )
}
export default GaneshPage
