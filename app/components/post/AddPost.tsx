"use client"
import React, { useCallback, useState, useEffect, createRef } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from 'next/navigation';

import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import Tag from "./tags";

const AddPost = () => {
  const [title, setTtile] = useState("");
  const [value, setValue] = useState("");
  const [tag, setTag] = useState("");
  const [tags, setTags] = useState<{ id: number; name: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const editorRef = createRef<Editor>()

  // create a post 
  const {mutate} = useMutation(
    async () => await axios.post('/api/posts', {
      content : value,
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
        toast.success("성공")
        router.push('/')
      }
    }
  )

  const submitPost = async (e : React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    mutate()
  }

  const modules = {
    syntax: false,
    toolbar: [
      ["bold", "italic", "underline", "strike"], // toggled buttons
      ["blockquote", "code-block"],

      [{ header: 1 }, { header: 2 }], // custom button values
      [{ list: "ordered" }, { list: "bullet" }],
      [{ script: "sub" }, { script: "super" }], // superscript/subscript
      [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
      [{ direction: "rtl" }], // text direction

      [{ size: ["small", false, "large", "huge"] }], // custom dropdown
      [{ header: [1, 2, 3, 4, 5, 6, false] }],

      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      [{ font: [] }],
      [{ align: [] }],

      ["clean"], // remove formatting button
    ],
  };

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


  return (
    <form onSubmit={submitPost} className=" w-full h-screen p-4">
      <input
        className="border border-gray-300 p-2 rounded-md shadow-sm w-full"
        onChange={(e) => setTtile(e.target.value)}
        placeholder="title"
        type="text"
        value={title}
      />
      <form className="pt-2 pb-2">
        <input
          className="border border-gray-300 p-2 rounded-md shadow-sm w-full"
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
        ref={editorRef}
        initialValue={value}
        onChange={(value) => setValue(value)}
        // placeholder="내용을 입력해주세요."
        previewStyle="vertical"
        height="500px"
        toolbarItems={[
          ['heading', 'bold', 'italic', 'strike'],
          ['hr', 'quote'],
          ['ul', 'ol', 'task', 'indent', 'outdent'],
          ['table', 'image', 'link'],
          ['code', 'codeblock'],
        ]}
      ></Editor>
      <div className="flex justify-end w-full">
        <button
          className="bg-zinc-700 hover:bg-zinc-900 w-full text-white font-bold py-2 px-4 rounded mt-4 "
          type="submit"
        >
          제출
        </button>
      </div>
      <p className="pb-8"></p>
    </form>
  );
};

export default AddPost;