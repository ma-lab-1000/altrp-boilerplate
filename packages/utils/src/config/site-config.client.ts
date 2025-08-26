/**
 * Client-side utilities for working with site.config.json
 * This version doesn't use Node.js modules and works in the browser
 */

import { SiteConfig, Environment, FeatureKey, DeploymentProvider, isSiteConfig, isValidEnvironment, isValidFeatureKey, isValidDeploymentProvider } from './site-config.types'

/**
 * Client-side site configuration manager
 */
export class SiteConfigManager {
  private config: SiteConfig | null = null

  constructor(config?: SiteConfig) {
    if (config) {
      this.config = config
    }
  }

  /**
   * Load configuration from a provided object
   */
  loadFromObject(config: SiteConfig): void {
    if (!isSiteConfig(config)) {
      throw new Error('Invalid site configuration format')
    }
    this.config = config
  }

  /**
   * Get the current configuration
   */
  getConfig(): SiteConfig | null {
    return this.config
  }

  /**
   * Get site metadata
   */
  getMetadata() {
    if (!this.config) {
      throw new Error('Configuration not loaded')
    }
    return this.config.site
  }

  /**
   * Get SEO configuration
   */
  getSEO() {
    if (!this.config) {
      throw new Error('Configuration not loaded')
    }
    return this.config.seo
  }

  /**
   * Get features configuration
   */
  getFeatures() {
    if (!this.config) {
      throw new Error('Configuration not loaded')
    }
    return this.config.features
  }

  /**
   * Get specific feature configuration
   */
  getFeatureConfig<T extends FeatureKey>(feature: T) {
    if (!this.config) {
      throw new Error('Configuration not loaded')
    }
    return this.config.features[feature]
  }

  /**
   * Check if a feature is enabled
   */
  isFeatureEnabled(feature: FeatureKey): boolean {
    if (!this.config) {
      return false
    }
    const featureConfig = this.config.features[feature]
    return featureConfig && typeof featureConfig === 'object' && 'enabled' in featureConfig 
      ? (featureConfig as any).enabled 
      : false
  }

  /**
   * Get environment configuration
   */
  getEnvironment(env: Environment) {
    if (!this.config) {
      throw new Error('Configuration not loaded')
    }
    if (!isValidEnvironment(env)) {
      throw new Error(`Invalid environment: ${env}`)
    }
    return this.config.environment[env]
  }

  /**
   * Get deployment configuration
   */
  getDeployment() {
    if (!this.config) {
      throw new Error('Configuration not loaded')
    }
    return this.config.deployment
  }

  /**
   * Validate the current configuration
   */
  validate(): boolean {
    if (!this.config) {
      return false
    }
    return isSiteConfig(this.config)
  }
}

/**
 * Global site configuration instance
 */
let globalSiteConfig: SiteConfigManager | null = null

/**
 * Initialize the global site configuration with a config object
 */
export function initializeSiteConfig(config: SiteConfig): SiteConfigManager {
  globalSiteConfig = new SiteConfigManager(config)
  return globalSiteConfig
}

/**
 * Get the global site configuration instance
 */
export function getSiteConfig(): SiteConfigManager {
  if (!globalSiteConfig) {
    throw new Error('Site configuration not initialized. Call initializeSiteConfig() first.')
  }
  return globalSiteConfig
}

/**
 * Check if site configuration is initialized
 */
export function isSiteConfigInitialized(): boolean {
  return globalSiteConfig !== null
}

/**
 * Reset the global site configuration
 */
export function resetSiteConfig(): void {
  globalSiteConfig = null
}

// Re-export types and utilities
export * from './site-config.types'
