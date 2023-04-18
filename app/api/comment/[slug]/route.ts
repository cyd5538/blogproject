import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

interface IParams {
  postId?: string;
  slug: string;
}

export async function POST(request: Request, { params }: { params: IParams }) {
  
  const body = await request.json();
  const { content, userId, name, profileImage } = body
  
  const comment = await prisma.comment.create({
    data: {
      postId : params.slug,
      content,
      userId,
      name,
      profileImage,
    }
  });

  return NextResponse.json(comment);
}

export async function DELETE(request: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const comment = await prisma.comment.findUnique({ where: { id:params.slug } });

  await prisma.comment.delete({ where: { id:params.slug } });

  return NextResponse.json(comment);
}

export async function PUT(request: Request, { params }: { params: IParams }) {
  const body = await request.json();
  const { content } = body
  
  const updatedComment = await prisma.comment.update({
    where: { id : params.slug },
    data: {
      content,
    }
  });

  return NextResponse.json(updatedComment);
}