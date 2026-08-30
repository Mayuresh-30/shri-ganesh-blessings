import { motion } from 'motion/react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Sparkles } from 'lucide-react'
import { ganeshImages, shuffleImages } from '../data/ganeshImages'

const selectedImageStorageKey = 'shri-ganesh-selected-image'

function WelcomePage() {
  const [name, setName] = useState('')
  const [{ displayedImages, selectedImageId }] = useState(() => {
    const displayedImages = shuffleImages(ganeshImages).slice(0, 4)
    const selectedImage = displayedImages[Math.floor(Math.random() * displayedImages.length)]

    return { displayedImages, selectedImageId: selectedImage.id }
  })
  const navigate = useNavigate()

  function handleSubmit(event) {
    event.preventDefault()
    const trimmedName = name.trim()

    if (!trimmedName) {
      return
    }

    const firstName = trimmedName.split(/\s+/)[0]
    window.sessionStorage.setItem(selectedImageStorageKey, selectedImageId)
    navigate('/ganesh', { state: { name: firstName, ganeshImageId: selectedImageId } })
  }

  return (
    <section className="mx-auto max-w-5xl py-6 text-center sm:py-10">
      <div className="hero-banner-shell">
        <div className="hero-panel-grid">
          {displayedImages.map((image, index) => (
            <motion.div
              key={image.id}
              className="hero-panel"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: index * 0.12, ease: 'easeOut' }}
            >
              <motion.img
                src={image.src}
                alt="Shri Ganesh"
                className="hero-panel-image"
                initial={{ opacity: 0, filter: 'grayscale(1) brightness(0.42) contrast(1.18)' }}
                animate={{ opacity: 0.38, filter: 'grayscale(1) brightness(0.52) contrast(1.18)' }}
                whileHover={{
                  opacity: 1,
                  filter: 'grayscale(0) brightness(1.05) contrast(1.12)',
                }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              />
            </motion.div>
          ))}
        </div>

        <div className="hero-overlay-copy">
          <p className="hero-subtitle">A moment of devotion</p>
          <h1 className="hero-title">Welcome to Shri Ganesh Blessings</h1>
          <p className="hero-description">
            Take a quiet moment to connect with Lord Ganesh and receive a blessing for the path ahead.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mx-auto mt-8 max-w-xl rounded-2xl border border-[#f0b255] bg-[#d75b2a] p-6 text-left shadow-lg shadow-[#4a2b26]/15 sm:mt-10 sm:p-8">
        <div className="flex items-center justify-between border-b border-[#d8a58d] pb-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#f8e4d1]">Your journey</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-[#fffaf5]">Let us know your name</h2>
          </div>
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f3e1c9] text-xl text-[#7a332f]" aria-hidden="true">ॐ</span>
        </div>

        <label htmlFor="name" className="mt-7 block text-sm font-medium text-[#f7e7db]">Your beautiful name</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Enter your name"
          autoComplete="name"
          className="mt-2 w-full rounded-lg border border-[#d8a58d] bg-[#fff8f4] px-4 py-3 text-[#2b1d1b] outline-none transition placeholder:text-[#8b7168] focus:border-[#f0d9c0] focus:ring-2 focus:ring-[#f5d7b8]"
        />
        <motion.button
          type="submit"
          disabled={!name.trim()}
          className="mt-6 w-full rounded-lg bg-[#f4c453] px-5 py-3 text-sm font-semibold text-[#4b220d] transition hover:bg-[#eab73c] focus:outline-none focus:ring-2 focus:ring-[#f9db8f] focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-stone-300 disabled:text-stone-500 disabled:hover:bg-stone-300"
          whileHover={
            !name.trim()
              ? undefined
              : {
                  scale: 1.01,
                  y: -2,
                  boxShadow: '0 16px 28px rgba(95, 45, 36, 0.28)',
                }
          }
          whileTap={
            !name.trim()
              ? undefined
              : {
                  scale: 0.985,
                  y: 0,
                }
          }
          transition={{ type: 'spring', stiffness: 320, damping: 18 }}
        >
          <span className="inline-flex items-center justify-center gap-2">
            <motion.span
              animate={{ rotate: [0, 8, -6, 0] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Sparkles size={17} aria-hidden="true" />
            </motion.span>
            Continue to Shri Ganesh
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ArrowRight size={17} aria-hidden="true" />
            </motion.span>
          </span>
        </motion.button>
      </form>
    </section>
  )
}

export default WelcomePage
