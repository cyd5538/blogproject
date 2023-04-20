"use client"
import { useMemo } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { SinglePostType } from "../types/post";
import { useParams } from 'next/navigation';
import Avatar from "../Avatar";
import Comment from "./Comment";

import Prism from 'prismjs';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';
import { Viewer } from '@toast-ui/react-editor';
import { User } from "../types";

import '@toast-ui/editor/dist/toastui-editor.css';
import 'prismjs/themes/prism.css';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import Link from "next/link";
import BlogPostsSkeleton from "./BlogPostsSkeleton";

interface BlogPostsProps {
  currentUser : User | null;
}

const Posts = async (id: string | string[] | undefined) => {
  const response = await axios.get(`/api/posts/${id}`)
  return response.data
}

const BlogPosts:React.FC<BlogPostsProps> = ({currentUser}) => {
  const params = useParams();

  const { data, error, isLoading } = useQuery<SinglePostType[]>({
    queryKey: ["post", params?.slug],
    queryFn: () => Posts(params?.slug),
  })
  if (error) return <div>error</div>
  if (isLoading) return <div><BlogPostsSkeleton /></div>
  
  return (
    <div className="max-w-4xl mx-auto py-8 px-4 ">
      <h1 className="text-3xl font-bold mb-4 dark:text-white ">{data?.[0].title}</h1>
      <ul className="mb-4">
        {data?.[0].tags?.map((tag) => (
          <Link key={tag} href={`/tags?tag=${tag}`}>
            <li  className="inline-block cursor-pointer bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              {tag}
            </li>
          </Link>
        ))}
      </ul>
      <div className="bg-white p-4">
      {data?.[0].content && (
        <Viewer
          initialValue={data?.[0].content || ''}
          plugins={[[codeSyntaxHighlight, { highlighter: Prism }]]}
        />
      )}
      </div>
      <div className="flex items-center justify-between border-b-2 pb-2">
        <div className="flex items-center gap-2">
          <Avatar src={data?.[0].user?.image} width={50} height={50}/>
          <div>
            <div className="text-lg text-gray-500 dark:text-white">{data?.[0].user?.email}</div>
            <div className="text-lg font-medium text-gray-900 dark:text-white">{data?.[0].user?.name}</div>
          </div>
        </div>
      </div>
      <Comment 
        id={data?.[0].id}
        comment={data?.[0].comments} 
        currentUser={currentUser}
      />

    </div>

  )
}

export default BlogPosts
