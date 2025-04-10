"use client"
import { EventCategory } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { EmptyCategoryState } from './empty-category'

interface CatoryPageContentProps {
  hasEvents: boolean
  category: EventCategory
}

const CategoryPageContent = ({ hasEvents: initialHasEvents, category }: CatoryPageContentProps) => {

  const { data: pollingData } = useQuery({
    queryKey: ["categories", category.name, "hasEvents"],

    queryFn: () => ({ hasEvents: initialHasEvents }), 
    initialData: { hasEvents: initialHasEvents },
  })


  if (!pollingData.hasEvents) {
    return <EmptyCategoryState categoryName={category.name} />
  }



  return <div></div>

}

export default CategoryPageContent;
