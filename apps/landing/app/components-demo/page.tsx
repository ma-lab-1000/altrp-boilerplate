'use client'

import { PublicLayout } from '@lnd/ui/templates'
import { Hero, FeatureGrid } from '@lnd/ui/components/marketing'
import { Sidebar, TableOfContents, PreviousNext } from '@lnd/ui/components/navigation'
import { Accordion, Form } from '@lnd/ui/components/ui'
import { Card, Heading, Text } from '@lnd/ui/primitives'

export default function ComponentsDemoPage() {
  // Данные для Sidebar
  const sidebarItems = [
    {
      id: 'getting-started',
      label: 'Начало работы',
      href: '/blog/getting-started',
      icon: '🚀'
    },
    {
      id: 'components',
      label: 'Компоненты',
      icon: '🧩',
      children: [
        { id: 'ui', label: 'UI элементы', href: '/components-demo' },
        { id: 'templates', label: 'Шаблоны', href: '/components-demo' }
      ]
    },
    {
      id: 'deployment',
      label: 'Деплой',
      href: '/deployment',
      icon: '🚀'
    }
  ]

  // Данные для TableOfContents
  const tocItems = [
    {
      id: 'introduction',
      text: 'Введение',
      level: 1
    },
    {
      id: 'components',
      text: 'Компоненты',
      level: 1,
      children: [
        { id: 'sidebar', text: 'Sidebar', level: 2 },
        { id: 'table-of-contents', text: 'Table of Contents', level: 2 },
        { id: 'accordion', text: 'Accordion', level: 2 },
        { id: 'form', text: 'Form', level: 2 },
        { id: 'previous-next', text: 'Previous/Next', level: 2 }
      ]
    },
    {
      id: 'conclusion',
      text: 'Заключение',
      level: 1
    }
  ]

  // Данные для Accordion
  const accordionItems = [
    {
      id: 'what-is-lnd',
      title: 'Что такое LND Boilerplate?',
      content: 'LND Boilerplate - это современная платформа для веб-разработки, построенная на Next.js 14, TypeScript и Tailwind CSS. Она предоставляет готовую архитектуру для создания быстрых, SEO-оптимизированных веб-приложений.'
    },
    {
      id: 'features',
      title: 'Основные возможности',
      content: 'Платформа включает в себя компонентную библиотеку, утилиты для работы с контентом, SEO-инструменты, систему поиска и готовые шаблоны для различных типов страниц.'
    },
    {
      id: 'architecture',
      title: 'Архитектура',
      content: 'Проект построен как монорепозиторий с использованием Bun workspaces. Основные пакеты: @lnd/ui (компоненты), @lnd/utils (утилиты), apps/landing (основное приложение).'
    }
  ]

  // Данные для Form
  const formFields = [
    {
      id: 'name',
      label: 'Имя',
      type: 'text' as const,
      placeholder: 'Введите ваше имя',
      required: true
    },
    {
      id: 'email',
      label: 'Email',
      type: 'email' as const,
      placeholder: 'your@email.com',
      required: true
    },
    {
      id: 'subject',
      label: 'Тема',
      type: 'select' as const,
      options: [
        { value: 'general', label: 'Общий вопрос' },
        { value: 'support', label: 'Техподдержка' },
        { value: 'feature', label: 'Предложение функции' }
      ],
      required: true
    },
    {
      id: 'message',
      label: 'Сообщение',
      type: 'textarea' as const,
      placeholder: 'Опишите ваш вопрос или предложение',
      required: true
    },
    {
      id: 'newsletter',
      label: 'Подписаться на новости',
      type: 'checkbox' as const
    }
  ]

  // Данные для PreviousNext
  const previousArticle = {
    id: 'getting-started',
    title: 'Начало работы с LND Boilerplate',
    href: '/blog/getting-started',
    excerpt: 'Пошаговое руководство по настройке и запуску проекта LND Boilerplate',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=200&h=200&fit=crop'
  }

  const nextArticle = {
    id: 'custom-components',
    title: 'Создание пользовательских компонентов',
    href: '/blog/custom-components',
    excerpt: 'Как создавать и использовать компоненты в архитектуре LND Boilerplate',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=200&h=200&fit=crop'
  }

  const handleFormSubmit = async (data: Record<string, any>) => {
    console.log('Form submitted:', data)
    // Здесь будет логика отправки формы
    alert('Форма отправлена! Проверьте консоль для деталей.')
  }

  return (
    <PublicLayout>
      <Hero
        title="Демо компонентов"
        subtitle="Все доступные компоненты в одном месте"
        image={{
          src: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop",
          alt: "Демо компонентов"
        }}
      />

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-4">
              <Heading level={3} className="mb-4">Sidebar</Heading>
              <Sidebar
                items={sidebarItems}
                collapsible
                onItemClick={(item) => console.log('Sidebar item clicked:', item)}
              />
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-12">
            {/* Table of Contents */}
            <section id="table-of-contents">
              <Heading level={2} className="mb-6">Table of Contents</Heading>
              <div className="flex justify-end">
                <TableOfContents
                  items={tocItems}
                  onItemClick={(id) => console.log('TOC item clicked:', id)}
                />
              </div>
            </section>

            {/* Accordion */}
            <section id="accordion">
              <Heading level={2} className="mb-6">Accordion</Heading>
              <Accordion
                items={accordionItems}
                allowMultiple
                onToggle={(id, isOpen) => console.log('Accordion toggled:', id, isOpen)}
              />
            </section>

            {/* Form */}
            <section id="form">
              <Heading level={2} className="mb-6">Form</Heading>
              <Card className="p-6">
                <Form
                  fields={formFields}
                  onSubmit={handleFormSubmit}
                  submitText="Отправить сообщение"
                />
              </Card>
            </section>

            {/* Previous/Next */}
            <section id="previous-next">
              <Heading level={2} className="mb-6">Previous/Next Navigation</Heading>
              <PreviousNext
                previous={previousArticle}
                next={nextArticle}
                showExcerpts
                showImages
              />
            </section>
          </div>
        </div>
      </div>
    </PublicLayout>
  )
}
