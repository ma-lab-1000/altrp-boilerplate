import React from 'react'

interface FullPageLayoutProps {
  children: React.ReactNode
}

export const FullPageLayout: React.FC<FullPageLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen">
      {children}
    </div>
  )
}
