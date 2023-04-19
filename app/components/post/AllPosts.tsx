"use client"
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { AllPostType } from "../types/posts";
import AllPostsItem from "./AllPostsItem";


interface AllPostsProps {
  currentUserId? : string
}

const allPosts = async () => {
  const response = await axios.get(`/api/posts/`)
  return response.data
}

const AllPosts:React.FC<AllPostsProps> = ({currentUserId}) => {
    const { data, error, isLoading } = useQuery<AllPostType[]>({
    queryFn: allPosts,
    queryKey: ["posts"],
    })
    if (error) return <div>error</div>
    if (isLoading) return <div>Loadding</div>

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
      {data && data.map((post) => (
        <AllPostsItem 
          key={post.id}
          id={post.id}
          currentUserId={currentUserId}
          title={post.title}
          createdAt={post.createdAt}
          content={post.content}
          userId={post?.user?.id}
          userImage={post?.user?.image}
          userName={post?.user?.name}
          userEmail={post?.user?.email}
          tags={post.tags}
          likeCount={post?.likedIds}
          commentCount={post?.comments?.length}
        />
      ))}
    </div>
  )
}

export default AllPosts
