"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { formatDistanceToNowStrict } from "date-fns";
import { ko } from "date-fns/locale";
import { toast } from "react-hot-toast";

import { useSearchParams } from "next/navigation";
import { User } from "../types";



interface MypostItemProps {
  title: string
  createdAt?: string
  id: string
  tags?: string[]
  content: string
  currentUser? : User | null;
}

async function deletePost(id: any) {
  const response = await axios.delete(`/api/posts/${id}`);
  return response.data
}

const MypostItem: React.FC<MypostItemProps> = ({ title, createdAt, id, tags, content, currentUser }) => {
  const searchParams = useSearchParams();
  const ids = searchParams?.get('id');
  const queryClient = useQueryClient();
  const deletePostMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      toast.success("삭제 완료");
      queryClient.invalidateQueries({ queryKey: ['mypost'] });
    },
    onError: () => {
      toast.success("문제가 생겼습니다");
    },
  });

  const handleDelete = (id: any) => {
    deletePostMutation.mutate(id)
  }
  
  const createdAtFnc = useMemo(() => {
    if (!createdAt) {
      return null;
    }
    return formatDistanceToNowStrict(new Date(createdAt), { locale: ko });
  }, [createdAt])



  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <Link href={`/blog/${id}`} >
        <h2 className="text-xl font-semibold text-gray-800 mb-4 hover:text-gray-400 hover:underline">{title}</h2>
      </Link>
      <ul className="text-gray-600 mb-2 flex gap-2">
        {tags?.map((a) => <li key={a} className="p-1 pl-2 pr-2 rounded-md bg-zinc-500 text-white">{a}</li>)}
      </ul>
      <div className="text-gray-600 mb-2">{createdAtFnc} 전 작성</div>
      {ids === currentUser?.id ?
      <div className="flex justify-end space-x-2">
        <button onClick={() => handleDelete(id)} className="text-gray-600 hover:text-red-600">삭제</button>
        {/* <Link
          href={{
            pathname: '/post',
            query: {
              title,
              content,
            },
          }}
        >
          <button className="text-gray-600 hover:text-blue-600">수정</button>
        </Link> */}
      </div>
      : <></>
      }
    </div >
  )
}

export default MypostItem
