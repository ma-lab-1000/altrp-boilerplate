'use client'

import { ApplicationLayout } from '@lnd/ui/templates'
import { useState, useEffect } from 'react'

/**
 * Application-Driven Page Demo
 * 
 * This page demonstrates the ApplicationLayout template, which is optimized for:
 * - Interactive components and state management
 * - Dynamic content loading
 * - Client-side functionality
 * - Real-time data updates
 */
export default function ApplicationDemoPage() {
  const [selectedTab, setSelectedTab] = useState('overview')
  const [data, setData] = useState({
    users: 0,
    revenue: 0,
    orders: 0,
    loading: true
  })
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setData({
        users: 1234,
        revenue: 45678,
        orders: 89,
        loading: false
      })
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'analytics', label: 'Analytics', icon: '📈' },
    { id: 'forms', label: 'Forms', icon: '📝' },
    { id: 'settings', label: 'Settings', icon: '⚙️' }
  ]

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert(`Form submitted with: ${JSON.stringify(formData, null, 2)}`)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <ApplicationLayout 
      title="Application-Driven Page Architecture"
      description="Demonstration of interactive, dynamic pages with state management and real-time functionality."
    >
      <div className="space-y-6">
        {/* Tab Navigation */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                  selectedTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Dynamic Content Based on Selected Tab */}
        {selectedTab === 'overview' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                What is Application-Driven Architecture?
              </h3>
              <p className="text-gray-600 mb-4">
                Application-driven pages are designed for interactive functionality, 
                dynamic content, and real-time updates. These pages are perfect for:
              </p>
              
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>User dashboards and analytics</li>
                <li>Forms and data collection</li>
                <li>Real-time data visualization</li>
                <li>Interactive components</li>
                <li>Stateful applications</li>
              </ul>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-medium text-gray-900">Total Users</h3>
                {data.loading ? (
                  <div className="animate-pulse">
                    <div className="h-8 bg-gray-200 rounded w-24 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-32"></div>
                  </div>
                ) : (
                  <>
                    <p className="text-3xl font-bold text-blue-600">{data.users.toLocaleString()}</p>
                    <p className="text-sm text-gray-500">+12% from last month</p>
                  </>
                )}
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-medium text-gray-900">Revenue</h3>
                {data.loading ? (
                  <div className="animate-pulse">
                    <div className="h-8 bg-gray-200 rounded w-24 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-32"></div>
                  </div>
                ) : (
                  <>
                    <p className="text-3xl font-bold text-green-600">${data.revenue.toLocaleString()}</p>
                    <p className="text-sm text-gray-500">+8% from last month</p>
                  </>
                )}
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-medium text-gray-900">Orders</h3>
                {data.loading ? (
                  <div className="animate-pulse">
                    <div className="h-8 bg-gray-200 rounded w-24 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-32"></div>
                  </div>
                ) : (
                  <>
                    <p className="text-3xl font-bold text-purple-600">{data.orders}</p>
                    <p className="text-sm text-gray-500">+15% from last month</p>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {selectedTab === 'analytics' && (
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Analytics Dashboard</h3>
            <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <p className="text-gray-500 mb-2">📊 Interactive Chart Component</p>
                <p className="text-sm text-gray-400">
                  This would typically contain a real-time chart or data visualization
                </p>
              </div>
            </div>
          </div>
        )}

        {selectedTab === 'forms' && (
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Interactive Form</h3>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Submit Form
              </button>
            </form>
          </div>
        )}

        {selectedTab === 'settings' && (
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Settings Panel</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Email Notifications
                  </label>
                  <p className="text-sm text-gray-500">Receive email updates about your account</p>
                </div>
                <input
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  defaultChecked
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Dark Mode
                  </label>
                  <p className="text-sm text-gray-500">Switch to dark theme</p>
                </div>
                <input
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Language
                </label>
                <select className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500">
                  <option>English</option>
                  <option>Spanish</option>
                  <option>French</option>
                  <option>German</option>
                </select>
              </div>
              
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                Save Settings
              </button>
            </div>
          </div>
        )}

        {/* Architecture Information */}
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm text-blue-700">
                <strong>Application-Driven Architecture:</strong> This page demonstrates 
                client-side interactivity, state management, and dynamic content loading. 
                Perfect for dashboards, forms, and interactive applications.
              </p>
            </div>
          </div>
        </div>
      </div>
    </ApplicationLayout>
  )
}
