/**
 * TypeScript types for site.config.json
 * Unified configuration file for the entire project
 */

export interface SiteConfig {
  $schema?: string;
  site: SiteMetadata;
  seo: SEOConfig;
  manifest: WebAppManifest;
  build: BuildConfig;
  deployment: DeploymentConfig;
  ui: UIConfig;
  features: FeaturesConfig;
  environment: EnvironmentConfig;
  devAgent: DevAgentConfig;
  lastUpdated: string;
}

export interface SiteMetadata {
  name: string;
  shortName: string;
  description: string;
  version: string;
  url: string;
  author: Author;
  language: string;
  locale: string;
  timezone: string;
}

export interface Author {
  name: string;
  email: string;
  url: string;
}

export interface SEOConfig {
  title: string;
  description: string;
  keywords: string[];
  ogImage: string;
  twitterCard: "summary" | "summary_large_image" | "app" | "player";
  twitterHandle: string;
  robots: RobotsConfig;
}

export interface RobotsConfig {
  index: boolean;
  follow: boolean;
  googleBot: {
    index: boolean;
    follow: boolean;
    maxVideoPreview: number;
    maxImagePreview: "none" | "standard" | "large";
    maxSnippet: number;
  };
}

export interface WebAppManifest {
  name: string;
  shortName: string;
  description: string;
  startUrl: string;
  display: "fullscreen" | "standalone" | "minimal-ui" | "browser";
  backgroundColor: string;
  themeColor: string;
  orientation: "any" | "natural" | "landscape" | "landscape-primary" | "landscape-secondary" | "portrait" | "portrait-primary" | "portrait-secondary";
  scope: string;
  lang: string;
  categories: string[];
  icons: ManifestIcon[];
  screenshots: ManifestScreenshot[];
  shortcuts: ManifestShortcut[];
}

export interface ManifestIcon {
  src: string;
  sizes: string;
  type: string;
  purpose?: "any" | "maskable" | "monochrome";
}

export interface ManifestScreenshot {
  src: string;
  sizes: string;
  type: string;
  formFactor: "wide" | "narrow";
  label: string;
}

export interface ManifestShortcut {
  name: string;
  shortName: string;
  description: string;
  url: string;
  icons: ManifestIcon[];
}

export interface BuildConfig {
  framework: "nextjs" | "vite" | "webpack" | "rollup";
  outputDirectory: string;
  installCommand: string;
  buildCommand: string;
  devCommand: string;
  nodeVersion: string;
  pageExtensions: string[];
  webpack: WebpackConfig;
}

export interface WebpackConfig {
  mdx: {
    enabled: boolean;
    jsxImportSource: string;
  };
}

export interface DeploymentConfig {
  vercel: VercelConfig;
  netlify: NetlifyConfig;
}

export interface VercelConfig {
  framework: string;
  functions: Record<string, { runtime: string }>;
  rewrites: Array<{
    source: string;
    destination: string;
  }>;
  headers: Array<{
    source: string;
    headers: Array<{
      key: string;
      value: string;
    }>;
  }>;
}

export interface NetlifyConfig {
  command: string;
  publish: string;
  base: string;
  environment: Record<string, string>;
  redirects: Array<{
    from: string;
    to: string;
    status: number;
  }>;
  headers: Array<{
    for: string;
    values: Record<string, string>;
  }>;
  functions: {
    directory: string;
  };
}

export interface UIConfig {
  theme: ThemeConfig;
  content: string[];
}

export interface ThemeConfig {
  default: "light" | "dark" | "system";
  darkMode: "class" | "media";
  colors: ColorConfig;
  borderRadius: BorderRadiusConfig;
  animation: AnimationConfig;
}

