'use client'
import React from 'react'

import GoalsItem from '../GoalsItem'

import { GoalsStates } from '@/features/Goals'

export default function GoalsItems({ goals }: GoalsStates) {
  return (
    <div className="flex flex-1 flex-col text-white space-y-2 mt-2 sm:mt-0">
      {
        goals.map((goal) => {
         return <GoalsItem
                  key={goal._id}
                  {...goal}
                />
        })
      }
    </div>
  )
}
