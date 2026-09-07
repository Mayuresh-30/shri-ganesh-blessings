import { useEffect, useState } from 'react'

export const persistentStorageKeys = {
  name: 'shri-ganesh-draft-name',
  wish: 'shri-ganesh-draft-wish',
  userId: 'shri-ganesh-user-id',
}

export function getOrCreateUserId() {
  const storedUserId = window.sessionStorage.getItem(persistentStorageKeys.userId)

  if (storedUserId) {
    return storedUserId
  }

  const userId = crypto.randomUUID()
  window.sessionStorage.setItem(persistentStorageKeys.userId, userId)
  return userId
}

export function usePersistentValue(storageKey, initialValue = '') {
  const [value, setValue] = useState(() => {
    return window.sessionStorage.getItem(storageKey) ?? initialValue
  })

  useEffect(() => {
    if (value) {
      window.sessionStorage.setItem(storageKey, value)
    } else {
      window.sessionStorage.removeItem(storageKey)
    }
  }, [storageKey, value])

  return [value, setValue]
}