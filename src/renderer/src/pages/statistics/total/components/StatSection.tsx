import React from 'react'

export type StatSectionProps = {
  title: string
  children: React.ReactNode
}

export default function StatSection({ title, children }: StatSectionProps) {
  return (
    <div>
      <h5 className="text-base font-medium mb-3">{title}</h5>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {children}
      </div>
    </div>
  )
}
