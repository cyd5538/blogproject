"use client"

import Link from "next/link";
import Avatar from "../Avatar";

interface SearchResultProps {
  id: string;
  title: string;
  content: string;
  likecount: number
  tags: string[];
  updatedAt: string;
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
  updatedAt,
  userId,
  userName,
  userImage,
  userEmail,
  comment
}) => {
  return (
    <div className="border-b border-black pb-4 border-dotted mt-4">
      <div className="flex flex-row items-center space-x-4">
        <Link href={`/users?id=${userId}`}>
          <div className="w-20 h-20 rounded-full bg-gray-200 flex justify-center items-center cursor-pointer">
            <Avatar src={userImage} width={70} height={70} />
          </div>
        </Link>
        <div className="text-gray-800">{userName}</div>
      </div>
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mt-2">{title}</h2>
      </div>
      <ul className="mt-4">
        {tags?.map((tag) => (
          <li key={tag} className="inline-block bg-gray-200 text-gray-800 text-sm py-1 px-2 rounded-full mr-2">
            {tag}
          </li>
        ))}
      </ul>
      <div className="flex flex-row items-center mt-4">
        <div className="text-gray-500">{updatedAt}</div>
        <div className="text-gray-500 ml-4">{comment.length}개의 댓글</div>
        <div className="text-gray-500 ml-4">{likecount}❤</div>
      </div>
    </div>
  )
}

export default SearchResult
