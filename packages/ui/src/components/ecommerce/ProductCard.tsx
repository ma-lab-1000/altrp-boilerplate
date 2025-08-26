'use client'

import React from 'react'
import { Card, CardContent, CardHeader } from '../../primitives/Card'
import { Button } from '../../primitives/Button'
import { Text } from '../../primitives/Text'
import { cn } from '../../lib'

interface ProductCardProps {
  title: string
  description?: string
  image?: {
    src: string
    alt: string
    width?: number
    height?: number
  }
  price?: string
  tags?: string[]
  date?: string
  author?: string
  href?: string
  onClick?: () => void
  className?: string
}

export const ProductCard: React.FC<ProductCardProps> = ({
  title,
  description,
  image,
  price,
  tags = [],
  date,
  author,
  href,
  onClick,
  className = ''
}) => {
  const handleClick = () => {
    if (onClick) {
      onClick()
    }
  }

  const CardWrapper = href ? 'a' : 'div'
  const cardProps = href ? { href } : {}

  return (
    <CardWrapper
      {...cardProps}
              className={cn(
          'group block transition-all duration-200 hover:shadow-lg',
          href ? 'cursor-pointer' : '',
          className
        )}
      onClick={handleClick}
    >
      <Card className="h-full overflow-hidden">
        {image && (
          <div className="aspect-video overflow-hidden">
            <img
              src={image.src}
              alt={image.alt}
              width={image.width || 400}
              height={image.height || 225}
              className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
            />
          </div>
        )}
        
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-lg font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                {title}
              </h3>
              {description && (
                <Text variant="muted" className="mt-2 line-clamp-2">
                  {description}
                </Text>
              )}
            </div>
            {price && (
              <span className="text-lg font-bold text-primary ml-4">
                {price}
              </span>
            )}
          </div>
        </CardHeader>
        
        <CardContent className="pt-0">
          {/* Tags */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          
          {/* Meta information */}
          {(date || author) && (
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              {date && <span>{date}</span>}
              {date && author && <span>•</span>}
              {author && <span>{author}</span>}
            </div>
          )}
          
          {/* CTA Button */}
          <Button
            variant="outline"
            size="sm"
            className="w-full mt-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
          >
            {price ? 'Add to Cart' : 'Read More'}
          </Button>
        </CardContent>
      </Card>
    </CardWrapper>
  )
}
