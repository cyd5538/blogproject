"use client"

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import SearchResult from "../search/SearchResult";


interface User {
  name: string;
  image: string;
  email: string;
}

interface Post {
  id: string;
  title: string;
  content: string;
  likedIds: string[];
  tags: string[];
  createdAt: string;
  userId: string;
  user: User;
  comments: string[]
}

const allPosts = async (id: string) => {
  const response = await axios.get(`/api/posts/`)
  const data = response.data.filter((post: Post) => post.tags.includes(id));
  return data
}

const Tags = () => {
  const searchParams = useSearchParams();
  const id = searchParams?.get('tag');

  const { data } = useQuery<Post[]>({
    queryKey: ['search', id],
    queryFn: () => allPosts(id as string),
  })

  return (
    <div>
      {data ? 
      <>
        <div className="w-full sm:w-3/4 text-left mx-auto mt-10">
          <h1 className="text-3xl font-bold dark:text-white"># {id}</h1>
          <p className="mt-2 dark:text-white">총 {data?.length}개의 포스트</p>  
        </div>
        <div className='w-full sm:w-3/4 mx-auto mt-10'>
          {data?.map((res: Post) =>
            <SearchResult
              key={res.id}
              id={res.id}
              title={res.title}
              content={res.content}
              likecount={res.likedIds.length}
              createdAt={res.createdAt}
              userId={res.userId}
              tags={res.tags}
              userName={res.user.name}
              userImage={res.user.image}
              userEmail={res.user.email}
              comment={res.comments}
            />
          )}
        </div>
      </>
      : <></>
      }
    </div>
  )
}

export default Tags
