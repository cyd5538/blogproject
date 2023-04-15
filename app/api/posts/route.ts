import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const { id, content, title, createdAt, updatedAt, tags, likedIds, image } = body;

  const newPost = await prisma.post.create({
    data: {
      id,
      content,
      title,
      createdAt,
      updatedAt,
      likedIds,
      image,
      tags,
      userId: currentUser.id,
    },
  });

  return NextResponse.json(newPost);
}

export async function GET(request: Request) {

  const posts = await prisma.post.findMany({
      include: {
        user: true,
        comments: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

  return NextResponse.json(posts);
}
