import { useEffect } from 'react'

const backgroundSong = '/background-music/backgroundMusic.mp3'

export default function PersistentAudio() {
  useEffect(() => {
    const audio = new Audio(backgroundSong)
    audio.loop = true
    audio.volume = 0.18
    audio.preload = 'auto'
    audio.muted = true

    let hasStarted = false

    function startWithSound() {
      audio.muted = false
      hasStarted = true

      audio.play().catch(() => {
        // The browser can still reject playback; a later gesture can retry it.
        hasStarted = false
        audio.muted = true
      })
    }

    function unlockAudio() {
      if (hasStarted && !audio.paused && !audio.muted) {
        return
      }

      startWithSound()
      window.removeEventListener('pointerdown', unlockAudio)
      window.removeEventListener('keydown', unlockAudio)
      window.removeEventListener('touchstart', unlockAudio)
    }

    window.addEventListener('pointerdown', unlockAudio, { once: true })
    window.addEventListener('keydown', unlockAudio, { once: true })
    window.addEventListener('touchstart', unlockAudio, { once: true })

    audio.play().catch(() => {
      // Muted autoplay is normally allowed, but the gesture listeners remain as fallback.
    })

    return () => {
      window.removeEventListener('pointerdown', unlockAudio)
      window.removeEventListener('keydown', unlockAudio)
      window.removeEventListener('touchstart', unlockAudio)
      audio.pause()
      audio.src = ''
      audio.load()
    }
  }, [])

  return null
}
