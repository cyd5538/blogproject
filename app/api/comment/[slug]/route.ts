import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

interface CommentCreateInput {
  content: string;
  name?: string | null;
  profileImage?: string | null;
  userId: string;
  postId: string;
}

interface IParams {
  postId?: string;
  slug: string;
}

export async function POST(request: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }
  
  const body = await request.json();
  const { content } = body
  console.log(currentUser, content, params.slug)
  const comment = await prisma.comment.create({
    data: {
      content,
      userId: currentUser.id,
      postId : params.slug,
      name : currentUser?.name,
      profileImage : currentUser?.image
    } as CommentCreateInput
  });

  return NextResponse.json(comment);
}