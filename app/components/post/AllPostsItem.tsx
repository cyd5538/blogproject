"use client"
import { formatDistanceToNowStrict } from "date-fns";
import { ko } from "date-fns/locale";
import { useMemo } from "react";

interface AllPostItemProps {
  title : string
  createdAt? : string
  content : string
  userId : string
  userImage: string
  userName: string
  userEmail: string
  tags: string[]
}



const AllPostsItem:React.FC<AllPostItemProps> = ({ title, createdAt, tags, userId, userImage, userName, userEmail }) => {
  const createdAtFnc = useMemo(() => {
    if (!createdAt) {
      return null;
    }
    return formatDistanceToNowStrict(new Date(createdAt), { locale: ko });
  }, [createdAt])
  
  return (
    <div className="border rounded-md p-4 my-4">
      <h2 className="text-2xl font-bold">{title}</h2>
      <div className="flex gap-2">{tags.map((tag) => <div key={tag} className="bg-zinc-700 text-white rounded-md cursor-pointer p-[4px] pl-2 pr-2">{tag}</div>)}</div>
      <div className="flex items-center mt-2">
        <img src={userImage} alt={userName} className="w-8 h-8 rounded-full mr-2" />
        <div className="flex flex-col">
          <span className="text-gray-800 font-medium">{userName}</span>
          <span className="text-gray-500 text-sm">{userEmail}</span>
        </div>
      </div>
      <div className="flex justify-between items-center mt-4">
        <div className="text-gray-600 text-sm">
          <span>{createdAtFnc} 전 작성</span>
        </div>
      </div>
    </div>
  )
}

export default AllPostsItem
