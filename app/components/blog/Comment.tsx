"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, useRef, useEffect, useCallback } from "react"
import axios, { AxiosError } from "axios";
import { toast } from "react-hot-toast";

import Avatar from "../Avatar";

import { User } from "../types";
import { formatDistanceToNowStrict } from 'date-fns';
import { ko } from "date-fns/locale";
import { AiOutlineArrowUp, AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";

import useLoginModel from "../hooks/useLoginModal";

interface CommentProps {
  id: string | undefined;
  comment: {
    createdAt: string;
    id: string;
    postId: string;
    userId: string;
    name: string
    profileImage: string
    content: string
  }[] | undefined,
  currentUser: User | null;
}



async function commentDelete(id: string | undefined) {
  const response = await axios.delete(`/api/comment/${id}`);
  return response.data
}

const Comment: React.FC<CommentProps> = ({ comment, currentUser, id }) => {
  const [comments, setComments] = useState("")
  const [apiId, setApidId] = useState(id)
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [isEdit, setIsEdit] = useState(false);
  const [showButton, setShowButton] = useState(false);

  const queryClient = useQueryClient();

  const commentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const loginModal = useLoginModel()
  const { mutate } = useMutation(
    async (id: string | undefined) => {
      if (!isEdit) {
        return await axios.post(`/api/comment/${apiId}`, {
          content: comments,
          userId: currentUser?.id,
          name: currentUser?.name,
          profileImage: currentUser?.image ? currentUser?.image : "/images/profiles.png"
        })
      } else {
        return await axios.put(`/api/comment/${apiId}`, {
          content: comments,
        })
      }
    },
    {
      onError: (error) => {
        if (error instanceof AxiosError) {
          toast.error("다시 시도해주세요!");
          console.log(AxiosError);
        }
        setIsEdit(false)
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries(["post"])
        toast.success("성공")
        setApidId(id)
        setIsEdit(false)
        setComments("")
      }
    }
  )

  const commentDeleteMutation = useMutation({
    mutationFn: commentDelete,
    onSuccess: () => {
      toast.success("댓글 삭제 완료");
      queryClient.invalidateQueries({ queryKey: ["post"] });
    },
    onError: () => {
      toast.success("문제가 생겼습니다");
    },
  });

  const handleComment = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    if (!currentUser) {
      toast.error("로그인이 필요합니다")
      return loginModal.onOpen()
    }
    mutate(id)
  }, [comment])

  const handleDleteComment = useCallback((id: string) => {
    commentDeleteMutation.mutate(id)
  }, [comment])

  useEffect(() => {
    if (!isInitialRender) {
      const latestComment = commentRefs.current[commentRefs.current.length - 1];
      if (latestComment) {
        latestComment.scrollIntoView({ behavior: "smooth", });
      }
    } else {
      setIsInitialRender(false);
    }
  }, [comment]);

  // 삭제될때 commentRefs값이 바뀌지 않기때문에 comments, commentRefs.current 바뀔때 업데이트 시켜줌
  useEffect(() => {
    commentRefs.current = commentRefs.current.filter(ref => ref != null);
  }, [comment, commentRefs.current]);

  // 몇분전 몇시간전
  const formatDate = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    return formatDistanceToNowStrict(date, { locale: ko, addSuffix: true });
  };

  const onClick = (id: string, content: string) => {
    inputRef?.current?.focus();
    setIsEdit(true)
    setComments(content)
    setApidId(id)
  }

  const handleScroll = () => {
    const scrollPosition = window.pageYOffset;
    const scrollThreshold = 1000; // 스크롤이 1000px 이하로 내려왔을 때 버튼이 나타남

    setShowButton(scrollPosition > scrollThreshold);
  };

  // 스크롤 이벤트 등록
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // 맨 위로 올라가는 버튼 클릭 핸들러
  const handleButtonClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <div className="mt-8 mb-4">
      <form onSubmit={handleComment} className="flex items-center">
        <input
          ref={inputRef}
          type="text"
          className="flex-1 border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="댓글을 입력해주세요"
          value={comments}
          onChange={(e) => setComments(e.target.value)}
        />
        {isEdit ?
          <div className="flex gap-2">
            <button type="submit" className="bg-zinc-500 hover:bg-zinc-600 text-white rounded-md py-2 px-4 text-sm ml-2 transition duration-200">수정</button>
            <button onClick={() => setIsEdit(false)} type="submit" className="bg-zinc-500 hover:bg-zinc-600 text-white rounded-md py-2 px-4 text-sm transition duration-200">취소</button>
          </div>
          :
          <button type="submit" className="bg-zinc-500 hover:bg-zinc-600 text-white rounded-md py-2 px-4 ml-2 transition duration-200">댓글</button>
        }
      </form>
      <div className="mt-4 space-y-4">
        {comment?.map((com, index) => (

          <div
            ref={(node) => (commentRefs.current[index] = node)}
            key={com?.id}
            className="flex space-x-4">
            <div className="flex-shrink-0">
            </div>
            <div className="flex-1 dark:bg-zinc-700 bg-zinc-100 rounded-md px-4 py-2">
              <div className="flex items-center jurefstify-between">
                <div className="flex gap-2">
                  <Avatar src={com.profileImage} width={30} height={30} />
                  <h3 className="text-lg dark:text-white font-medium">{com?.name}</h3>
                </div>
                <span className="text-gray-400 dark:text-white text-sm ml-2">{formatDate(com?.createdAt)} 등록</span>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-700 dark:text-white text-lg mt-4">{com?.content}</p>
                {currentUser?.id === com?.userId ?
                  <div className="flex gap-2">
                    <button onClick={() => handleDleteComment(com.id)} className="cursor-pointer text-sm dark:text-white"><AiOutlineDelete size={16} /></button>
                    <button onClick={() => onClick(com?.id, com?.content)} className="cursor-pointer text-sm dark:text-white"><AiOutlineEdit /></button>
                  </div>
                  : <></>
                }
              </div>
            </div>
          </div>
        ))}

        <button
          className="fixed bottom-2 right-2 lg:right-40 lg:bottom-16 px-2 py-2 bg-yellow-400 rounded-full"
          onClick={handleButtonClick}
          style={{ display: showButton ? "block" : "none" }}
        >
          <AiOutlineArrowUp size={20} />
        </button>
      </div>
    </div>
  )
}

export default Comment
