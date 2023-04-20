"use client"

const MypostSkeleton = () => {
  return (
    <>
      <div className="flex flex-col items-center py-10 space-y-5 dark:text-white animate-pulse">
        <div className="w-40 h-40 rounded-full bg-gray-200"></div>
        <div className="flex flex-col items-center">
          <div className="text-xl font-semibold w-40 h-6 bg-gray-300 rounded"></div>
          <div className="text-gray-500 text-xl w-40 h-6 bg-gray-300 rounded mt-2"></div>
        </div>
        <div className="text-gray-500 text-sm w-24 h-5 bg-gray-300 rounded"></div>
      </div>
      <div className="mt-6 w-full font-bold text-2xl dark:text-white text-zinc-950 flex gap-2 justify-start mb-2">
        <h1 className="w-60 h-12 bg-gray-300 rounded"></h1>
      </div>
    </>
  )
}

export default MypostSkeleton
