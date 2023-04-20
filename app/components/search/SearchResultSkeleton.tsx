"use client"

const SearchResultSkeleton = () => {
  return (
    <div className='w-full sm:w-3/4 mx-auto mt-10'>
    <div>
      <h1 className="text-3xl font-bold w-40 h-10 bg-gray-200 dark:text-white"></h1>
      <p className="mt-2 dark:text-white h-4 w-10 bg-gray-200"></p>  
    </div>
    {[1,2,3].map(a => 
      <div key={a} className="border-b border-black dark:border-white pb-4 border-dotted mt-4 animate-pulse">
        <div className="flex flex-row items-center space-x-4">
          <div className="w-20 h-20 rounded-full bg-gray-200 flex justify-center items-center cursor-pointer">
            <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
          </div>
          <div className="text-gray-800 dark:text-white w-28 h-6 bg-gray-300 rounded"></div>
        </div>
        <div>
          <h2 className="text-3xl mt-2 font-bold mb-4 cursor-pointer hover:underline dark:text-white w-3/4 h-8 bg-gray-300 rounded"></h2>
        </div>
        <ul className="mt-4">
          <li className="inline-block cursor-pointer bg-gray-200 text-gray-800 text-sm py-1 px-2 rounded-full mr-2 w-20 h-6"></li>
        </ul>
        <div className="flex flex-row items-center mt-4">
          <div className="text-gray-500 dark:text-white w-16 h-6 bg-gray-300 rounded"></div>
          <div className="text-gray-500 dark:text-white ml-4 w-20 h-6 bg-gray-300 rounded"></div>
          <div className="text-gray-500 dark:text-white ml-4 w-10 h-6 bg-gray-300 rounded"></div>
        </div>
      </div>
    )}
    </div>
  )
}

export default SearchResultSkeleton
