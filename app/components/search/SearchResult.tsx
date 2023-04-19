"use client"

import Link from "next/link";
import Avatar from "../Avatar";
import { useMemo } from "react";
import { formatDistanceToNowStrict } from "date-fns";
import { ko } from "date-fns/locale";

interface SearchResultProps {
  id: string;
  title: string;
  content: string;
  likecount: number
  tags: string[];
  createdAt: string;
  userId: string;
  userName: string;
  userImage: string;
  userEmail: string;
  comment: string[]
}

const SearchResult: React.FC<SearchResultProps> = ({
  id,
  title,
  content,
  likecount,
  tags,
  createdAt,
  userId,
  userName,
  userImage,
  userEmail,
  comment
}) => {
  const createdAtFnc = useMemo(() => {
    if (!createdAt) {
      return null;
    }
    return formatDistanceToNowStrict(new Date(createdAt), { locale: ko });
  }, [createdAt])
  return (
    <div className="border-b border-black dark:border-white pb-4 border-dotted mt-4">

      <div className="flex flex-row items-center space-x-4">
        <Link href={`/users?id=${userId}`}>
          <div className="w-20 h-20 rounded-full bg-gray-200 flex justify-center items-center cursor-pointer">
            <Avatar src={userImage} width={70} height={70} />
          </div>
        </Link>
        <div className="text-gray-800 dark:text-white">{userName}</div>
      </div>
      <div>
        <Link href={`/blog/${id}`}>
          <h2 className="text-3xl mt-2 font-bold mb-4 cursor-pointer hover:underline dark:text-white">
            {title}
          </h2>
        </Link>
      </div>
      <ul className="mt-4">
        {tags?.map((tag) => (
          <Link href={`/tags/?tag=${tag}`}>
            <li key={tag} className="inline-block cursor-pointer bg-gray-200  text-gray-800 text-sm py-1 px-2 rounded-full mr-2">
              {tag}
            </li>
          </Link>
        ))}
      </ul>
      <div className="flex flex-row items-center mt-4">
        <div className="text-gray-500 dark:text-white">{createdAtFnc} 전 작성</div>
        <div className="text-gray-500 dark:text-white ml-4">{comment.length}개의 댓글</div>
        <div className="text-gray-500 dark:text-white ml-4">{likecount}❤</div>
      </div>
    </div>
  )
}

export default SearchResult
