"use client"
import { BiSearch } from 'react-icons/bi'
import Link from 'next/link'

const Search = () => {
  return (
    <div className="relative">
      <div className="p-2 bg-zinc-700 rounded-full text-white">
        <Link href={`/search`}>
           <BiSearch size={24} />
        </Link>
      </div>
    </div>
  )
}

export default Search
