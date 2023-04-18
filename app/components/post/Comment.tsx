"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, useRef, useEffect, useCallback } from "react"
import axios from "axios";
import { toast } from "react-hot-toast";

import Avatar from "../Avatar";
import { User } from "../types";

interface CommentProps {
  id: string | undefined;
  comment : { 
    createdAt: string; 
    id: string; 
    postId: string; 
    userId: string; 
    name: string
    profileImage : string
    content : string
  }[] | undefined,
  currentUser : User | null;
}

async function commentPost(id:string | undefined, data:string) {
  const response = await axios.post(`/api/comment/${id}`,{
    content : data
  });
  return response.data
}

const Comment:React.FC<CommentProps> = ({comment, currentUser, id}) => {
  const [comments, setComments] = useState("")
  const [isInitialRender, setIsInitialRender] = useState(true);
  const queryClient = useQueryClient();

  const commentRefs = useRef<(HTMLDivElement | null)[]>([]);

  const commentPostMutation = useMutation({
    mutationFn: () => commentPost(id,comments),
    onSuccess: () => {
      toast.success("댓글이 등록되었습니다");
      queryClient.invalidateQueries({ queryKey: ["post"] });
      setComments("")
    },
    onError: () => {
      toast.success("문제가 생겼습니다");
    },

  });
  
  const handleComment = useCallback((e : React.FormEvent) => {
    e.preventDefault()
    commentPostMutation.mutate()
  },[comment])

  useEffect(() => {
    if (!isInitialRender) {
      const latestComment = commentRefs.current[commentRefs.current.length - 1];
      if (latestComment) {
        latestComment.scrollIntoView({ behavior: "smooth",});
      }
    } else {
      setIsInitialRender(false);
    }
  }, [comment]);
  
  // 삭제될때 commentRefs값이 바뀌지 않기때문에 comments, commentRefs.current 바뀔때 업데이트 시켜줌
  useEffect(() => {
    commentRefs.current = commentRefs.current.filter(ref => ref != null);
  }, [comment, commentRefs.current]);

  return (
    <div className="mt-8 mb-4">
      <form onSubmit={handleComment} className="flex items-center">
        <input 
        type="text" 
        className="flex-1 border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
        placeholder="댓글을 입력해주세요" 
        value={comments}
        onChange={(e) => setComments(e.target.value)}
        />
        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white rounded-md py-2 px-4 ml-2 transition duration-200">댓글</button>
      </form>
      <div className="mt-4 space-y-4">
        {comment?.map((com, index) => (
          <div 
          ref={(node) => (commentRefs.current[index] = node)}
          key={com?.id} 
          className="flex space-x-4">
            <div className="flex-shrink-0">
            </div>
            <div className="flex-1 border rounded-md px-4 py-2">
              <div className="flex items-center jurefstify-between">
                <div className="flex gap-2">
                  <Avatar src={com.profileImage} width={30} height={30}/>
                  <h3 className="text-lg font-medium">{com?.name}</h3>
                </div>
                <span className="text-gray-400 text-sm">{com?.createdAt}</span>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-700 text-lg mt-4">{com?.content}</p>
                {currentUser?.id === com?.userId ?
                  <div className="flex gap-2">
                    <button className="cursor-pointer text-sm">삭제</button>
                    <button className="cursor-pointer text-sm">수정</button>
                  </div>
                  : <></>
                }
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Comment
