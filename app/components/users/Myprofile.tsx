"use client"
import axios from "axios";
import Avatar from "../Avatar";
import useEditModel from "../hooks/useEditModal";
import { User } from "../types";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

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
  
  const { data, error, isLoading } = useQuery({
  queryFn: () => allPosts(id ? id : currentUser?.id),
  queryKey: ["user"],
  })
  if (error) return <div>error</div>
  if (isLoading) return <div>Loadding</div>

  return (
    <div className="flex flex-col items-center py-10 space-y-5 sm:space-y-10">
      <div className="">
        <Avatar src={data?.image} width={200} height={200} />
      </div>
      <div className="text-xl font-semibold">{data?.name}</div>
      <div className="text-gray-500">{data?.email}</div>
      {id === currentUser?.id && 
        <button 
        onClick={editmodal.onOpen} 
        className="px-4 py-2 text-white bg-blue-500 rounded-full shadow-md hover:bg-blue-600 transition-colors">
          수정
        </button>
      }
    </div>
  )
}

export default Myprofile
