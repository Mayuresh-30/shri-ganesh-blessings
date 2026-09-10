export const ganeshImages = [
  {
    id: 'ganapati-1',
    src: '/shri-ganesh-images/hd/ganapati-1-removebg-preview-Picsart-AiImageEnhancer.png',
  },
  {
    id: 'ganapati-2',
    src: '/shri-ganesh-images/hd/ganapati-2-removebg-preview-Picsart-AiImageEnhancer.png',
  },
  {
    id: 'ganapati-3',
    src: '/shri-ganesh-images/hd/ganapati-3-removebg-preview-Picsart-AiImageEnhancer.png',
  },
  {
    id: 'ganapati-4',
    src: '/shri-ganesh-images/hd/ganapati-4-removebg-preview-Picsart-AiImageEnhancer.png',
  },
  {
    id: 'ganapati-5',
    src: '/shri-ganesh-images/hd/ganapati-5-removebg-preview-Picsart-AiImageEnhancer.png',
  },
  {
    id: 'ganapati-6',
    src: '/shri-ganesh-images/hd/ganapati-6-removebg-preview-Picsart-AiImageEnhancer.png',
  },
  {
    id: 'dagdu-sheth',
    src: '/shri-ganesh-images/hd/DagduShet-Halwai-removebg-preview-Picsart-AiImageEnhancer.png',
  },
  {
    id: 'lalbaug-cha-raja',
    src: '/shri-ganesh-images/hd/Lalbag-cha-raja-removebg-preview-Picsart-AiImageEnhancer.png',
  },
]

export function shuffleImages(images) {
  const shuffled = [...images]

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1))
    ;[shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]]
  }

  return shuffled
}

export function getGaneshImage(imageId) {
  return ganeshImages.find((image) => image.id === imageId) || ganeshImages[0]
}
