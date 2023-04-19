"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { QueryClient, useQuery } from "@tanstack/react-query"
import { BiSearchAlt2 } from "react-icons/bi";
import SearchResult from './SearchResult';
import Container from '../Container';

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

const allPosts = async (filter: string) => {
  const response = await axios.get(`/api/posts/`)
  const data = response.data.filter((post: Post) => post.title.includes(filter));
  return data
}

const SearchPage = () => {
  const [filter, setFilter] = useState(localStorage.getItem("filter") || "");
  const [hasData, setHasData] = useState(false);
  const queryClient = new QueryClient()

  const { data, refetch } = useQuery<Post[]>({
    queryKey: ['search', filter],
    queryFn: () => allPosts(filter),
    enabled: !!filter,
    onSuccess: (data) => {
      if (data.length > 0) {
        setHasData(true);
      } else {
        setHasData(false);
      }
    }
  })

  useEffect(() => {
    if (filter === "") {
      setHasData(true);
    }
  }, [filter])

  useEffect(() => {
    if (filter) {
      localStorage.setItem("filter", filter);
    }
  }, [filter])

  useEffect(() => {
    // 브라우저가 닫힐 때 로컬 스토리지의 값을 삭제
    const handleBeforeUnload = () => {
      localStorage.removeItem("filter");
    };

    window.addEventListener("unload", handleBeforeUnload);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener("unload", handleBeforeUnload);
    };
  }, []);
  console.log(data)
  return (
    <Container>
      <div className="flex justify-center mt-4">
        <div className='relative w-3/4 sm:w-1/3'>
          <input
            type="text"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full h-14 px-4 rounded-md ring-1 ring-black bg-white-400 focus:outline-none focus:ring-2 focus:ring-zinc-500"
            placeholder="검색어를 입력해주세요"
          />
          <div className="absolute top-0 right-0 flex items-center px-2 h-full">
            <BiSearchAlt2 size={25} className="text-gray-600 text-xl" />
          </div>
        </div>
      </div>
      <div className='text-center mt-10'>
        {!hasData && filter !== "" ? (
          <div className="w-full sm:w-3/4 text-left mx-auto mt-10">
            <p className="text-3xl font-bold">
              검색 결과가 없습니다.
            </p>
          </div>
        )
          :
          <></>
        }
        {hasData && filter !== "" ? 
          <div className="w-full sm:w-3/4 text-left mx-auto mt-10">
            <h1 className="text-3xl font-bold">{filter} 검색결과</h1>
            <p className="mt-2">총 {data?.length}개의 포스트</p>
          </div>
          : <></>
        }
      </div>
      {hasData && (<div className='w-full sm:w-3/4 mx-auto mt-10'>
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
      )}
    </Container>
  )
}

export default SearchPage;
