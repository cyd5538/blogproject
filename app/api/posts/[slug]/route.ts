import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

interface IParams {
  postId?: string;
  slug: string;
}

export async function GET(request: Request, { params }: { params: IParams }) {

  const listing = await prisma.post.findMany({
    where: {
      id: params.slug,
    },
    include: {
      user: true,
      comments: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json(listing);
}

export async function DELETE(
  request: Request, 
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const post = await prisma.post.findMany({
    where: {
      id: params.slug,
      userId: currentUser.id,
    },
  });

  if (!post || post.length === 0) {
    return NextResponse.error();
  }

  await prisma.post.deleteMany({
    where: {
      id: params.slug ,
      userId: currentUser.id,
    },
  });

  return NextResponse.json(post);
}

