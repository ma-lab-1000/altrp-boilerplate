import React from 'react'

interface TextProps {
  children: React.ReactNode
  variant?: 'default' | 'muted' | 'small' | 'large'
  className?: string
}

export const Text: React.FC<TextProps> = ({ 
  children, 
  variant = 'default', 
  className = '' 
}) => {
  const baseClasses = 'leading-7'
  
  const variantClasses = {
    default: 'text-foreground',
    muted: 'text-muted-foreground',
    small: 'text-sm text-muted-foreground',
    large: 'text-lg'
  }
  
  return (
    <p className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      {children}
    </p>
  )
}
