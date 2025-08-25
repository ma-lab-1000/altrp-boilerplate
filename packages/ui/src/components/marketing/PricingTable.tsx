'use client'

import React from 'react'
import { Button } from '../../primitives/Button'
import { Card, CardContent, CardHeader, CardTitle } from '../../primitives/Card'
import { Text } from '../../primitives/Text'
import { cn } from '../../lib'

interface PricingFeature {
  text: string
  included: boolean
}

interface PricingPlan {
  name: string
  price: string
  period?: string
  description?: string
  features: PricingFeature[]
  cta: {
    text: string
    variant?: 'default' | 'outline' | 'secondary'
    href?: string
    onClick?: () => void
  }
  popular?: boolean
}

interface PricingTableProps {
  plans: PricingPlan[]
  title?: string
  description?: string
  className?: string
}

export const PricingTable: React.FC<PricingTableProps> = ({
  plans,
  title,
  description,
  className = ''
}) => {
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={cn(
                'relative',
                plan.popular ? 'ring-2 ring-primary' : ''
              )}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}
              
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.period && (
                    <span className="text-muted-foreground">/{plan.period}</span>
                  )}
                </div>
                {plan.description && (
                  <Text variant="muted" className="mt-2">
                    {plan.description}
                  </Text>
                )}
              </CardHeader>
              
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <svg
                        className={cn(
                          'h-5 w-5 mr-3',
                          feature.included 
                            ? 'text-green-500' 
                            : 'text-muted-foreground'
                        )}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        {feature.included ? (
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        ) : (
                          <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        )}
                      </svg>
                      <Text 
                        variant={feature.included ? 'default' : 'muted'}
                        className={cn(
                          feature.included ? '' : 'line-through'
                        )}
                      >
                        {feature.text}
                      </Text>
                    </li>
                  ))}
                </ul>
                
                <Button
                  variant={plan.cta.variant || 'default'}
                  size="lg"
                  className="w-full mt-6"
                  onClick={plan.cta.onClick}
                >
                  {plan.cta.text}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
