"use client"

const BlogPostsSkeleton = () => {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-4 dark:text-white w-60 h-12 bg-gray-200"></h1>
      <div className="mb-4">
        {[1, 2, 3, 4, 5].map((tag) => (
          <div key={tag} className="inline-block w-10 h-6 cursor-pointer bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 animate-pulse">

          </div>
        ))}
      </div>
      <div className="bg-white p-4 animate-pulse">
        <div className='h-96 bg-gray-200'>

        </div>
      </div>
      <div className="flex items-center justify-between border-b-2 pb-2">
        <div className="flex items-center gap-2">
          <div className="bg-gray-200 rounded-full w-10 h-10 animate-pulse"></div>
          <div>
            <div className="text-lg text-gray-500 dark:text-white animate-pulse w-20 h-6 bg-gray-200"></div>
            <div className="text-lg font-medium text-gray-900 dark:text-white animate-pulse w-20 h-6 bg-gray-200"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlogPostsSkeleton
