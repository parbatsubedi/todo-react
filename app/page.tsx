'use client'

import React from 'react'

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>Todo App</title>
        <meta name="description" content="A simple todo app built with Next.js and Tailwind CSS" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="bg-gray-100 min-h-screen">
        {children}
      </body>

    </html>
  )
}

export default RootLayout