export interface ColorConfig {
  border: string;
  input: string;
  ring: string;
  background: string;
  foreground: string;
  primary: {
    DEFAULT: string;
    foreground: string;
  };
  secondary: {
    DEFAULT: string;
    foreground: string;
  };
  destructive: {
    DEFAULT: string;
    foreground: string;
  };
  muted: {
    DEFAULT: string;
    foreground: string;
  };
  accent: {
    DEFAULT: string;
    foreground: string;
  };
  popover: {
    DEFAULT: string;
    foreground: string;
  };
  card: {
    DEFAULT: string;
    foreground: string;
  };
}

export interface BorderRadiusConfig {
  lg: string;
  md: string;
  sm: string;
}

export interface AnimationConfig {
  fadeIn: string;
  slideUp: string;
  slideDown: string;
}

export interface FeaturesConfig {
  blog: BlogConfig;
  search: SearchConfig;
  analytics: AnalyticsConfig;
  i18n: I18nConfig;
  pwa: PWAConfig;
  documentation: DocumentationConfig;
}

export interface BlogConfig {
  enabled: boolean;
  path: string;
  postsPerPage: number;
  enableComments: boolean;
  enableTags: boolean;
  enableCategories: boolean;
}

export interface SearchConfig {
  enabled: boolean;
  provider: "local" | "algolia" | "elasticsearch";
  indexPath: string;
  enableFilters: boolean;
}

export interface AnalyticsConfig {
  enabled: boolean;
  provider: "google" | "plausible" | "fathom" | "mixpanel";
  trackingId: string | null;
}

export interface I18nConfig {
  enabled: boolean;
  defaultLocale: string;
  locales: string[];
  pathnames: Record<string, string>;
}

export interface PWAConfig {
  enabled: boolean;
  offlineSupport: boolean;
  installPrompt: boolean;
}

export interface DocumentationConfig {
  enabled: boolean;
  path: string;
  navigation: {
    enabled: boolean;
    position: 'left' | 'right' | 'top';
    showProgress: boolean;
    showBreadcrumbs: boolean;
  };
  search: {
    enabled: boolean;
    provider: 'local' | 'algolia';
    placeholder: string;
  };
  layout: {
    sidebar: boolean;
    toc: boolean;
    footer: boolean;
  };
}

export interface EnvironmentConfig {
  development: Record<string, string>;
  production: Record<string, string>;
  staging: Record<string, string>;
}

export interface DevAgentConfig {
  name: string;
  version: string;
  description: string;
  workflow: {
    syncInterval: number;
    autoSync: boolean;
  };
  branches: {
    main: string;
    featurePrefix: string;
    releasePrefix: string;
    develop: string;
  };
  storage: {
    database: {
      path: string;
    };
    config: {
      path: string;
    };
    logs: {
      path: string;
    };
  };
  github: {
    repo: string;
    owner: string;
  };
  lastUpdated: string;
  goals: {
    defaultStatus: string;
    idPattern: string;
  };
  validation: {
    strictLanguage: boolean;
    autoTranslate: boolean;
  };
}

// Utility types for configuration access
export type Environment = "development" | "production" | "staging";

export type FeatureKey = keyof FeaturesConfig;

export type DeploymentProvider = keyof DeploymentConfig;

// Type guards
export function isSiteConfig(obj: any): obj is SiteConfig {
  return (
    obj &&
    typeof obj === "object" &&
    typeof obj.site === "object" &&
    typeof obj.seo === "object" &&
    typeof obj.manifest === "object" &&
    typeof obj.build === "object" &&
    typeof obj.deployment === "object" &&
    typeof obj.ui === "object" &&
    typeof obj.features === "object" &&
    typeof obj.environment === "object" &&
    typeof obj.devAgent === "object"
  );
}

export function isValidEnvironment(env: string): env is Environment {
  return ["development", "production", "staging"].includes(env);
}

export function isValidFeatureKey(key: string): key is FeatureKey {
  return ["blog", "search", "analytics", "i18n", "pwa", "documentation"].includes(key);
}

export function isValidDeploymentProvider(provider: string): provider is DeploymentProvider {
  return ["vercel", "netlify"].includes(provider);
}
