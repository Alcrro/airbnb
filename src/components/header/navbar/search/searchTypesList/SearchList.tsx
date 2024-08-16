import { ISearchData } from '@/_lib/navbar/search/searchData'
import React from 'react'
import SearchTypesList from './SearchTypesList'

export default function SearchList({searchData}:{searchData:[]}) {
  return (
    <>
    {searchData.map((category: ISearchData) => (
      <SearchTypesList category={category} key={category.id} />
    ))}
  </>
  )
}
