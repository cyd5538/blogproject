"use client"
import { formatDistanceToNowStrict } from "date-fns";
import { ko } from "date-fns/locale";
import Link from "next/link";
import { useMemo } from "react";

interface AllPostItemProps {
  title: string
  createdAt?: string
  content: string
  userId: string
  userImage: string
  userName: string
  userEmail: string
  tags: string[]
  id: string
}



const AllPostsItem: React.FC<AllPostItemProps> = ({ id, title, createdAt, tags, userId, userImage, userName, userEmail }) => {
  const createdAtFnc = useMemo(() => {
    if (!createdAt) {
      return null;
    }
    return formatDistanceToNowStrict(new Date(createdAt), { locale: ko });
  }, [createdAt])

  return (
<div className="border rounded-md p-4 my-4 h-full flex flex-col justify-between">
  <Link href={`/blog/${id}`}>
    <h2 className="text-2xl font-bold mb-4 cursor-pointer hover:underline">{title}</h2>
  </Link>
  <div className="flex gap-2 flex-wrap">
    {tags.map((tag) => (
      <div
        key={tag}
        className="bg-blue-500 text-white rounded-md cursor-pointer px-2 py-1 mb-2"
      >
        {tag}
      </div>
    ))}
  </div>
  <div className="flex items-center mt-4">
    <img
      src={userImage}
      alt={userName}
      className="w-8 h-8 rounded-full mr-2"
    />
    <div className="flex flex-col">
      <span className="text-gray-800 font-medium">{userName}</span>
      <span className="text-gray-500 text-sm">{userEmail}</span>
    </div>
  </div>
  <div className="text-gray-600 text-sm mt-4">{createdAtFnc} 전 작성</div>
</div>


  )
}

export default AllPostsItem
