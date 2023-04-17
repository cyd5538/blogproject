import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

interface IParams {
  postId?: string;
  slug: string;
}

export async function POST(request: Request, { params }: { params: IParams }) {

  const body = await request.json();
  const { postId } = body;
  const currentUser = await getCurrentUser()

  const post = await prisma.post.findUnique({ 
    where : {
        id : postId // 게시글 ID로 검색
    }
  });

  if(!post){ 
    throw new Error("유효하지 않은 회원입니다")
  }

  let updatedLikedIds = [...(post.likedIds || [])]

  if(currentUser){
    if(updatedLikedIds.includes(currentUser.id)) {
      updatedLikedIds = updatedLikedIds.filter(id => id !== currentUser.id);
    } else {
      updatedLikedIds.push(currentUser.id); 
    }
  }

  const updatedPost = await prisma.post.update({ 
    where: {
      id: postId // 
    },
    data : {
      likedIds : updatedLikedIds // 
    }
  })

  return NextResponse.json(updatedPost);
}

