const fillerPhrases = [
  'i wish to be',
  'i wish',
  'my wish is to',
  'my wish is',
  'my',
  'in my',
  'i want',
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

export function createBappaResponse(wish) {
  const cleanedWish = cleanWish(wish)

  if (!cleanedWish) {
    return 'Keep your heart open, and may every new beginning bring peace and wisdom.'
  }

  const category = detectCategory(cleanedWish)
  const responses = bappaResponses[category]
  const response = responses[Math.floor(Math.random() * responses.length)]

  return `Your wish for ${cleanedWish} has been heard. ${response}`
}
