"use client"
import axios from "axios";
import { useCallback, useMemo } from "react";
import { formatDistanceToNowStrict } from "date-fns";
import { ko } from "date-fns/locale";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { toast } from "react-hot-toast";
import Avatar from "../Avatar";
import Link from "next/link";

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
  likeCount: string[]
  currentUserId: string | undefined
}
async function LikeFnc(postId: string, userId: string) {
  const response = await axios.post(`/api/like`, {
    postId,
    userId
  });
  return response.data
}
const AllPostsItem: React.FC<AllPostItemProps> = ({ 
  id, 
  title, 
  createdAt, 
  tags, 
  userId, 
  userImage, 
  userName, 
  userEmail, 
  likeCount,
  currentUserId
}) => {
  const queryClient = useQueryClient()
  const LikeMutation = useMutation({
    mutationFn: () => LikeFnc(id,userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"]});
      currentUserId && likeCount.includes(currentUserId) ? toast.success("좋아요 취소") : toast.success("좋아요 ✔")
    },
    onError : () => {
      console.log("error")
    }
  })

  const handleLike = useCallback(async () => {
    if(!currentUserId){
      return toast.error("로그인 해주세요")
    }
    LikeMutation.mutate();
  }, [LikeMutation]);


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
  <Link href={`/users/?id=${userId}`}>
    <div className="flex items-center mt-4 gap-2 cursor-pointer">
      <Avatar src={userImage} width={40} height={40}/>
      <div className="flex flex-col">
        <span className="text-gray-800 font-medium">{userName}</span>
        <span className="text-gray-500 text-sm">{userEmail}</span>
      </div>
    </div>
  </Link>
  <div>
    <div className="text-gray-600 text-sm mt-4">{createdAtFnc} 전 작성</div>
    <div onClick={handleLike} className="text-gray-600 text-sm mt-4 cursor-pointer">
      {currentUserId && likeCount.includes(currentUserId) ? <AiFillHeart color="#fa2600" size={20}/> : <AiOutlineHeart size={20}/>}
    </div>
    <div>{likeCount.length}</div>
  </div>
</div>


  )
}

export default AllPostsItem
