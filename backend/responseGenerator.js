const fillerPhrases = [
  'i wish to be',
  'i would love to be',
  'i hope to be',
  'i want to become',
  'i dream of becoming',
  'i pray to become',
  'please make me',
  'may i become',
  'bless me to be',
  'help me become',
  'grant me the strength to be',
  'i wish',
  'i am wishing for',
  'my biggest wish is',
  'my heartfelt wish is',
  'my sincere wish is',
  'my deepest wish is',
  'my humble wish is',
  'my prayer is for',
  'my prayer is to',
  'my wish is to',
  'my wish is',
  'my desire is to',
  'my hope is to',
  'my dream is to',
  'my goal is to',
  'my intention is to',
  'my request is for',
  'my request is to',
  'i am praying for',
  'i am praying to',
  'i am asking for',
  'i am asking to',
  'i am hoping for',
  'i am hoping to',
  'i am seeking',
  'i am looking for',
  'i am wishing to',
  'i would like',
  'i would love',
  'i hope for',
  'i dream of',
  'i desire',
  'i seek',
  'i request',
  'i pray that',
  'i pray for',
  'i pray to',
  'please bless me with',
  'please bless me to',
  'please grant me',
  'please help me',
  'please guide me toward',
  'please guide me to',
  'please show me',
  'please give me',
  'please help us with',
  'may i have',
  'my',
  'in my',
  'i want',
  'may i get',
  'i want to',
  'i need',
  'i need help with',
  'i hope that',
  'i wish that',
  'i want my',
  'i want a',
  'i want to find',
  'i want to receive',
  'i want to achieve',
  'i want to overcome',
  'help me with',
  'bless my',
  'guide my',
]

const categoryKeywords = {
  career: ['career', 'profession', 'promotion', 'interview', 'workplace', 'colleague', 'resume'],
  education: ['school', 'college', 'university', 'class', 'learning', 'degree', 'knowledge'],
  exams: ['exam', 'test', 'marks', 'grade', 'result', 'entrance', 'competitive'],
  business: ['business', 'startup', 'entrepreneur', 'shop', 'customer', 'sales', 'company'],
  wealth: ['money', 'wealth', 'salary', 'savings', 'debt', 'investment', 'budget'],
  love: ['love', 'romance', 'affection', 'soulmate', 'attraction', 'beloved'],
  marriage: ['marriage', 'wedding', 'spouse', 'bride', 'groom', 'married'],
  friendship: ['friend', 'friendship', 'companionship', 'loneliness', 'social', 'companion'],
  family: ['family', 'parents', 'mother', 'father', 'siblings', 'relative'],
  children: ['child', 'children', 'baby', 'pregnancy', 'parenting', 'son', 'daughter'],
  health: ['health', 'fitness', 'nutrition', 'doctor', 'medicine', 'disease', 'surgery'],
  peace: ['peace', 'anxiety', 'confidence', 'calm', 'stress', 'worry', 'happiness'],
  travel: ['travel', 'trip', 'journey', 'vacation', 'tour', 'passport', 'flight'],
  home: ['home', 'house', 'renovation', 'kitchen', 'rent', 'household', 'shelter'],
  property: ['property', 'land', 'apartment', 'real estate', 'mortgage', 'plot', 'building'],
  legal: ['court', 'lawyer', 'legal', 'lawsuit', 'rights', 'case', 'verdict'],
  creativity: ['art', 'music', 'writing', 'painting', 'design', 'creative', 'inspiration'],
  technology: ['computer', 'software', 'website', 'coding', 'programming', 'device', 'technology'],
  protection: ['protection', 'safety', 'danger', 'shield', 'threat', 'security', 'accident'],
  devotion: ['god', 'prayer', 'devotion', 'puja', 'spiritual', 'temple', 'mantra', 'faith'],
}

