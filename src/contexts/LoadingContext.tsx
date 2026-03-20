// src/contexts/LoadingContext.tsx
import React, { createContext, useContext, useState, useCallback } from 'react'
import type { ReactNode } from 'react';
interface LoadingContextType {
  registerLoader: (key: string) => void
  unregisterLoader: (key: string, error?: string) => void
  isGlobalLoading: boolean
  globalError: string | null
  retry: () => void
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined)

export const LoadingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [loaders, setLoaders] = useState<Set<string>>(new Set())
  const [errors, setErrors] = useState<Map<string, string>>(new Map())
  const [, setRetryTrigger] = useState(0)

  const registerLoader = useCallback((key: string) => {
    setLoaders(prev => new Set(prev).add(key))
    setErrors(prev => {
      const newErrors = new Map(prev)
      newErrors.delete(key)
      return newErrors
    })
  }, [])

  const unregisterLoader = useCallback((key: string, error?: string) => {
    setLoaders(prev => {
      const newLoaders = new Set(prev)
      newLoaders.delete(key)
      return newLoaders
    })

    if (error) {
      setErrors(prev => new Map(prev).set(key, error))
    }
  }, [])

  const retry = useCallback(() => {
    setErrors(new Map())
    setRetryTrigger(prev => prev + 1)
  }, [])

  const isGlobalLoading = loaders.size > 0
  const globalError = errors.size > 0 ? Array.from(errors.values()).join(', ') : null

  return (
    <LoadingContext.Provider value={{
      registerLoader,
      unregisterLoader,
      isGlobalLoading,
      globalError,
      retry
    }}>
      {children}
    </LoadingContext.Provider>
  )
}

export const useLoading = () => {
  const context = useContext(LoadingContext)
  if (!context) {
    throw new Error('useLoading must be used within LoadingProvider')
  }
  return context
}

export const useLoadingState = (key: string) => {
  const { registerLoader, unregisterLoader } = useLoading()

  return {
    startLoading: useCallback(() => registerLoader(key), [key, registerLoader]),
    stopLoading: useCallback((error?: string) => unregisterLoader(key, error), [key, unregisterLoader])
  }
}
