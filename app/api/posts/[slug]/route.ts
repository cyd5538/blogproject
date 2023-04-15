import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface IParams {
  postId?: string;
  slug: string;
}

export async function GET(request: Request, { params }: { params: IParams }) {
  const { postId } = params;

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
