"use client"

import React, { ReactNode } from 'react';

import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { SinglePostType } from "../types/post";
import { useParams } from 'next/navigation';
import Avatar from "../Avatar";
import Comment from "./Comment";

import remarkGfm from 'remark-gfm'
import ReactMarkdown from 'react-markdown'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

import { User } from "../types";

import '@toast-ui/editor/dist/toastui-editor.css';
import 'prismjs/themes/prism.css';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import Link from "next/link";
import BlogPostsSkeleton from "./BlogPostsSkeleton";
import BlogShare from "./BlogShare";
import { TOC } from './Blogtoc';

interface BlogPostsProps {
  currentUser: User | null;
}

const Posts = async (id: string | string[] | undefined) => {
  const response = await axios.get(`/api/posts/${id}`)
  return response.data
}

const BlogPosts: React.FC<BlogPostsProps> = ({ currentUser }) => {
  const params = useParams();

  const { data, error, isLoading } = useQuery<SinglePostType[]>({
    queryKey: ["post", params?.slug],
    queryFn: () => Posts(params?.slug),
  })
  if (error) return <div>error</div>
  if (isLoading) return <div><BlogPostsSkeleton /></div>

  const flatten = (text: string, child: ReactNode): string => {
    if (React.isValidElement(child)) {
      return typeof child === "string"
        ? text + child
        : React.Children.toArray(child.props.children).reduce(flatten, text);
    }
    return text + child;
  };

  type HeadingRendererProps = {
    level: number;
    children: ReactNode;
  };

  const HeadingRenderer = (props: HeadingRendererProps): JSX.Element => {
    var children = React.Children.toArray(props.children);
    var text = children.reduce(flatten, "");
    var slug = text.toLowerCase().replace(/[!?\s]/g, "-");
    return React.createElement(
      `h${props.level}`,
      { id: slug, className: "anchor" },
      props.children
    );
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 ">
      <h1 className="text-3xl font-bold mb-4 dark:text-white ">{data?.[0].title}</h1>
      <ul className="mb-4">
        {data?.[0].tags?.map((tag) => (
          <Link key={tag} href={`/tags?tag=${tag}`}>
            <li className="inline-block cursor-pointer bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              {tag}
            </li>
          </Link>
        ))}
      </ul>
      <div className="bg-white p-4">
        <div className='flex gap-4'>
          <div className='content w-full lg:w-3/4'>

            <ReactMarkdown
              children={data?.[0].content || ""}
              remarkPlugins={[remarkGfm]}
              className="post-content"
              components={{
                code({ node, inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || '')
                  return !inline && match ? (
                    <SyntaxHighlighter
                      language={match[1]}
                      PreTag="div"
                    >
                      {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                  ) : (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  )
                },
                h1: HeadingRenderer,
                h2: HeadingRenderer,
              }}
            />

          </div>
          <div className='w-40 hidden relative top-0 right-0 lg:block'>
            <div className='fixed'>
              <TOC selector=".content" />
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between border-b-2 pb-2 pt-4">
        <div className="flex justify-between gap-2 w-full">
          <div className="flex items-center gap-2">
            <Avatar src={data?.[0].user?.image} width={50} height={50} />
            <div>
              <div className="text-lg text-gray-500 dark:text-white">{data?.[0].user?.email}</div>
              <div className="text-lg font-medium text-gray-900 dark:text-white">{data?.[0].user?.name}</div>
            </div>
          </div>
          <BlogShare title={data?.[0].title} tags={data?.[0].tags} />
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
