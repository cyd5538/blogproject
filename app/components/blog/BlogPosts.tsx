"use client"
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { SinglePostType } from "../types/post";
import { useParams } from 'next/navigation';
import Avatar from "../Avatar";

import Prism from 'prismjs';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';
import { Viewer } from '@toast-ui/react-editor';

import '@toast-ui/editor/dist/toastui-editor.css';
import 'prismjs/themes/prism.css';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';

const Posts = async (id: string | string[] | undefined) => {
  const response = await axios.get(`/api/posts/${id}`)
  return response.data
}

const BlogPosts = () => {
  const params = useParams();

  const { data, error, isLoading } = useQuery<SinglePostType[]>({
    queryKey: ["post", params?.slug],
    queryFn: () => Posts(params?.slug),
  })
  if (error) return <div>error</div>
  if (isLoading) return <div>Loadding</div>
  console.log(data)
  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-4">{data?.[0].title}</h1>
      <ul className="mb-4">
        {data?.[0].tags?.map((tag) => (
          <li key={tag} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            {tag}
          </li>
        ))}
      </ul>
      {data?.[0].content && (
        <Viewer
          initialValue={data?.[0].content || ''}
          plugins={[[codeSyntaxHighlight, { highlighter: Prism }]]}
        />
      )}
      <div className="flex items-center gap-2">
        <Avatar src={data?.[0].user?.image} width={30} height={30}/>
        <div>
          <div className="text-sm text-gray-500">{data?.[0].user?.email}</div>
          <div className="text-sm font-medium text-gray-900">{data?.[0].user?.name}</div>
        </div>
      </div>
    </div>

  )
}

export default BlogPosts
