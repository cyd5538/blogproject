"use client"
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { AllPostType } from "../types/posts";
import MypostItem from "./MypostItem";
import { User } from "../types";
import { useSearchParams } from "next/navigation";


const myPosts = async (id : string | undefined) => {
  const response = await axios.get(`/api/mypost/${id}`)
  return response.data
}
interface MyPostProps {
  currentUser? : User | null;
}

const Mypost:React.FC<MyPostProps> = ({currentUser}) => {
  const searchParams = useSearchParams();
  const id = searchParams?.get('id');

  const { data, error, isLoading } = useQuery<AllPostType[]>({
    queryFn: () => myPosts(id ? id : currentUser?.id),
    queryKey: ["mypost"],
    })
    if (error) return <div>error</div>

  return (
    <div>
      {data ? 
      <div className="text-zinc-800 dark:text-white">
        총 {data?.length} 개의 글이 있습니다.
      </div>
      : <></>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-14 pb-6">
        {data?.map((post) => (
          <MypostItem 
            key={post.id}
            title={post.title}
            createdAt={post.createdAt}
            tags={post.tags}
            id={post.id}
            content={post.content}
            currentUser={currentUser}
            />
        ))}
      </div>
    </div>
  )
}

export default Mypost
