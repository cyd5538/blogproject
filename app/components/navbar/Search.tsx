"use client"
import { BiSearch } from 'react-icons/bi'
import Link from 'next/link'

const Search = () => {
  return (
    <div className="relative">
      <div className="p-2 bg-rose-500 rounded-full text-white">
        <Link href={`/posts/${1}`}>
           <BiSearch size={24} />
        </Link>
      </div>
    </div>
  )
}

export default Search
