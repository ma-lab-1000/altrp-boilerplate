'use client'

import React from 'react'
import { ProductCard } from './ProductCard'

interface ProductItem {
  id: string
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
}

interface ProductListProps {
  items: ProductItem[]
  columns?: 1 | 2 | 3 | 4
  className?: string
  onItemClick?: (item: ProductItem) => void
}

export const ProductList: React.FC<ProductListProps> = ({
  items,
  columns = 3,
  className = '',
  onItemClick
}) => {
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
  }

  if (items.length === 0) {
    return (
      <div className={`text-center py-12 ${className}`}>
        <p className="text-muted-foreground">No items found.</p>
      </div>
    )
  }

  return (
    <div className={`grid gap-6 ${gridCols[columns]} ${className}`}>
      {items.map((item) => (
        <ProductCard
          key={item.id}
          title={item.title}
          description={item.description}
          image={item.image}
          price={item.price}
          tags={item.tags}
          date={item.date}
          author={item.author}
          href={item.href}
          onClick={() => onItemClick?.(item)}
        />
      ))}
    </div>
  )
}
