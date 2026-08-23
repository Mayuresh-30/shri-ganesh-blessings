import { useLocation } from 'react-router-dom'
import { MessageCircle, Share2 } from 'lucide-react'

const fillerPhrases = [
  'i wish to be',
  'my wish is to',
  'my wish is',
  'may i get',
  'i want to',
  'i pray for',
  'please give me',
  'i would like to',
]

const categoryKeywords = {
  career: ['career', 'job', 'promotion', 'office', 'work', 'exam', 'study', 'success'],
  love: ['love', 'marriage', 'relationship', 'partner', 'husband', 'wife'],
  business: ['business', 'shop', 'company', 'client', 'profit', 'sales'],
  health: ['health', 'healing', 'healthy', 'disease', 'recovery', 'medicine'],
  devotion: ['god', 'prayer', 'devotion', 'puja', 'spiritual', 'faith', 'blessing'],
}

const bappaResponses = {
  career: [
    'Your dedication will open the right doors. Keep moving forward with patience and confidence.',
    'Your hard work is being noticed. Trust your abilities and continue with courage.',
  ],
  love: [
    'Love grows through patience, honesty, and understanding. Keep your heart pure.',
    'What is meant for you will arrive with peace, care, and genuine understanding.',
  ],
  business: [
    'Your business will grow through wise decisions and steady effort. Keep faith in your vision.',
    'New opportunities are coming. Let wisdom guide every important decision.',
  ],
  health: [
    'May your body receive strength and your mind receive peace. Take care of yourself with patience.',
    'Healing is a journey. Stay hopeful and follow every good step with faith.',
  ],
  devotion: [
    'Your faith is your strength. Continue your path with humility and devotion.',
    'A sincere heart always finds the right direction. Keep walking with faith.',
  ],
}

function cleanWish(wish) {
  let cleanedWish = wish.toLowerCase().replace(/[.,!?]/g, '').trim()

  fillerPhrases.some((phrase) => {
    if (!cleanedWish.startsWith(phrase)) return false
    cleanedWish = cleanedWish.slice(phrase.length).trim()
    return true
  })

  return cleanedWish.replace(/^(to|for|that)\s+/, '').trim()
}

function detectCategory(wish) {
  const matches = Object.entries(categoryKeywords)
    .map(([category, keywords]) => ({
      category,
      score: keywords.reduce((total, keyword) => total + (wish.includes(keyword) ? 1 : 0), 0),
    }))
    .sort((first, second) => second.score - first.score)

  return matches[0].score > 0 ? matches[0].category : 'devotion'
}

function createBappaResponse(wish) {
  const cleanedWish = cleanWish(wish)

  if (!cleanedWish) {
    return 'Keep your heart open, and may every new beginning bring peace and wisdom.'
  }

  const category = detectCategory(cleanedWish)
  const responses = bappaResponses[category]
  const response = responses[Math.floor(Math.random() * responses.length)]

  return `Your wish for ${cleanedWish} has been heard. ${response}`
}

function BlessingPage() {
  const { state } = useLocation()
  const bappaResponse = createBappaResponse(state?.wish || '')
  const bappaName = state?.ganeshName || 'Ganapati'
  const shareUrl = `${window.location.origin}/`
  const shareText = 'Share Shri Ganesh Blessings with your friends and help them find success, peace, and blessings.'

  function openShareWindow(url) {
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  function shareOnWhatsApp() {
    openShareWindow(`https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`)
  }

  function shareOnFacebook() {
    openShareWindow(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`)
  }

  async function shareOnInstagram() {
    if (navigator.share) {
      await navigator.share({ title: 'Shri Ganesh Blessings', text: shareText, url: shareUrl })
      return
    }

    await navigator.clipboard?.writeText(`${shareText} ${shareUrl}`)
    openShareWindow('https://www.instagram.com/')
  }

  return (
    <section className="mx-auto max-w-3xl text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-600">Your blessing</p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight text-stone-950 sm:text-5xl">
        {state?.name ? `A message for ${state.name}` : 'A message from Bappa'}
      </h1>
      <div className="mt-10 overflow-hidden rounded-[2rem] border border-orange-200 bg-[#fff3df] p-4 shadow-xl shadow-orange-950/10 sm:p-7">
        <div className="flex min-h-[260px] items-center justify-center rounded-2xl bg-[#f3d4a4] text-8xl text-[#9f2f18] sm:min-h-[340px] sm:text-9xl">
          <span className="select-none" aria-label={`Placeholder for ${bappaName} image`}>ॐ</span>
        </div>
        <div className="mt-6 rounded-2xl bg-white px-6 py-7 text-left shadow-sm sm:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-600">Bappa says</p>
          <p className="mt-4 text-xl leading-9 text-stone-700">{bappaResponse}</p>
        </div>
      </div>
      <div className="mt-10 border-t border-orange-100 pt-7">
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
      </div>
    </section>
  )
}

export default BlessingPage
