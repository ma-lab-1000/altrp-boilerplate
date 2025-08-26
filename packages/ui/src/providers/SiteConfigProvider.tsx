'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { SiteConfigManager, initializeSiteConfig, SiteConfig } from '@lnd/utils/config/site-config.client'

interface SiteConfigContextType {
  config: SiteConfigManager | null
  isLoading: boolean
  error: string | null
}

const SiteConfigContext = createContext<SiteConfigContextType>({
  config: null,
  isLoading: true,
  error: null
})

interface SiteConfigProviderProps {
  children: React.ReactNode
  configData?: SiteConfig
}

export const SiteConfigProvider: React.FC<SiteConfigProviderProps> = ({ 
  children, 
  configData 
}) => {
  const [config, setConfig] = useState<SiteConfigManager | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadConfig = async () => {
      try {
        if (configData) {
          // Use provided config data
          const manager = initializeSiteConfig(configData)
          setConfig(manager)
        } else {
          // Try to load from API or default config
          try {
            const response = await fetch('/api/site-config')
            if (response.ok) {
              const configData = await response.json()
              const manager = initializeSiteConfig(configData)
              setConfig(manager)
            } else {
              throw new Error('Failed to load site configuration')
            }
          } catch (fetchError) {
            console.warn('Failed to load site configuration from API:', fetchError)
            // Fallback: do not initialize config on client if API is unavailable
            setError('Site configuration is not available on the client. Ensure /api/site-config is implemented or pass configData to SiteConfigProvider.')
          }
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setIsLoading(false)
      }
    }

    loadConfig()
  }, [configData])

  return (
    <SiteConfigContext.Provider value={{ config, isLoading, error }}>
      {children}
    </SiteConfigContext.Provider>
  )
}

export const useSiteConfig = () => {
  const context = useContext(SiteConfigContext)
  if (!context) {
    throw new Error('useSiteConfig must be used within a SiteConfigProvider')
  }
  return context
}
