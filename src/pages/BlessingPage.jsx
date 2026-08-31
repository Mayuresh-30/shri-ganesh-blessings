import { motion } from 'motion/react'
import { useLocation } from 'react-router-dom'
import { MessageCircle, Share2 } from 'lucide-react'
import { getGaneshImage } from '../data/ganeshImages'

const selectedImageStorageKey = 'shri-ganesh-selected-image'

function BlessingPage() {
  const { state } = useLocation()
  const bappaResponse = state?.bappaResponse || 'Your blessing is being prepared.'
  const ganeshImage = getGaneshImage(state?.ganeshImageId || window.sessionStorage.getItem(selectedImageStorageKey))
  const shareUrl = `${window.location.origin}/`
  const shareText = `I just received a divine blessing from Shri Ganesh. ${bappaResponse} Share the blessings with your family and friends.`

  function openShareWindow(url) {
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  async function shareWithFallback({ text, url, fallbackUrl }) {
    const shareData = {
      title: 'Shri Ganesh Blessings',
      text,
      url,
    }

    try {
      if (navigator.share) {
        await navigator.share(shareData)
        return
      }

      if (navigator.clipboard) {
        await navigator.clipboard.writeText(`${text} ${url}`)
        window.alert('Share message copied to clipboard. Paste it into your social app.')
      }

      if (fallbackUrl) {
        openShareWindow(fallbackUrl)
      }
    } catch (error) {
      if (fallbackUrl) {
        openShareWindow(fallbackUrl)
      }
    }
  }

  function shareOnWhatsApp() {
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`
    openShareWindow(whatsappUrl)
  }

  function shareOnFacebook() {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`
    openShareWindow(facebookUrl)
  }

  async function shareOnInstagram() {
    await shareWithFallback({
      text: shareText,
      url: shareUrl,
      fallbackUrl: 'https://www.instagram.com/',
    })
  }

  return (
    <section className="mx-auto max-w-3xl text-center">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-600">Your blessing</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-stone-950 sm:text-5xl">
          {state?.name ? `A message for ${state.name}` : 'A message from Bappa'}
        </h1>
      </motion.div>

      <motion.div
        className="mt-10 overflow-hidden rounded-[2rem] border border-orange-200 bg-[#fff3df] p-4 shadow-xl shadow-orange-950/10 sm:p-7"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.18, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <motion.div
          className="ganesh-image-stage flex min-h-[260px] items-center justify-center overflow-hidden rounded-2xl text-8xl text-[#9f2f18] sm:min-h-[340px] sm:text-9xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.1, delay: 0.42, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <img src={ganeshImage.src} alt="Shri Ganesh" className="h-full max-h-[320px] w-full object-contain" />
        </motion.div>

        <motion.div
          className="mt-6 rounded-2xl bg-white px-6 py-7 text-left shadow-sm sm:px-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-600">Bappa says</p>
          <p className="mt-4 text-xl leading-9 text-stone-700">{bappaResponse}</p>
        </motion.div>
      </motion.div>

      <motion.div
        className="mt-10 border-t border-orange-100 pt-7"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <p className="text-sm font-medium text-stone-700">Share this link with your friends to help them find success and blessings.</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <button
            type="button"
            onClick={shareOnWhatsApp}
            className="rounded-lg bg-[#25D366] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#1fb957] focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2"
          >
            <span className="inline-flex items-center justify-center gap-2">
              <MessageCircle size={17} aria-hidden="true" />
              WhatsApp
            </span>
          </button>
          <button
            type="button"
            onClick={shareOnInstagram}
            className="rounded-lg bg-[#d62976] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#b92164] focus:outline-none focus:ring-2 focus:ring-[#d62976] focus:ring-offset-2"
          >
            <span className="inline-flex items-center justify-center gap-2">
              <Share2 size={17} aria-hidden="true" />
              Instagram
            </span>
          </button>
          <button
            type="button"
            onClick={shareOnFacebook}
            className="rounded-lg bg-[#1877F2] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#1468d5] focus:outline-none focus:ring-2 focus:ring-[#1877F2] focus:ring-offset-2"
          >
            <span className="inline-flex items-center justify-center gap-2">
              <Share2 size={17} aria-hidden="true" />
              Facebook
            </span>
          </button>
        </div>
      </motion.div>
    </section>
  )
}

export default BlessingPage
