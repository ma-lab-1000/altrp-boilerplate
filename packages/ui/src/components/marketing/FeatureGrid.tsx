'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../../primitives/Card'
import { Text } from '../../primitives/Text'

interface Feature {
  icon?: React.ReactNode
  title: string
  text: string
}

interface FeatureGridProps {
  features: Feature[]
  title?: string
  description?: string
  columns?: 2 | 3 | 4
  className?: string
}

export const FeatureGrid: React.FC<FeatureGridProps> = ({
  features,
  title,
  description,
  columns = 3,
  className = ''
}) => {
  const gridCols = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
  }

  return (
    <section className={`py-24 sm:py-32 ${className}`}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {(title || description) && (
          <div className="mx-auto max-w-2xl text-center mb-16">
            {title && (
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                {title}
              </h2>
            )}
            {description && (
              <Text variant="large" className="text-muted-foreground">
                {description}
              </Text>
            )}
          </div>
        )}
        
        <div className={`grid gap-8 ${gridCols[columns]}`}>
          {features.map((feature, index) => (
            <Card key={index} className="text-center">
              <CardHeader>
                {feature.icon && (
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    {feature.icon}
                  </div>
                )}
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <Text variant="muted">{feature.text}</Text>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
