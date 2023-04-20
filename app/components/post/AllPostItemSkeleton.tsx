"use client"

const AllPostItemSkeleton = () => {
  return (
    <div className="rounded-md p-4 my-4 h-full flex flex-col justify-between bg-zinc-100 text-black dark:bg-zinc-900 dark:text-white shadow-lg">
      <div className="h-12 w-full animate-pulse bg-gray-300 rounded-md mb-4"></div> 
      <div className="flex gap-2 flex-wrap dark:text-white">
        <div className="h-6 w-16 animate-pulse bg-gray-300 rounded-md cursor-pointer px-2 py-1 mb-2 text-sm"></div>
        <div className="h-6 w-16 animate-pulse bg-gray-300 rounded-md cursor-pointer px-2 py-1 mb-2 text-sm"></div>
        <div className="h-6 w-16 animate-pulse bg-gray-300 rounded-md cursor-pointer px-2 py-1 mb-2 text-sm"></div>
      </div>
      <div className="flex items-center mt-4 gap-2 cursor-pointer">
        <div className="h-10 w-10 animate-pulse bg-gray-300 rounded-full"></div>
        <div className="flex flex-col">
          <div className="h-4 w-32 animate-pulse bg-gray-300 rounded-md"></div>
          <div className="h-3 w-24 animate-pulse bg-gray-300 rounded-md mt-1"></div>
        </div>
      </div>
      <div className="flex justify-between items-center mt-4">
        <div className="h-4 w-24 animate-pulse bg-gray-300 rounded-md"></div>
        <div className="flex items-center gap-2">
          <div className="h-4 w-24 animate-pulse bg-gray-300 rounded-md"></div> 
          <div className="flex items-center bg-zinc-200  rounded-md px-2 py-1 text-sm">
            <div className="mr-1">
              <div className="h-6 w-6 animate-pulse bg-gray-300 rounded-full"></div> 
            </div>
            <div className="h-4 w-8 animate-pulse bg-gray-300 rounded-md"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AllPostItemSkeleton
