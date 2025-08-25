'use client'

import { useState } from 'react'
import { cn } from '../../lib/utils'

export interface FormField {
  id: string
  label: string
  type: 'text' | 'email' | 'password' | 'textarea' | 'select' | 'checkbox' | 'radio'
  placeholder?: string
  required?: boolean
  options?: { value: string; label: string }[]
  validation?: {
    pattern?: string
    message?: string
  }
}

export interface FormProps {
  fields: FormField[]
  onSubmit: (data: Record<string, any>) => void
  submitText?: string
  className?: string
  initialData?: Record<string, any>
}

export function Form({
  fields,
  onSubmit,
  submitText = 'Отправить',
  className,
  initialData = {}
}: FormProps) {
  const [formData, setFormData] = useState<Record<string, any>>(initialData)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (id: string, value: any) => {
    setFormData(prev => ({ ...prev, [id]: value }))
    // Clear error when user starts typing
    if (errors[id]) {
      setErrors(prev => ({ ...prev, [id]: '' }))
    }
  }

  const validateField = (field: FormField, value: any): string => {
    if (field.required && !value) {
      return 'Это поле обязательно для заполнения'
    }

    if (field.type === 'email' && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return 'Введите корректный email'
    }

    if (field.validation?.pattern && value && !new RegExp(field.validation.pattern).test(value)) {
      return field.validation.message || 'Неверный формат'
    }

    return ''
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate all fields
    const newErrors: Record<string, string> = {}
    fields.forEach(field => {
      const error = validateField(field, formData[field.id])
      if (error) {
        newErrors[field.id] = error
      }
    })

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setIsSubmitting(true)
    try {
      await onSubmit(formData)
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderField = (field: FormField) => {
    const value = formData[field.id] || ''
    const error = errors[field.id]

    const commonProps = {
      id: field.id,
      name: field.id,
      value: value,
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
        handleInputChange(field.id, e.target.value),
      className: cn(
        'w-full px-3 py-2 border rounded-md transition-colors',
        'focus:outline-none focus:border-blue-500',
        error ? 'border-red-500' : 'border-gray-300 dark:border-gray-600',
        'bg-white dark:bg-gray-800 text-gray-900 dark:text-white'
      ),
      placeholder: field.placeholder,
      required: field.required
    }

    switch (field.type) {
      case 'textarea':
        return (
          <textarea
            {...commonProps}
            rows={4}
            className={cn(commonProps.className, 'resize-vertical')}
          />
        )

      case 'select':
        return (
          <select {...commonProps}>
            <option value="">Выберите опцию</option>
            {field.options?.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )

      case 'checkbox':
        return (
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id={field.id}
              name={field.id}
              checked={!!value}
              onChange={(e) => handleInputChange(field.id, e.target.checked)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:outline-none"
            />
            <label htmlFor={field.id} className="text-sm text-gray-700 dark:text-gray-300">
              {field.label}
            </label>
          </div>
        )

      case 'radio':
        return (
          <div className="space-y-2">
            {field.options?.map(option => (
              <div key={option.value} className="flex items-center space-x-2">
                <input
                  type="radio"
                  id={`${field.id}-${option.value}`}
                  name={field.id}
                  value={option.value}
                  checked={value === option.value}
                  onChange={(e) => handleInputChange(field.id, e.target.value)}
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:outline-none"
                />
                <label htmlFor={`${field.id}-${option.value}`} className="text-sm text-gray-700 dark:text-gray-300">
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        )

      default:
        return <input type={field.type} {...commonProps} />
    }
  }

  return (
    <form onSubmit={handleSubmit} className={cn('space-y-6', className)}>
      {fields.map(field => (
        <div key={field.id} className="space-y-2">
          {field.type !== 'checkbox' && (
            <label htmlFor={field.id} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
          )}
          
          {renderField(field)}
          
          {errors[field.id] && (
            <p className="text-sm text-red-600 dark:text-red-400">
              {errors[field.id]}
            </p>
          )}
        </div>
      ))}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isSubmitting ? 'Отправка...' : submitText}
      </button>
    </form>
  )
}
