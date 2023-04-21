"use client"
import { BiSearch } from 'react-icons/bi'
import Link from 'next/link'

const Search = () => {
  return (
    <div>
      <div className="p-2 bg-zinc-700 rounded-full text-white dark:bg-zinc-800">
        <Link href={`/search`}>
           <BiSearch size={20} />
        </Link>
      </div>
    </div>
  )
}

export default Search
