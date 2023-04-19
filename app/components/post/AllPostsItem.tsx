"use client"
import axios from "axios";
import { useCallback, useMemo } from "react";
import { formatDistanceToNowStrict } from "date-fns";
import { ko } from "date-fns/locale";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AiFillHeart } from "react-icons/ai";
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
  commentCount?: number
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
  currentUserId,
  commentCount
}) => {
  const queryClient = useQueryClient()
  const LikeMutation = useMutation({
    mutationFn: () => LikeFnc(id, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      currentUserId && likeCount.includes(currentUserId) ? toast.success("좋아요 취소") : toast.success("좋아요 ✔")
    },
    onError: () => {
      console.log("error")
    }
  })

  const handleLike = useCallback(async () => {
    if (!currentUserId) {
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
    <div className="border rounded-md p-4 my-4 h-full flex flex-col justify-between bg-zinc-100 shadow-lg">
      <Link href={`/blog/${id}`}>
        <h2 className="text-2xl font-bold mb-4 cursor-pointer hover:underline ">
          {title}
        </h2>
      </Link>
      <div className="flex gap-2 flex-wrap">
        {tags.map((tag) => (
          <Link href={`/tags/?tag=${tag}`}>
            <div
              key={tag}
              className="bg-zinc-800 text-white rounded-md cursor-pointer px-2 py-1 mb-2 text-sm"
            >
              {tag}
            </div>
          </Link>
        ))}
      </div>
      <Link href={`/users/?id=${userId}`}>
        <div className="flex items-center mt-4 gap-2 cursor-pointer">
          <Avatar src={userImage} width={40} height={40} />
          <div className="flex flex-col">
            <span className="text-zinc-800 font-medium">{userName}</span>
            <span className="text-gray-500 text-sm">{userEmail}</span>
          </div>
        </div>
      </Link>
      <div className="flex justify-between items-center mt-4">
        <div className="text-zinc-800 text-sm">{createdAtFnc} 전 작성</div>
        <div className="flex items-center gap-2">
          <div className="text-zinc-800 font-bold">댓글 {commentCount}</div>
          <div className="flex items-center bg-zinc-800 border rounded-md px-2 py-1 text-sm">
            <div className="mr-1">
              <AiFillHeart
                color={currentUserId && likeCount.includes(currentUserId) ? "#ff0000" : "#fff"}
                size={20}
                className="cursor-pointer"
                onClick={handleLike}
              />
            </div>
            <div className="text-white text-sm">{likeCount.length}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllPostsItem
