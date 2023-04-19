"use client"
import React, { useCallback, useState, useEffect, createRef } from "react";
import { toast } from "react-hot-toast";
import { useSearchParams, useRouter  } from 'next/navigation';

import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/theme/toastui-editor-dark.css';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';

import Tag from "./tags";
import useDarkMode from "../hooks/DarkmodeToggle";

const AddPost = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const abc = searchParams?.get("title"); // value1
  const def = searchParams?.get("content"); // value2

  const [title, setTtile] = useState(abc ? abc : "");
  const [value, setValue] = useState("");
  const [tag, setTag] = useState("");
  const [tags, setTags] = useState<{ id: number; name: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);


  const editorRef = createRef<Editor>()
  const queryClient = useQueryClient()
  // create a post 
  const {mutate} = useMutation(
    async (markdown : string | undefined) => await axios.post('/api/posts', {
      content : markdown,
      title,
      tags : tags.map((tag) => tag.name)
    }),
    {
      onError: (error) => {
        if(error instanceof AxiosError) {
          toast.error(error?.response?.data.message, );
          console.log(error);
        }
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries(["posts"])
        toast.success("성공")
        router.push('/')
      }
    }
  )

  const submitPost = async (e : React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const markdown = await editorRef?.current?.getInstance()?.getMarkdown();
    if(!title){
      return toast.error("제목을 입력해주세요")
    }
    mutate(markdown)
  }

  function addTag() {
    if (!tag) {
      return;
    }

    // 중복 검사
    const isDuplicate = tags.some((t) => t.name === tag.trim());
    if (isDuplicate) {
      toast.error("이미 있는 태그입니다.")
      return;
    }
    const newTag = {
      id: tags.length + 1,
      name: tag.trim(),
    };

    setTags([...tags, newTag]);
    setTag("");
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      addTag();
    }
  }

  function handleTagClick(tagId: number) {
    const newTags = tags.filter((tag) => tag.id !== tagId);
    setTags(newTags);
  }
  const [dark, setDark] = useState(false);
  const handleDarkToggle = () => {
    setDark(!dark);
    console.log(dark)
  };

  const darkMode = useDarkMode()
  const editorKey = darkMode.isOpen ? 'dark' : 'light';

  return (
    <form onSubmit={submitPost} className=" w-full h-screen p-4 ">
      <input
        className="border border-gray-300 dark:bg-zinc-800 dark:border-zinc-950 dark:text-white p-2 rounded-md shadow-sm w-full"
        onChange={(e) => setTtile(e.target.value)}
        placeholder="title"
        type="text"
        value={title}
      />
      <form className="pt-2 pb-2">
        <input
          className="border border-gray-300 dark:bg-zinc-800 dark:border-zinc-950 dark:text-white p-2 rounded-md shadow-sm w-full"
          onChange={(e) => setTag(e.target.value)}
          placeholder="태그를 써주시고 엔터를 누르세요"
          type="text"
          value={tag}
          onKeyDown={handleKeyDown}
        />
        <ul className="flex gap-2 pt-2 flex-wrap">
        {tags.map((tag) => (
            <Tag 
                key={tag.id} 
                id={tag.id} 
                name={tag.name}
                onClick={handleTagClick}
            />
          ))}
        </ul>
      </form>

      <Editor
        key={editorKey} 
        ref={editorRef}
        initialValue={def ? def : ""}
        onChange={(value) => setValue(value)}
        height="500px" 
        useCommandShortcut={true}
        usageStatistics={false}
        plugins={[colorSyntax, [codeSyntaxHighlight, { highlighter: Prism }]]}
        theme={darkMode.isOpen ? "dark" : ""}
        toolbarItems={[
          ['heading', 'bold', 'italic', 'strike'],
          ['hr', 'quote'],
          ['ul', 'ol', 'task', 'indent', 'outdent'],
          ['table', 'image', 'link'],
          ['code', 'codeblock']
        ]}
      />
      <div className="flex justify-end w-full">
        {abc ? 
        <button
          className="bg-zinc-700 hover:bg-zinc-900 w-full text-white font-bold py-2 px-4 rounded mt-4 "
          type="submit"
        >
          Update
        </button>
        : 
        <button
          className="bg-zinc-900 hover:bg-zinc-950 w-full text-white font-bold py-2 px-4 rounded mt-4 "
          type="submit"
        >
          Post
        </button>
       }
      </div>
      <p className="pb-8"></p>
    </form>
  );
};

export default AddPost;