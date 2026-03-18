'use client'

import TodoTable from '@/components/auth/todo/TodoTable'
import React from 'react'

function DashboardPage() {
  return (
    <div>
      <h1 className='text-4xl font-bold text-center mt-12'>Welcome to your Dashboard</h1>
      <p className='text-center mt-4 text-gray-600'>This is a protected page. Only authenticated users can see this.</p>
      <TodoTable />
    </div>
  )
}

export default DashboardPage
