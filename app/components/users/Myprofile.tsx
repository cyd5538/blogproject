"use client"

import axios from "axios";
import Avatar from "../Avatar";
import useEditModel from "../hooks/useEditModal";
import { User } from "../types";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { formatDistanceToNowStrict } from "date-fns";
import { ko } from "date-fns/locale";

interface MyprofileProps {
  currentUser?: User | null | undefined;
}

const allPosts = async (id: string | undefined) => {
  const response = await axios.get(`/api/users/${id}`)
  return response.data
}

const Myprofile: React.FC<MyprofileProps> = ({ currentUser }) => {
  const editmodal = useEditModel()
  const searchParams = useSearchParams();
  const id = searchParams?.get('id');
  console.log(id)
  const { data, error, isLoading } = useQuery({
    queryFn: () => allPosts(id ? id : currentUser?.id),
    queryKey: ["user"],
  })
  if (error) return <div>error</div>
  if (isLoading) return <div>Loadding</div>

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    return `${formattedDate} 가입`;
  };

  return (
    <div>
      <div className="flex flex-col items-center py-10 space-y-5 ">
        <div className="">
          <Avatar src={data?.image} width={200} height={200} />
        </div>
        <div className="flex flex-col items-center">
          <div className="text-xl font-semibold ">{data?.name}</div>
          <div className="text-gray-500 text-xl">{data?.email}</div>
        </div>
        <div className="text-gray-500 text-sm">{formatDate(data?.createdAt)}</div>
        {id === currentUser?.id &&
          <button
            onClick={editmodal.onOpen}
            className="px-4 py-2 text-white bg-blue-500 rounded-full shadow-md hover:bg-blue-600 transition-colors">
            수정
          </button>
        }
      </div>
      <div className="mt-6 w-full font-bold text-2xl text-zinc-950 flex gap-2 justify-start mb-2">
        <h1> {data?.name} 글 목록 </h1>
      </div>
    </div>
  )
}

export default Myprofile