const bappaResponses = {
  career: [
    'Your dedication will open the right doors. Keep moving forward with patience and confidence.',
    'A deserving opportunity is taking shape. Prepare well, speak with clarity, and trust your abilities.',
    'Your efforts are not unseen. Continue with discipline, and the path ahead will become clearer.',
  ],
  education: [
    'Knowledge gained with patience becomes a strength no one can take away. Keep learning with a steady heart.',
    'Your curiosity will guide you toward the right teachers and lessons. Do not doubt your ability to grow.',
    'Small study efforts made each day will bring a result that fills your heart with pride.',
  ],
  exams: [
    'Keep your mind calm and your preparation sincere. Your focused effort will speak when the moment arrives.',
    'Do not let fear of the result disturb today\'s work. Revise patiently and enter the exam with faith.',
    'The blessing of clarity is with you. Read carefully, remember what you know, and give your best.',
  ],
  business: [
    'Your business will grow through wise decisions and steady effort. Keep faith in your vision.',
    'A useful opportunity is approaching. Serve people honestly, manage carefully, and let trust become your strength.',
    'Your enterprise has room to flourish. Listen to good advice and take each expansion step with wisdom.',
  ],
  wealth: [
    'Prosperity grows where patience and responsibility walk together. Guard your resources and use them wisely.',
    'A more stable financial season is possible. Make thoughtful choices and let steady saving support your dreams.',
    'Do not measure abundance only by what arrives quickly. The wealth built with discipline will stay with you.',
  ],
  love: [
    'Love grows through patience, honesty, and understanding. Keep your heart pure.',
    'What is meant for you will arrive with peace, care, and genuine understanding.',
    'Your heart is learning an important lesson. Give love freely, but choose the bond that brings mutual respect.',
  ],
  marriage: [
    'A union blessed with patience and respect becomes a home for both hearts. Let understanding lead the way.',
    'The right partnership will bring companionship, not confusion. Speak honestly and listen with tenderness.',
    'When two people walk with trust, difficulties become lighter. Keep your intentions sincere.',
  ],
  friendship: [
    'A true friend will recognize your heart. Nurture the connections that bring honesty and warmth.',
    'The loneliness you feel will not last forever. Open your heart gently to people who value your presence.',
    'A meaningful friendship may begin through a simple conversation. Be genuine and let trust grow naturally.',
  ],
  family: [
    'Your family bond will find strength through kind words and patient listening. Be the peace you wish to see.',
    'Old misunderstandings can soften when love is given without pride. Take the first gentle step.',
    'Your care for your family is a sacred offering. Support one another and brighter days will come.',
  ],
  children: [
    'The children around you are blessed by your patience and care. Let your guidance be firm, loving, and kind.',
    'A new chapter of family joy is being prepared. Keep hope in your heart and care for every small beginning.',
    'Your nurturing spirit will create a safe path for a young heart to grow with confidence.',
  ],
  health: [
    'May your body receive strength and your mind receive peace. Take care of yourself with patience.',
    'Healing is a journey. Stay hopeful and follow every good step with faith.',
    'Listen to your body and accept support when it is offered. With good care and patience, strength can return.',
  ],
  peace: [
    'May the noise within you become quiet. Breathe slowly, release what you cannot control, and trust this moment.',
    'Your mind deserves kindness, not punishment. Rest, speak openly, and let peace return one day at a time.',
    'Courage is already alive within you. The worries before you will become lighter when faced gently.',
  ],
  travel: [
    'Your journey will bring more than distance; it will bring a lesson your heart is ready to receive.',
    'Travel with awareness and gratitude. The road will open when preparation and faith move together.',
    'A refreshing change of place is near. Keep your plans clear and allow the journey to renew you.',
  ],
  home: [
    'May your home be filled with warmth, safety, and laughter. Patient effort will turn your space into a sanctuary.',
    'A peaceful home begins with peaceful hearts. Take one practical step and let comfort grow slowly.',
    'Your household will find greater harmony. Care for the small details and cherish the people within it.',
  ],
  property: [
    'The right place will come through careful thought, not haste. Read every detail and let wisdom protect your choice.',
    'A stable foundation is being prepared for you. Be patient with the process and keep your intentions clear.',
    'Your property matter can move forward with good guidance and honest documents. Proceed calmly and carefully.',
  ],
  legal: [
    'May truth guide every conversation and bring a fair resolution. Keep your records clear and seek wise counsel.',
    'Do not let fear silence you. Follow the proper path with patience, honesty, and trusted guidance.',
    'The clouds around this matter can clear. Remain truthful, attentive, and steady through each step.',
  ],
  creativity: [
    'The gift within you is waiting for practice, not permission. Create freely and let your honest voice be heard.',
    'Your imagination carries a message meant to reach others. Begin with one small work and let it grow.',
    'Inspiration will visit you when you make space for it. Keep creating even before the result feels perfect.',
  ],
  technology: [
    'Your technical path will open through curiosity and consistent practice. Build patiently and learn from every error.',
    'A solution is closer than it appears. Break the problem into small pieces and trust your clear thinking.',
    'Your ideas can become useful tools. Keep learning, protect your work, and share it with purpose.',
  ],
  protection: [
    'May you and those you love remain surrounded by safety. Stay alert, make wise choices, and do not ignore good advice.',
    'The courage to protect yourself is a blessing. Step away from danger and allow trustworthy people to support you.',
    'Peace will return after this uncertainty. Take practical precautions and keep your heart free from fear.',
  ],
  devotion: [
    'Your faith is your strength. Continue your path with humility and devotion.',
    'A sincere heart always finds the right direction. Keep walking with faith.',
    'Your prayer has been heard. Keep your actions pure, serve where you can, and let devotion guide your choices.',
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

function containsKeyword(wish, keyword) {
  const escapedKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  return new RegExp(`\\b${escapedKeyword.replace(/\s+/g, '\\s+')}\\b`).test(wish)
}

function detectCategory(wish) {
  const matches = Object.entries(categoryKeywords)
    .map(([category, keywords]) => ({
      category,
      score: keywords.reduce((total, keyword) => total + (containsKeyword(wish, keyword) ? 1 : 0), 0),
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
