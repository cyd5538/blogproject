"use client"
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { AllPostType } from "../types/posts";
import MypostItem from "./MypostItem";
import { User } from "../types";


const myPosts = async (id : string | undefined) => {
  const response = await axios.get(`/api/mypost/${id}`)
  return response.data
}
interface MyPostProps {
  currentUser? : User | null;
}

const Mypost:React.FC<MyPostProps> = ({currentUser}) => {
  const { data, error, isLoading } = useQuery<AllPostType[]>({
    queryFn: () => myPosts(currentUser?.id),
    queryKey: ["mypost", currentUser?.id],
    })
    if (error) return <div>error</div>
    if (isLoading) return <div>Loadding</div>
    console.log(data)
  return (
    <div>
      <div className="mt-6 w-full font-bold text-2xl text-purple-950 flex gap-2 justify-center">
        <h1> 내 글 목록 </h1>
        <p className="text-purple-600">{data?.length}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-14">
        {data?.map((post) => (
          <MypostItem 
            key={post.id}
            title={post.title}
            createdAt={post.createdAt}
            tags={post.tags}
            id={post.id}
            content={post.content}
          />
        ))}
      </div>
    </div>
  )
}

export default Mypost
