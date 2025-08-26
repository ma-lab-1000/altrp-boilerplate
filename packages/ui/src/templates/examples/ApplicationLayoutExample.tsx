import React, { useState } from 'react'
import { ApplicationLayout } from '../ApplicationLayout'

/**
 * Example: ApplicationLayout for interactive dashboards
 * 
 * This example demonstrates how to use ApplicationLayout for
 * application-driven pages with interactive components and state management.
 */
export const ApplicationLayoutExample: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('overview')
  const [data, setData] = useState({
    users: 1234,
    revenue: 45678,
    orders: 89
  })

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'analytics', label: 'Analytics' },
    { id: 'settings', label: 'Settings' }
  ]

  return (
    <ApplicationLayout 
      title="Dashboard"
      description="Manage your account and view analytics"
    >
      <div className="space-y-6">
        {/* Tab Navigation */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  selectedTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Dynamic Content Based on Selected Tab */}
        {selectedTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-900">Total Users</h3>
              <p className="text-3xl font-bold text-blue-600">{data.users.toLocaleString()}</p>
              <p className="text-sm text-gray-500">+12% from last month</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-900">Revenue</h3>
              <p className="text-3xl font-bold text-green-600">${data.revenue.toLocaleString()}</p>
              <p className="text-sm text-gray-500">+8% from last month</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-900">Orders</h3>
              <p className="text-3xl font-bold text-purple-600">{data.orders}</p>
              <p className="text-sm text-gray-500">+15% from last month</p>
            </div>
          </div>
        )}

        {selectedTab === 'analytics' && (
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Analytics</h3>
            <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">Chart component would go here</p>
            </div>
          </div>
        )}

        {selectedTab === 'settings' && (
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email Notifications
                </label>
                <input
                  type="checkbox"
                  className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  defaultChecked
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Theme
                </label>
                <select className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500">
                  <option>Light</option>
                  <option>Dark</option>
                  <option>Auto</option>
                </select>
              </div>
              
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                Save Settings
              </button>
            </div>
          </div>
        )}
      </div>
    </ApplicationLayout>
  )
}
